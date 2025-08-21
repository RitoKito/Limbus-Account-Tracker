import React, { createContext, useState, useEffect, Children } from 'react';

export const AccountStateContext = createContext();

export const AccountStateProvider = ({children}) => {
    const defaultAccountState = {
        shards: {},
        nomCrate: 0,
        ownedIds: {},
        wishlist: [],
    }

    const [accountState, setAccountState] = useState(defaultAccountState);

    useEffect(() => {
        const stored = localStorage.getItem('accountState');
        if(stored) {
            setAccountState(JSON.parse(stored));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("accountState", JSON.stringify(accountState));
    }, [accountState])

    const addToWishlist = (sinnerObj, identity) => {
        setAccountState(prev => {
            const wishlist = prev.wishlist || [];

            const sinnerIndex = wishlist.findIndex(sinner => sinner.id === sinnerObj.id);

            if(sinnerIndex === -1) {
                return {
                    ...prev,
                    wishlist: [
                        ...wishlist,
                        {
                            ...sinnerObj,
                            identities: [identity]
                        }
                    ]
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
                ]

                return {
                    ...prev,
                    wishlist: updatedWishlist
                };
            }
        });
    }

    const removeFromWishlist = (sinner, identinty) => {
    }

    return (
        <AccountStateContext.Provider value={{accountState, addToWishlist, removeFromWishlist}}>
            {children}
        </AccountStateContext.Provider>
    );
}