import { createContext, useState, useEffect, useCallback, useMemo } from 'react';
import { throttle } from 'lodash';

export const AccountStateContext = createContext();
export const AccountStateProvider = ({children}) => {

  const defaultState = {
    owned: [],
    wishlist: [],
    shards: [],
    nomCrate: 0,
  };

  const [defaultAccountState, setDefaultAccountState] = useState(defaultState)

  const [accountState, setAccountState] = useState(() => {
    const stored = localStorage.getItem('accountState');
    //return stored ? JSON.parse(stored) : defaultAccountState;
    return defaultAccountState;
  });

  const timeoutTime = 3000;
  //Save account state 1 second after user applied change 
  const saveAccountState = useMemo(() =>
    throttle((state) => {
      localStorage.setItem("accountState", JSON.stringify(state));
      console.log("State Saved");
    }, timeoutTime), []
  )

  useEffect(() => {
    saveAccountState(accountState);
  }, [accountState, saveAccountState])

  const simplifySinners = (sinners) => {
    return sinners.map(({ id, identities }) => ({
      id,
      identities: identities.map(({ id }) => ({ id })),
    }));
  };

  useEffect(() => {
    console.log(getExportAccountState());
  }, [accountState])

    const getExportAccountState = useCallback(() => ({
    ...accountState,
    owned: simplifySinners(accountState.owned),
    wishlist: simplifySinners(accountState.wishlist),
    shards: accountState.shards,
    nomCrate: accountState.nomCrate,
  }));

  const setNewDefaultState = () => {
    setDefaultAccountState(accountState);
  }

  const resetAccountState = useCallback(() => {
    setAccountState(defaultAccountState);
  })

  const setNomCrate = useCallback((value) => {
    setAccountState(prev => {
      return {
        ...prev,
        nomCrate: value,
      }});
  }, []);

  const setSinnerShards = useCallback((sinnerId, value) => {
    setAccountState(prev => {
      return {
        ...prev,
        shards: {
          ...prev.shards,
          [sinnerId]: value,
        },
      }});
  }, []);

  const addToList = useCallback((listKey, sinnerObj, identity) => {
    setAccountState(prev => {
      const list = prev[listKey] || [];

      const sinnerIndex = list.findIndex(sinner => sinner.id === sinnerObj.id);

      if(sinnerIndex === -1){
        const newSinner = {...sinnerObj, identities: [identity] };

        let insertIndex = list.findIndex(s => s.id > newSinner.id);
        if(insertIndex === -1) { insertIndex = list.length; }

        const updatedList = [
          ...list.slice(0, insertIndex),
          newSinner,
          ...list.slice(insertIndex)
        ]

        return {
          ...prev,
          [listKey]: updatedList
        };
      }
      else{
          const sinnerData = list[sinnerIndex];
          const identities = sinnerData.identities || [];

          if(identities.some(i => i.id === identity.id)){
            return prev;
          }

          const updatedSinner = {
            ...sinnerData,
            identities: [...identities, identity]
          };

          const updatedList = [
            ...list.slice(0, sinnerIndex),
            updatedSinner,
            ...list.slice(sinnerIndex + 1)
          ];

          return {
            ...prev,
            [listKey]: updatedList
          };
      }
    })
  }, []);

  const removeFromList = useCallback((listKey, sinnerObj, identinty) => {
    setAccountState(prev => {
      const list = prev[listKey] || [];

      const sinnerIndex = list.findIndex(sinner => sinner.id === sinnerObj.id);

      if(sinnerIndex === -1) {
        return prev;
      }
      else {
        const sinnerData = list[sinnerIndex];
        const identities = sinnerData.identities || [];

        const updatedIdentities = identities.filter(i => i.id !== identinty.id);

        if(updatedIdentities.length === identities.length){
          return prev;
        }
        else if(updatedIdentities.length === 0){
          return {
            ...prev,
            [listKey]: [
              ...list.slice(0, sinnerIndex),
              ...list.slice(sinnerIndex + 1)
            ]
          }
        }

        const updatedSinner = {
          ...sinnerData,
          identities: updatedIdentities
        };

        const updatedList = [
          ...list.slice(0, sinnerIndex),
          updatedSinner,
          ...list.slice(sinnerIndex + 1)
        ];

        return {
          ...prev,
          [listKey]: updatedList
        };
      }
    });
  }, [])

  const markOwned = useCallback((sinnerObj, identinty) => {
    addToList("owned", sinnerObj, identinty);
  }, [addToList]);

  const markUnowned = useCallback((sinnerObj, identinty) => {
    removeFromList("owned", sinnerObj, identinty);
  }, [removeFromList])

  const addToWishlist = useCallback((sinnerObj, identity) => {
    addToList("wishlist", sinnerObj, identity);
  }, [addToList]);

  const removeFromWishlist = useCallback((sinnerObj, identinty) => {
      removeFromList("wishlist", sinnerObj, identinty);
  }, [removeFromList]);

	const wishlistSet = useMemo(() => {
		const sinnersMap = {};

		(accountState.wishlist || []).forEach(sinner => {
			sinnersMap[sinner.id] = { identities: new Set((sinner.identities || []).map(identinty => identinty.id)) };
		});

		return {
			sinners: sinnersMap
		};
	}, [accountState.wishlist]);

  const ownedSet = useMemo(() => {
    const sinnersMap = {};

		(accountState.owned || []).forEach(sinner => {
			sinnersMap[sinner.id] = { identities: new Set((sinner.identities || []).map(identinty => identinty.id)) };
		});

		return {
			sinners: sinnersMap
		};
  }, [accountState.owned]);

  const accountContextValue = useMemo(() => ({
    setNomCrate,
    setSinnerShards,
		owned: accountState.owned,
		wishlist: accountState.wishlist,
		nomCrate: accountState.nomCrate,
		shards: accountState.shards,
		addToWishlist,
		removeFromWishlist,
    markOwned,
    markUnowned,
		wishlistSet,
    ownedSet,
    getExportAccountState,
    resetAccountState,
    setNewDefaultState,
  }), [
    setNomCrate,
    setSinnerShards,
		accountState.owned,
		accountState.wishlist,
		accountState.nomCrate,
		accountState.shards,
		addToWishlist,
		removeFromWishlist,
    markOwned,
    markUnowned,
		wishlistSet,
    ownedSet,
    getExportAccountState,
    resetAccountState,
    setNewDefaultState,
	]);

  return (
    <AccountStateContext.Provider value={accountContextValue}>
			{children}
    </AccountStateContext.Provider>
  );
};