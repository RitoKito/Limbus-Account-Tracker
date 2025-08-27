import { identity } from "lodash";
import { useEffect, useState } from "react";

const noFiltersApplied = (filters) => {
  return (
    filters.ownedEnabled === false &&
    filters.wishlistedEnabled === false &&
    filters.rarities.length === 0 &&
    filters.damageTypes.length === 0 &&
    filters.sinTypes.length === 0 &&
    filters.sinnerNames.length === 0 &&
    filters.searchTerm.trim() === ''
  );
}

const filterSinnersByName = (sinners, selectedNames) => {
  if (selectedNames.length === 0) return sinners;
  return sinners.filter(sinner => selectedNames.includes(sinner.name));
}

const filterSinnersBySet = (sinners, sinnerSet) => {
  return sinners.map((sinner) => {
    const setIdentities = sinnerSet.sinners[sinner.id]?.identities;

    const matchingIds = sinner.identities.filter(identity => {
      return setIdentities?.has(identity.id);
    })

    return {
      ...sinner,
      identities: matchingIds,
    }
  })
}

const filterByRarityAndType = (sinners, rarities, damageTypes, sinTypes) => {
  return sinners.map((sinner) => {
    const matchingIds = sinner.identities.filter(identity => {

      const rarityMatch = rarities.length === 0 || rarities.includes(identity.rarity);

      const damageTypeMatch =
        damageTypes.length === 0 ||
        (identity.damageTypes.length > 0 && // as empty arrays always return true on .every()
         damageTypes.every(type => identity.damageTypes.includes(type)));
         
      const sinTypeMatch =
        sinTypes.length === 0 ||
        (identity.sinTypes.length > 0 &&
         sinTypes.every(type => identity.sinTypes.includes(type)));
         
      return rarityMatch && damageTypeMatch && sinTypeMatch;
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

      if (filters.ownedEnabled && filters.wishlistedEnabled) {
        const ownedFiltered = filterSinnersBySet(filtered, filters.owned);
        const wishlistedFiltered = filterSinnersBySet(filtered, filters.wishlisted);

        const mergedMap = new Map();

        ownedFiltered.forEach(sinner => mergedMap.set(sinner.id, sinner));
        wishlistedFiltered.forEach(sinner => {
          if(mergedMap.has(sinner.id)){
            const existingSinner = mergedMap.get(sinner.id);

            const mergedIdentities = [
              ...existingSinner.identities,
              ...sinner.identities.filter(id => !existingSinner.identities.some(eid => eid.id === id.id)),
            ];

            mergedMap.set(sinner.id, {
              ...existingSinner,
              identities: mergedIdentities
            });
          }
          else {
            mergedMap.set(sinner.id, sinner);
          }
        });

        filtered = Array.from(mergedMap.values());
      }
      else if(filters.ownedEnabled) {
        filtered = filterSinnersBySet(filtered, filters.owned);
      }
      else if(filters.wishlistedEnabled) {
        filtered = filterSinnersBySet(filtered, filters.wishlisted);
      }

      filtered = filterSinnersByName(filtered, filters.sinnerNames);
      filtered = filterByRarityAndType(filtered, filters.rarities, filters.damageTypes, filters.sinTypes);
      
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