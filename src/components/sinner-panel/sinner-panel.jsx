import IdentityCard from "./identity-card/identity-card"

const SinnerPanel = ({sinner}) => {
  return(
    <div className='sinner'>
      <div className='vbox'>
        <h1>{sinner.name}</h1>
        <div className='hbox'>
            {sinner.identities.map((identity) => (
                <IdentityCard
                key={identity.name}
                identityName={identity.name} 
                rarirty={identity.rarity}/>
            ))}
        </div>
      </div>
    </div>
  )
}

export default SinnerPanel