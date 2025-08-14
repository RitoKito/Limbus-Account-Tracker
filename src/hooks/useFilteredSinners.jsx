import { useEffect, useState } from "react";

const useFilteredSinners = (sinners, filters) => {
    const [filteredSinners, setFilteredSinners] = useState([]);

    useEffect(() => {
      if(filters.rarities.length === 0 &&
          filters.damageTypes.length === 0 &&
          filters.sinnerNames.length === 0 &&
          filters.searchTerm.trim() === '') {
        setFilteredSinners(sinners)
      }
      else {
        var filtered = [...sinners];

        //Filter by sinner name
        if(filters.sinnerNames.length !== 0){
          filtered = filtered.filter((sinner) => {
            return filters.sinnerNames.includes(sinner.name);
          })
        }

        //Filter sinner(s)' identities by rarity and damage type
        filtered = filtered.map((sinner) => {
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
        
        //Filter by search term
        const term = filters.searchTerm.trim().toLowerCase();
        filtered = filtered.map((sinner) => {
          const matchingIds = sinner.identities.filter((identitiy) => 
            identitiy.name.toLowerCase().includes(term)
          );

          if(matchingIds.length > 0) {
            return {...sinner, identities: matchingIds};
          }

          return null;
        }).filter(Boolean);

        setFilteredSinners(filtered);
      }
  }, [sinners, filters]);

  return filteredSinners;
};

export default useFilteredSinners;