import { useEffect, useState } from "react";

const useFilteredSinners = (sinners, filters) => {
    const [filteredSinners, setFilteredSinners] = useState([]);

    useEffect(() => {
    if(filters.rarities.length === 0 &&
        filters.damageTypes.length === 0) {
      setFilteredSinners(sinners)
    }
    else {
      const filtered = sinners
        .map(sinner => {
          const matchingIds = sinner.identities.filter(identitiy => {
            const rarityMatch = filters.rarities.length === 0 || filters.rarities.includes(identitiy.rarity);
            const damageTypeMatch = filters.damageTypes.length === 0 || filters.damageTypes.includes(identitiy.damageType);
            return rarityMatch && damageTypeMatch;
          }
        );
          return matchingIds.length > 0
            ? { ...sinner, identities:matchingIds }
            : null;
        }).filter(Boolean);
      setFilteredSinners(filtered);
    }
  }, [sinners, filters]);

  return filteredSinners;
};

export default useFilteredSinners;