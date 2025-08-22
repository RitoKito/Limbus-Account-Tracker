import "./sinner-panel.css"
import React, { useMemo } from 'react';
import IdentityCard from "./identity-card/identity-card"
import { WIKI_BASE_IMAGE_URL } from "../../config"

const SinnerPanel = React.memo(({sinner, wishlistHandlers, wishlistSet, cardVariant = "default"}) => {
  return(
    <div className='sinner-pannel'>
      <div className="hbox sinner-heading">
        <img className='sinner-icon' src={`${WIKI_BASE_IMAGE_URL + sinner.icon}`}/>
        <h3>{sinner.name}</h3>
      </div>
      <section className='identity-cards hbox'>
          {sinner.identities.map((identity) => (
            <IdentityCard
              key={identity.id}
              sinner={sinner}
              identity={identity}
              wishlistHandlers={wishlistHandlers}
              isInWishlist={wishlistSet.has(identity.id)}
              variant={cardVariant}
            />
          ))}
      </section>

    </div>
  )
});

export default SinnerPanel