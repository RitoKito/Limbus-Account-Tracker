import "./sinner-panel.css"
import IdentityCard from "./identity-card/identity-card"
import { WIKI_BASE_IMAGE_URL } from "../../config"

const SinnerPanel = ({sinner, onIdCardClick, cardSize}) => {
  const iconPath = '/src/assets/icons/'

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
              rarirty={identity.rarity}
              onClick={onIdCardClick}
              cardSize={cardSize}
            />
          ))}
      </section>

    </div>
  )
}

export default SinnerPanel