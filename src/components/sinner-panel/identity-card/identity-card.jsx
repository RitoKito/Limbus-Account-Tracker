import './identity-card.css'

const rarityLabels = {
    0: "0",
    1: "00",
    2: "000",
}

const IdentityCard = ({identityName, rarirty, image}) => {
    return (
        <div className='identity-card'>
            <h2 className='identity-name'>{identityName}</h2>
            <h2 className='identity-rarity'>{rarityLabels[rarirty]}</h2>
        </div>
    )
}

export default IdentityCard