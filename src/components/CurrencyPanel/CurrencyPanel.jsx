import "./CurrencyPanel.css"
import { useContext, useMemo } from "react";

import { AccountStateContext } from "@/context/AccountStateContext";
import CurrencyInput from "./CurrencyInput/CurrencyInput";
import { NOM_CRATE_ICON_URL } from "@/constants/ImagePaths";

const CurrencyPanel = ({ sinners }) => {
	const { nomCrate, setNomCrate, shards, setSinnerShards } = useContext( AccountStateContext );

	const handleNomCrateChange = (value) => {
		if (value === "" || /^[0-9]+$/.test(value)) {
			setNomCrate(value === "" ? 0 : parseInt(value, 10));
		}
	}

	const sinnerShardsHandlers = useMemo(() => {
		const map = {};
		sinners.forEach(sinner => {
			map[sinner.id] = (value) => {
        if (value === "" || /^[0-9]+$/.test(value)) {
          setSinnerShards(sinner.id, value === "" ? 0 : parseInt(value, 10));
        }
			};
		});

		return map;
	}, [sinners, setSinnerShards]);

  return (
		<>
		<h3 className="header">Sinner Shards</h3>
			<div className="currency-panel">
				{sinners.slice(0, 6).map(sinner => (
					<CurrencyInput
						key={sinner.id}
						icon={sinner.icon}
						value={shards[sinner.id]}
						handleOnChange={sinnerShardsHandlers[sinner.id]}
					/>
				))}
			</div>

			<div className="currency-panel">
				{sinners.slice(6, 12).map(sinner => (
					<CurrencyInput
						key={sinner.id}
						icon={sinner.icon}
						value={shards[sinner.id]}
						handleOnChange={sinnerShardsHandlers[sinner.id]}
					/>
				))}
			</div>

			<h3 className="header">Nominal Crates</h3>
			<div className="currency-panel">
				<CurrencyInput 
					icon={NOM_CRATE_ICON_URL} 
					value={nomCrate}
					handleOnChange={handleNomCrateChange}
					shard={false}
				/>
			</div>
		</>
  );
}

export default CurrencyPanel