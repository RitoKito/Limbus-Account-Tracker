export const calcDispensableIdentitiesAll = (sinners, shards, nomCrate) => {
	const updatedSinners = sinners.reduce((acc, sinner) => {
		const totalShards = (shards[sinner.id] || 0) + nomCrate * 2;
		acc[sinner.id] = totalShards >= 200 ? Math.floor((totalShards/400)*2)/2 : 0;
		return acc;
	}, {});

	return updatedSinners;
};

export const calcDispensableIdentitiesSingle = (sinnerId, shards, nomCrate) => {
	const totalShards = (shards[sinnerId] || 0) + nomCrate * 2;

	return totalShards >= 200 ? Math.floor((totalShards/400)*2)/2 : 0;
};