import { use, useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import FilterPanel from './components/filter-panel/filter-panel.jsx'
import SinnerPanel from './components/sinner-panel/sinner-panel.jsx'

import useFilteredSinners from './hooks/useFilteredSinners.jsx'

import characterData from "./data/data.json"

const App = () => {

  const [sinners, setSinners] = useState([]);

  const [filters, setFilters] = useState({
    rarities: [],
    damageTypes: [],
    sinnerNames: [],
    searchTerm: '',
  });

  useEffect(() => {
    setSinners(characterData);
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
    console.log("Filters Updated: ", filters)
  }, [filters])


  return (
    <>
      <div className='vbox'>
        <h1>Identities</h1>
        <div className='hbox'>
          <FilterPanel
            filters={filters}
            sinners={sinners}
            toggleRarity={toggleRarity}
            toggleDamageType={toggleDamageType}
            toggleSinner={toggleSinner}
            setSearchTerm={setSearchTerm}
            clearFilters={clearFilters}
          />
        </div>
        <div className='sinners'>
          {filteredSinners.map((sinner) => (
            <SinnerPanel 
            key={sinner.id}
            sinner={sinner}/>
          ))}
        </div>
      </div>
    </>
  )
}

export default App
