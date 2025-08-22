import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import FilterPanel from './components/filter-panel/filter-panel.jsx'
import SinnerPanel from './components/sinner-panel/sinner-panel.jsx'

import useFilteredSinners from './hooks/useFilteredSinners.jsx'

import characterData from "./data/data.json"

import { AccountStateContext } from './context/AccountStateContext.jsx'
import AccountStateWidget from './components/account-state-widget/AccountStateWidget.jsx'

const App = () => {
  const { addToWishlist, removeFromWishlist, wishlistSet } = useContext(AccountStateContext);
  const wishlistHandlers = useMemo(() => ({
    add: addToWishlist,
    remove: removeFromWishlist,
  }), [addToWishlist, removeFromWishlist]);

  /*useEffect(() => {
    console.log("Account State Updated")
    console.log(accountState);
  }, [accountState])*/

  const [sinners, setSinners] = useState([]);

  const [filters, setFilters] = useState({
    rarities: [],
    damageTypes: [],
    sinTypes: [],
    sinnerNames: [],
    searchTerm: '',
  });

  const [filterCount, setFilterCounter] = useState(0);

  useEffect(() => {
    // Set id to each identity on load
    const dataWithIds = characterData.map(sinner => ({
      ...sinner,
      identities: sinner.identities.map((identity, index) => ({
        id: index,
        ...identity
      }))
    }));

    setSinners(dataWithIds);
  }, []);

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

      <AccountStateWidget 
        wishlistHandlers={wishlistHandlers}
        wishlistSet={wishlistSet}
      />

      <h1 className='title'>Identities</h1>

      <section>

        <h2 className='section-title'>
          {`Filters (${filterCount})`}
        </h2>
        {console.log(wishlistSet)}
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
          {`Filtered Identities (${filteredSinners.idCount}):`}
        </h2>
        {filteredSinners.sinners.map((sinner) => (
          <SinnerPanel 
            key={sinner.id}
            sinner={sinner}
            wishlistHandlers={wishlistHandlers}
            wishlistSet = {wishlistSet.sinners[sinner.id]?.identities??new Set()}
          />
        ))}
      </section>
    </main>
  )
}

export default App
