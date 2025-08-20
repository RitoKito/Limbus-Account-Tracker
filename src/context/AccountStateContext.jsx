import React, { createContext, useState, useEffect, Children } from 'react';

export const AccountStateContext = createContext();

export const AccountStateProvider = ({children}) => {
    const defaultAccountState = {
        shards: {},
        nomCrate: 0,
        ownedIds: {},
        wishlist: {
            "Yi Sang": [0, 1, 2, 3]
        },
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

    const addToWishList = (sinner, identinty) => {
        setAccountState(prev => {
            const currentWishlist = prev.wishlist[sinner] || [];
            
            const updatedWishlist = currentWishlist.includes(identinty)
                ? currentWishlist
                : [...currentWishlist, identinty];

            return {
                ...prev,
                wishlist: {
                    [sinner]:updatedWishlist
                }
            }
        });
    }
}