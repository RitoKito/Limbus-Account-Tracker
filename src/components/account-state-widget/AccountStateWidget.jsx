import SinnerPanel from "../sinner-panel/sinner-panel"
import "./AccountStateWidget.css"
import { AccountStateContext } from "../../context/AccountStateContext"
import { useContext } from "react"

const AccountStateWidget = () => {
    const { accountState } = useContext(AccountStateContext);
    const wishlist = accountState.wishlist;

    return(
        <div className="widget-container">

            <div className="currency-bar"></div>

            <div className="wishlist-panel">
                {wishlist.map(sinner => (
                    <SinnerPanel 
                        key={sinner.id}
                        sinner={sinner}
                        cardSize={'widget'}
                    />
                ))}

            </div>
        </div>
    )
}

export default AccountStateWidget