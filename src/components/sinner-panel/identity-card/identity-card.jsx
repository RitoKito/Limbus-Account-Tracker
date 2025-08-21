import './identity-card.css'
import { WIKI_BASE_IMAGE_URL } from '@/config';

const rarityLabels = {
    0: "0",
    1: "00",
    2: "000",
}

const IdentityCard = ({sinner, identity, rarirty, onClick, cardSize='default'}) => {
    
    return (
        <div className={`identity-card ${cardSize}`} onClick={() => onClick?.(sinner, identity)}>
            <h2 className='identity-name'>{identity.name}</h2>
            <h2 className='identity-rarity'>{rarityLabels[rarirty]}</h2>
            <img src={`${WIKI_BASE_IMAGE_URL + identity.image}`}/>
        </div>
    )
}

export default IdentityCard