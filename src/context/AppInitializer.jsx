import { useContext, useEffect, useState } from "react";
import { AccountStateContext } from "./AccountStateContext";

import characterData from "@/data/data.json";
import App from "@/App";
import { DispensableProvider } from "./DispensableContext";
import { BASE_IMAGE_PATH, IDENTITY_IMAGE_PATH, SINNER_ICONS_PATH } from "../constants/ImagePaths";

export function AppInitializerInner({ onInit }) {
	const [sinners, setSinners] = useState([]);
	const [loading, setLoading] = useState(true);
	const { setSinnerShards } = useContext(AccountStateContext);

	useEffect(() => {
		document.title = "Limbus Account Tracker"
	}, [])

	useEffect(() => {
		// Set id to each identity on load
		const dataWithIds = characterData.map(sinner => {
			setSinnerShards(sinner.id, 0);
			
			return {
			...sinner,
			icon: `${SINNER_ICONS_PATH}${sinner.icon}`,
			identities: sinner.identities.map((identity, index) => ({
				id: index,
				...identity,
				image: `${IDENTITY_IMAGE_PATH}${identity.image}`
			})).sort((a,b) => b.rarity - a.rarity)} // Display identities from highest to lowest rarity
		});

		onInit(dataWithIds)
	}, []);

	return null;
}

export default function AppInitializer() {
	const [sinners, setSinners] = useState(null);
	const { shards, nomCrate } = useContext(AccountStateContext);

	if(!sinners) {
		return (
			<>
				<AppInitializerInner onInit={setSinners}/>
				<div>Loading Data</div>
			</>
		)
	}

	return (
		<DispensableProvider sinners={sinners} shards={shards} nomCrate={nomCrate}>
			<App preloadedCharacters={sinners}/>
		</DispensableProvider>
	)
}