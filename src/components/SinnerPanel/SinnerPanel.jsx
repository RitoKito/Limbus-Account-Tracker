import "./SinnerPanel.css"
import React from 'react';
import IdentityCard from "./IdentityCard/IdentityCard"

const SinnerPanel = React.memo(({sinner, accountStateHandlers, wishlistSet, ownedSet, cardVariant = "default", dispensable}) => {
  const displayDispensable = () => {
    console.log(dispensable)
    if(dispensable === 0.5){
      return (
        <>
          <h3 className="dispensable ">Can Dispense:</h3>
          <h3 className="dispensable half">(1) 00</h3>
        </>
      )
    }
    else if(dispensable > 0 && dispensable % 1 === 0){
      return (
        <>
          <h3 className="dispensable ">Can Dispense:</h3>
          <h3 className="dispensable full">{`(${dispensable}) 000`}</h3>
        </>
      )
    }
    else if(dispensable > 1 && dispensable % 1 != 0){
      return (
        <>
          <h3 className="dispensable">Can Dispense:</h3>
          <h3 className="dispensable full">{`(${dispensable - 0.5}) 000`}</h3>
          <h3 className="dispensable half">(1) 00</h3>
        </>
      )
    }
      
    return null;
  }

  return(
    <div className='sinner-pannel'>
      <div className="hbox sinner-heading">
        <img className='sinner-icon' src={`${sinner.icon}`}/>
        <h3>{sinner.name}</h3>
        {displayDispensable()}
      </div>
      <section className='identity-cards hbox'>
        {sinner.identities.map((identity) => (
          <IdentityCard
            key={identity.id}
            sinner={sinner}
            identity={identity}
            accountStateHandlers={accountStateHandlers}
            isInWishlist={wishlistSet.has(identity.id)}
            isOwned={ownedSet.has(identity.id)}
            variant={cardVariant}
          />
        ))}
      </section>

    </div>
  )
});

export default SinnerPanel