import { createContext, useState, useEffect, useCallback, useMemo } from 'react';

export const AccountStateContext = createContext();
export const AccountStateProvider = ({children}) => {

  const defaultAccountState = {
    owned: [],
    wishlist: [],
    shards: [],
    nomCrate: 0,
  };

  const exportAccountState = () => {
    const accountState = {
      
    }
  }

  const [accountState, setAccountState] = useState(() => {
    const stored = null; // localStorage.getItem('accountState') disabled for now
    return stored ? JSON.parse(stored) : defaultAccountState;
  });

  useEffect(() => {
    localStorage.setItem("accountState", JSON.stringify(accountState));
  }, [accountState]);

  const setNomCrate = useCallback((value) => {
    setAccountState(prev => {
      return {
        ...prev,
        nomCrate: value,
      }});
  }, []);

  const setSinnerShards = useCallback((sinnerName, value) => {
    setAccountState(prev => {
      return {
        ...prev,
        shards: {
          ...prev.shards,
          [sinnerName]: value,
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
    setNomCrate: setNomCrate,
    setSinnerShards: setSinnerShards,
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
	]);

  return (
    <AccountStateContext.Provider value={accountContextValue}>
			{children}
    </AccountStateContext.Provider>
  );
};