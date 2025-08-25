import React from "react";
import { SHARD_ICON_URL } from "@/constants/ImagePaths";

const CurrencyInput = React.memo(({icon, handleOnChange, value, shard=true}) => {
  const renderIcon = (shard) => {
    if(shard) {
      return (
        <div className="icon-container">
          <img className="currency-icon" src={SHARD_ICON_URL}/>
          <img className="currency-icon sinner-icon" src={icon}/>
        </div>
      )
    }

    return (
      <div className="icon-container">
        <img className="currency-icon" src={icon}/>
      </div>
    )
  }

  return (
    <div className="currency-input">
      {renderIcon(shard)}

			{console.log("INPUT RENDER")}
      <input 
				type="text"
				inputMode="numeric"
				value={value?.toString() ?? ''}
				onChange={(e) => handleOnChange(e.target.value)}
			/>
    </div>
  )
});

export default CurrencyInput