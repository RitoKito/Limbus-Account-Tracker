import './filter-panel.css'
import FilterButton from './filter-button/filter-button.jsx'

const rarities = [
  { rarity: 0, tooltipText: "0", icon: "rarity_icons/rarity_1.png" },
  { rarity: 1, tooltipText: "00", icon: "rarity_icons/rarity_2.png" },
  { rarity: 2, tooltipText: "000", icon: "rarity_icons/rarity_3.png" },
]

const damageTypes = [
  { type: "Blunt", icon: "damage_type_icons/Blunt.png" },
  { type: "Slash", icon: "damage_type_icons/Slash.png" },
  { type: "Pierce", icon: "damage_type_icons/Pierce.png" },
]


// TODO refactor search filter container
const FilterPanel = ({ filters, sinners, toggleRarity, toggleDamageType, toggleSinner, setSearchTerm, clearFilters }) => {
    return(
      <div className='vbox'>
        <div className='search-filter-container'>
          <input className='search-input' type="text" placeholder='Search by name...' onChange={(e) => setSearchTerm(e.target.value)}/>
          <button className='reset-filters-btn' onClick={clearFilters}>Clear Filters</button>
        </div>
        
        <div className='filter-panel'>
          <div className='rarity-panel'>
            {rarities.map(({rarity, tooltipText, icon}) => (
              <FilterButton
                key={rarity}
                value={rarity}
                icon={icon}
                tooltipText={tooltipText}
                onClick={() => toggleRarity(rarity)}
                isSelected={filters.rarities.includes(rarity)}
              />
            ))}
          </div>

          <div className='damage-type-panel'>
            {damageTypes.map(({type, icon}) => (
              <FilterButton
                key={type}
                value={type}
                icon={icon}
                tooltipText={type}
                onClick={() => toggleDamageType(type)}
                isSelected={filters.damageTypes.includes(type)}
              />
            ))}
          </div>

          <div className='sinner-panel'>
            {sinners.map(sinner => (
              <FilterButton
                key={sinner.name}
                value={sinner.name}
                label={sinner.name[0]}
                icon={sinner.icon}
                tooltipText={sinner.name}
                onClick={() => toggleSinner(sinner.name)}
                isSelected={filters.sinnerNames.includes(sinner.name)}
              />
            ))}
          </div>
        </div>
      </div>
    )
}

export default FilterPanel;