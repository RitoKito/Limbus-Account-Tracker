import "./sinner-panel.css"
import IdentityCard from "./identity-card/identity-card"

const SinnerPanel = ({sinner}) => {
  const iconPath = '/src/assets/icons/'

  return(
    <div className='sinner-pannel'>

      <div className="hbox sinner-heading">
        <img className='sinner-icon' src={`${iconPath}/${sinner.icon}`}/>
        <h3>{sinner.name}</h3>
      </div>

      <section className='identity-cards hbox'>
          {sinner.identities.map((identity) => (
            <IdentityCard
              key={identity.name}
              identityName={identity.name} 
              rarirty={identity.rarity}
            />
          ))}
      </section>

    </div>
  )
}

export default SinnerPanel