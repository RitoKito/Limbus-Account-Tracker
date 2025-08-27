import './IdentityCard.css'
import React from 'react';

const rarityLabels = {
  0: "0",
  1: "00",
  2: "000",
}

const IdentityCard = React.memo(({sinner, identity, accountStateHandlers, isInWishlist, isOwned, variant='default'}) => {
	const identityStatus = 
	isOwned ? "Owned" :
	isInWishlist ? "Wishlisted":
	!isOwned ? "Not Owned" :
	"";

	const statusClass = 
		isOwned ? "owned" :
		isInWishlist ? "wishlisted" :
		!isOwned ? "unowned" :
		"";
	

	const renderCardButtons = () => {
		if(isOwned){
			return(
				<div className='card-interactables'>

					<div 
						className={`card-interactable single`}
						onClick={() => {
							if(!isOwned){
								accountStateHandlers.markOwned(sinner, identity);
								accountStateHandlers.removeFromWishlist(sinner, identity);
							} else{
								accountStateHandlers.markUnowned(sinner, identity);
							}
						}}
					>
						<span>Mark as Not Owned</span>
					</div>

				</div>
			)
		}
		else{
			return(
					<div className='card-interactables'>

					<div 
						className={`card-interactable top`}
						onClick={() => {
							if(!isOwned){
								accountStateHandlers.markOwned(sinner, identity);
								accountStateHandlers.removeFromWishlist(sinner, identity);
							} else{
								accountStateHandlers.markUnowned(sinner, identity);
							}
						}}
					>
						<span>Mark as Owned</span>
					</div>

					<div 
						className={`card-interactable bottom`} 
						onClick={() => !isInWishlist
							?accountStateHandlers.addToWishlist(sinner, identity)
							:accountStateHandlers.removeFromWishlist(sinner, identity)}>
							<span>{!isInWishlist?"Add To Wishlist":"Remove From Wishlist"}</span>
					</div>

				</div>
			)
		}
	}
	

  return (
    <div className={`identity-card ${variant}`}>
			<div className="card-details">
				<div className="card-header">

					<h2 className='identity-rarity'>{rarityLabels[identity.rarity]}</h2>
					<h2 className={`identity-status ${statusClass}`}>
						{identityStatus}
					</h2>

				</div>
				<h2 className='identity-name'>{identity.name}</h2>
			</div>
			{identity.rarity > 0 ? renderCardButtons() : null}
      <img src={`${identity.image}`}/>
    </div>
  )
});

export default IdentityCard