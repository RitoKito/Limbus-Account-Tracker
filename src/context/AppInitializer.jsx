import { useContext, useEffect, useState } from "react";
import { AccountStateContext } from "./AccountStateContext";

import characterData from "@/data/data.json";
import App from "@/App";
import { DispensableProvider } from "./DispensableContext";
import { WIKI_BASE_IMAGE_URL } from "@/config";

export function AppInitializerInner({ onInit }) {
	const [sinners, setSinners] = useState([]);
	const [loading, setLoading] = useState(true);
	const { setSinnerShards } = useContext(AccountStateContext);

	useEffect(() => {
		// Set id to each identity on load
		const dataWithIds = characterData.map(sinner => {
			setSinnerShards(sinner.name, 0);
			
			return {
			...sinner,
			icon: `${WIKI_BASE_IMAGE_URL}${sinner.icon}`,
			identities: sinner.identities.map((identity, index) => ({
				id: index,
				...identity,
				image: `${WIKI_BASE_IMAGE_URL}${identity.image}`
			})).sort((a,b) => b.rarity - a.rarity)} // Display identities from highest to lowest rarity
		});

		onInit(dataWithIds)
	}, []);

	useEffect(() => {
		console.log(sinners)
	},[sinners, loading]);

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