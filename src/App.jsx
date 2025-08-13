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
  });

  useEffect(() => {
    setSinners(characterData);
  }, []);

  const toggleRarity = (rarity) => {
    toggleFilter('rarities', rarity);
  };

  const toggleDamageType = (type) => {
    toggleFilter('damageTypes', type);
  };

  const toggleFilter = (category, value) => {
    setFilters(prev => {
      const currentValues = prev[category];
      return {
        ...prev,
        [category]: currentValues.includes(value)
          ? currentValues.filter(v => v !== value)
          : [...currentValues, value]
      };
    });
  };

  useEffect(() => {
    console.log("Filters Updated: ", filters)
  }, [filters])

  const filteredSinners = useFilteredSinners(sinners, filters)

  return (
    <>
      <div className='vbox'>
        <h1>Identities</h1>
        <div className='hbox'>
          <FilterPanel
            filters={filters}
            toggleRarity={toggleRarity}
            toggleDamageType={toggleDamageType}
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
