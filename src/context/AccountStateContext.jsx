import { createContext, useState, useEffect, useCallback, useMemo } from 'react';

export const AccountStateContext = createContext();

export const AccountStateProvider = ({children}) => {

  const defaultAccountState = {
    owned: [],
    wishlist: [],
    shards: [],
    nomCrate: 0,
  };

  const [accountState, setAccountState] = useState(() => {
    const stored = null; // localStorage.getItem('accountState') disabled for now
    return stored ? JSON.parse(stored) : defaultAccountState;
  });

  useEffect(() => {
    localStorage.setItem("accountState", JSON.stringify(accountState));
  }, [accountState]);

  const addToWishlist = useCallback((sinnerObj, identity) => {
    setAccountState(prev => {
      const wishlist = prev.wishlist || [];

      const sinnerIndex = wishlist.findIndex(sinner => sinner.id === sinnerObj.id);

      if(sinnerIndex === -1) {
        const newSinner = {...sinnerObj, identities: [identity] };

        let insertIndex = wishlist.findIndex(s => s.id > newSinner.id);
        if(insertIndex === -1) { insertIndex = wishlist.length; }

        const updatedWishlist = [
          ...wishlist.slice(0, insertIndex),
          newSinner,
          ...wishlist.slice(insertIndex)
        ];

        return {
          ...prev,
          wishlist: updatedWishlist
        };
      }
      else {
        const sinnerData = wishlist[sinnerIndex];
        const identities = sinnerData.identities || [];

        if(identities.some(i => i.id === identity.id)){
          return prev;
        }

        const updatedSinner = {
          ...sinnerData,
          identities: [...identities, identity]
        };

        const updatedWishlist = [
          ...wishlist.slice(0, sinnerIndex),
          updatedSinner,
          ...wishlist.slice(sinnerIndex + 1)
        ];

        return {
          ...prev,
          wishlist: updatedWishlist
        };
      }
    });
  }, []);

  const removeFromWishlist = useCallback((sinnerObj, identinty) => {
    setAccountState(prev => {
      const wishlist = prev.wishlist || [];

      const sinnerIndex = wishlist.findIndex(sinner => sinner.id === sinnerObj.id);

      if(sinnerIndex === -1) {
        return prev;
      }
      else {
        const sinnerData = wishlist[sinnerIndex];
        const identities = sinnerData.identities || [];

        const updatedIdentities = identities.filter(i => i.id !== identinty.id);

        if(updatedIdentities.length === identities.length){
          return prev;
        }
        else if(updatedIdentities.length === 0){
          return {
            ...prev,
            wishlist: [
              ...wishlist.slice(0, sinnerIndex),
              ...wishlist.slice(sinnerIndex + 1)
            ]
          }
        }

        const updatedSinner = {
          ...sinnerData,
          identities: updatedIdentities
        };

        const updatedWishlist = [
          ...wishlist.slice(0, sinnerIndex),
          updatedSinner,
          ...wishlist.slice(sinnerIndex + 1)
        ];

        return {
          ...prev,
          wishlist: updatedWishlist
        };
      }
    });
  }, []);

	const wishlistSet = useMemo(() => {
		const sinnersMap = {};

		(accountState.wishlist || []).forEach(sinner => {
			sinnersMap[sinner.id] = { identities: new Set((sinner.identities || []).map(identinty => identinty.id)) };
		});

		return {
			sinners: sinnersMap
		};
	}, [accountState.wishlist]);

  const accountContextValue = useMemo(() => ({
		owned: accountState.owned,
		wishlist: accountState.wishlist,
		nomCrate: accountState.nomCrate,
		shards: accountState.shards,
		addToWishlist,
		removeFromWishlist,
		wishlistSet,
  }), [
		accountState.owned,
		accountState.wishlist,
		accountState.nomCrate,
		accountState.shards,
		addToWishlist,
		removeFromWishlist,
		wishlistSet,
	]);

  return (
    <AccountStateContext.Provider value={accountContextValue}>
			{children}
    </AccountStateContext.Provider>
  );
};