import "./AccountStateWidget.css"
import { useContext, useEffect, useRef, useState, useMemo } from "react"

import SinnerPanel from "@/components/SinnerPanel/SinnerPanel"
import { AccountStateContext } from "@/context/AccountStateContext"
import { DispensableContext } from "@/context/DispensableContext"
import { NOM_CRATE_ICON_URL } from "@/constants/ImagePaths"


const AccountStateWidget = () => {
  const { 
    nomCrate,
    addToWishlist,
    removeFromWishlist,
    markOwned,
    markUnowned,
    wishlist,
    wishlistSet,
    ownedSet,
  } = useContext(AccountStateContext);

  const accountStateHandlers = useMemo(() => ({
      addToWishlist: addToWishlist,
      removeFromWishlist: removeFromWishlist,
      markOwned: markOwned,
      markUnowned: markUnowned,
  }), [
    addToWishlist,
    removeFromWishlist,
    markOwned,
    markUnowned
  ]);

  const { dispensable } = useContext(DispensableContext);

  const displayDispensable = () => {
    if(Object.values(dispensable).some(value => value > 0)){
      return (
        <h3 className="dispensable ">Can Dispense</h3>
      )
    }
      
    return null;
  }

  const [isCollapsed, setIsCollapsed] = useState(true);
  const contentRef = useRef(null);
  const [height, setHeight] = useState("auto");

	const collapsibleStyle = {
  	height,
	}

  useEffect(() => {
    if(contentRef.current) {
      setHeight(isCollapsed ? 0 : contentRef.current.scrollHeight);
    }
  }, [isCollapsed])

  return(
    <div className="widget-container">
      <div className="currency-bar">
        <div className="left-group">
          <img className="nom-crate-icon" src={NOM_CRATE_ICON_URL}/>
          <span>{`${nomCrate}`}</span>
          {displayDispensable()}
        </div>

        <button onClick={() => setIsCollapsed((c) => !c)}>
          {isCollapsed ? "Show Wishlist" : "Hide Wishlist" }
        </button>
      </div>
			{console.log("RUNDER OF WIDGET")}
      <div
        ref={contentRef}
        className="collapsible"
        style={collapsibleStyle}
      >
        <div className="wishlist-panel">
          {wishlist.map(sinner => (
            <SinnerPanel 
              key={sinner.id}
              sinner={sinner}
							accountStateHandlers={accountStateHandlers}
							wishlistSet={wishlistSet.sinners[sinner.id]?.identities??new Set()}
              ownedSet={ownedSet.sinners[sinner.id]?.identities??new Set()}
              cardVariant={'widget'}
              dispensable={dispensable[sinner.name]}
            />
          ))}
        </div>
      </div>

    </div>
  )
};

export default AccountStateWidget