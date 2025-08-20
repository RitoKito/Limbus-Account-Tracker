import './identity-card.css'
import { WIKI_BASE_IMAGE_URL } from '../../../config';

const rarityLabels = {
    0: "0",
    1: "00",
    2: "000",
}

const IdentityCard = ({id, identity, rarirty, image, onClick}) => {
    const identityID = id;
    return (
        <div className='identity-card'>
            <h2 className='identity-name'>{identity.name}</h2>
            <h2 className='identity-rarity'>{rarityLabels[rarirty]}</h2>
            <img src={`${WIKI_BASE_IMAGE_URL + identity.image}`}/>
        </div>
    )
}

export default IdentityCard