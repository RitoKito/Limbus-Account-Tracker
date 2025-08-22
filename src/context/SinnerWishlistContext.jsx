import { createContext, useContext } from "react"

export const SinnerWishlistContext = createContext();

export const useSinnerWishlist = () => {
    const ctx = useContext(SinnerWishlistContext);
    if(!ctx) {
        throw new Error("useSinnerWishlist must be used inside SinnerWishlistContext.Provider");
    }

    return ctx;
}