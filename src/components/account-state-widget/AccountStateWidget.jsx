import "./AccountStateWidget.css"
import SinnerPanel from "../sinner-panel/sinner-panel"
import { AccountStateContext } from "@/context/AccountStateContext"
import { useContext, useEffect, useRef, useState } from "react"
import { WIKI_BASE_IMAGE_URL } from "@/config"

const nomCrateImage = 'd/d4/Nominable_Egoshard_Crate.png';

const AccountStateWidget = ({wishlistHandlers, wishlistSet}) => {
  const { wishlist, nomCrate, removeFromWishlist } = useContext(AccountStateContext);

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
          <img className="nom-crate-icon" src={WIKI_BASE_IMAGE_URL + nomCrateImage}/>
          <span>{`${nomCrate}`}</span>
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
							wishlistHandlers={wishlistHandlers}
							wishlistSet={wishlistSet.sinners[sinner.id]?.identities??new Set()}
              onIdCardClick={removeFromWishlist}
              cardVariant={'widget'}
            />
          ))}

        </div>
      </div>

    </div>
  )
};

export default AccountStateWidget