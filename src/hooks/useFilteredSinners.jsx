import { useEffect, useState } from "react";

const noFiltersApplied = (filters) => {
  return (
    filters.rarities.length === 0 &&
    filters.damageTypes.length === 0 &&
    filters.sinnerNames.length === 0 &&
    filters.searchTerm.trim() === ''
  );
}

const filterSinnersByName = (sinners, selectedNames) => {
  if (selectedNames.length === 0) return sinners;
  return sinners.filter(sinner => selectedNames.includes(sinner.name));
}

const filterByRarityAndType = (sinners, rarities, damageTypes) => {
  return sinners.map((sinner) => {
    const matchingIds = sinner.identities.filter(identitiy => {
      const rarityMatch = rarities.length === 0 || rarities.includes(identitiy.rarity);
      const damageTypeMatch = damageTypes.length === 0 || damageTypes.includes(identitiy.damageType);
      return rarityMatch && damageTypeMatch;
    });
  return matchingIds.length > 0
    ? { ...sinner, identities:matchingIds }
    : null;
  }).filter(Boolean);
}

const filterBySearchTerm = (sinners, term) => {
  return sinners.map((sinner) => {
    const matchingIds = sinner.identities.filter((identitiy) => 
      identitiy.name.toLowerCase().includes(term)
    );
    
    if(matchingIds.length > 0) {
      return {...sinner, identities: matchingIds};
    }

    return null;
  }).filter(Boolean);
}

const useFilteredSinners = (sinners, filters) => {
    const [filteredSinners, setFilteredSinners] = useState([]);
    const [filteredIdsCount, setFilteredIdsCount] = useState(0);

    useEffect(() => {
      let totalIdCount = 0;

      if(noFiltersApplied(filters)) {

        setFilteredSinners(sinners);

        totalIdCount = sinners.reduce((acc, sinner) => acc + sinner.identities.length, 0);
        setFilteredIdsCount(totalIdCount);
      }
      else {
        let filtered = [...sinners];

        filtered = filterSinnersByName(filtered, filters.sinnerNames);
        filtered = filterByRarityAndType(filtered, filters.rarities, filters.damageTypes);
        
        const term = filters.searchTerm.trim().toLowerCase();
        filtered = filterBySearchTerm(filtered, term);

        totalIdCount = filtered.reduce((acc, sinner) => acc + sinner.identities.length, 0);

        setFilteredSinners(filtered);
        setFilteredIdsCount(totalIdCount);
      }
  }, [sinners, filters]);

  return {sinners: filteredSinners, idCount: filteredIdsCount};
};

export default useFilteredSinners;