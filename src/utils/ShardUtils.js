export const calcDispensableIdentitiesAll = (sinners, shards, nomCrate) => {
	const updatedSinners = sinners.reduce((acc, sinner) => {
		const totalShards = (shards[sinner.name] || 0) + nomCrate * 2;
		acc[sinner.name] = totalShards >= 200 ? Math.floor((totalShards/400)*2)/2 : 0;
		return acc;
	}, {});

	return updatedSinners;
};

export const calcDispensableIdentitiesSingle = (sinnerName, shards, nomCrate) => {
	const totalShards = (shards[sinnerName] || 0) + nomCrate * 2;

	return totalShards >= 200 ? Math.floor((totalShards/400)*2)/2 : 0;
};