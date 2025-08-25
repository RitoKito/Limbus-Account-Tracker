import { useContext, useEffect, useMemo, useState } from 'react'

import FilterPanel from '@/components/FilterPanel/FilterPanel.jsx'
import SinnerPanel from '@/components/SinnerPanel/SinnerPanel.jsx'

import useFilteredSinners from '@/hooks/useFilteredSinners.jsx'

import { AccountStateContext } from '@/context/AccountStateContext.jsx'
import CurrencyPanel from '@/components/CurrencyPanel/CurrencyPanel.jsx'
import { CharacterDataContext } from '@/context/CharacterDataContext'
import { DispensableContext } from '@/context/DispensableContext'

const App = () => {
  const { characters } = useContext(CharacterDataContext);

  const {
    addToWishlist,
    removeFromWishlist,
    markOwned,
    markUnowned,
    wishlistSet,
    ownedSet,
  } = useContext(AccountStateContext);

  const accountStateHandlers = useMemo(() => ({
    addToWishlist: addToWishlist,
    removeFromWishlist: removeFromWishlist,
    markOwned: markOwned,
    markUnowned: markUnowned,
  }),[
    addToWishlist, removeFromWishlist,
    markOwned, markUnowned
  ]);

  const { dispensable } = useContext(DispensableContext);

  const [sinners, setSinners] = useState(characters);

  const [filters, setFilters] = useState({
    rarities: [],
    damageTypes: [],
    sinTypes: [],
    sinnerNames: [],
    searchTerm: '',
  });

  const [filterCount, setFilterCounter] = useState(0);

  const toggleFilter = (category, value) => {
    setFilters(prev => {
      const currentValues = prev[category];

      if(Array.isArray(currentValues)) {
        return {
          ...prev,
          [category]: currentValues.includes(value)
            ? currentValues.filter(v => v !== value)
            : [...currentValues, value]
        };
      }

      return {
        ...prev,
        [category]: value
      };
    });
  };

  const toggleRarity = (rarity) => {
    toggleFilter('rarities', rarity);
  };

  const toggleDamageType = (type) => {
    toggleFilter('damageTypes', type);
  };

  const toggleSinType = (type) => {
    toggleFilter('sinTypes', type);
  }

  const toggleSinner = (sinner) => {
    toggleFilter('sinnerNames', sinner)
  }

  const setSearchTerm = (input) => {
    toggleFilter('searchTerm', input)
  }

  const clearFilters = () => {
    setFilters((prev) => ({
      ...prev,
      rarities: [],
      damageTypes: [],
      sinTypes: [],
      sinnerNames: [],
    }));
  }
  const filteredSinners = useFilteredSinners(sinners, filters)

  useEffect(() => {
    const filterCount = Object.entries(filters).reduce((acc, [key, value]) => {
      if(key === 'searchTerm') return acc;
      return acc + (Array.isArray(value) ? value.length : 0)
    }, 0);

    setFilterCounter(filterCount);
  }, [filters, sinners]);

  return (
    <main className='main-content vbox'>
      <h1 className='title'>Currency</h1>
      <section>
        <CurrencyPanel sinners={sinners}/>
      </section>

      <h1 className='title'>Identities</h1>

      <section>
        <h2 className='section-title'>
          {`Filters (${filterCount})`}
        </h2>
        <FilterPanel
          filters={filters}
          sinners={sinners}
          toggleRarity={toggleRarity}
          toggleDamageType={toggleDamageType}
          toggleSin={toggleSinType}
          toggleSinner={toggleSinner}
          setSearchTerm={setSearchTerm}
          clearFilters={clearFilters}
        />
      </section>

      <section>
        <h2 className='section-title'>
          {`Identities (${filteredSinners.idCount}):`}
        </h2>
        {filteredSinners.sinners.map((sinner) => (
          <SinnerPanel 
            key={sinner.id}
            sinner={sinner}
            accountStateHandlers={accountStateHandlers}
            wishlistSet={wishlistSet.sinners[sinner.id]?.identities??new Set()}
            ownedSet={ownedSet.sinners[sinner.id]?.identities??new Set()}
            dispensable={dispensable[sinner.name]??{}} 
          />
        ))}
      </section>
    </main>
  )
}

export default App
