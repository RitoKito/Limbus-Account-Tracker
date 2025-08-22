import './identity-card.css'
import React from 'react';
import { WIKI_BASE_IMAGE_URL } from '@/config';

const rarityLabels = {
  0: "0",
  1: "00",
  2: "000",
}

const IdentityCard = React.memo(({sinner, identity, wishlistHandlers, isInWishlist, variant='default'}) => {
  return (
    <div className={`identity-card ${variant}`}>
			<div className="card-details">
				{console.log("CARD RENDER " + identity.name + " " + variant)}
				<h2 className='identity-name'>{identity.name}</h2>
      	<h2 className='identity-rarity'>{rarityLabels[identity.rarity]}</h2>
			</div>

			<div className='card-interactables'>
				<div className={`card-interactable ${variant}`}>
					<span>Mark as Owned</span>
				</div>
				<div 
				className={`card-interactable ${variant}`} 
				onClick={() => !isInWishlist
					?wishlistHandlers.add(sinner, identity)
					:wishlistHandlers.remove(sinner, identity)}>
						<span>{!isInWishlist?"Add To Wishlist":"Remove From Wishlist"}</span>
				</div>
			</div>
      <img src={`${WIKI_BASE_IMAGE_URL + identity.image}`}/>
    </div>
  )
});

export default IdentityCard