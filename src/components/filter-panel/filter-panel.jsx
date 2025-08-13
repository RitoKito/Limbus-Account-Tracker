import './filter-panel.css'
import FilterButton from './filter-button/filter-button.jsx'

const rarities = [
  { rarity: 0, label: "0" },
  { rarity: 1, label: "00" },
  { rarity: 2, label: "000" },
]

const damageTypes = [
  { type: "Blunt", label: "B" },
  { type: "Slash", label: "S" },
  { type: "Pierce", label: "P" },
]

const FilterPanel = ({ filters, toggleRarity, toggleDamageType }) => {
    return(
        <div className='filter-panel'>
          <div className='rarity-panel'>
            {rarities.map(({rarity, label}) => (
              <FilterButton
                key={rarity}
                value={rarity}
                label={label}
                onClick={() => toggleRarity(rarity)}
                isSelected={filters.rarities.includes(rarity)}
              />
            ))}
          </div>

          <div className='damage-type-panel'>
            {damageTypes.map(({type, label}) => (
              <FilterButton
                key={type}
                value={type}
                label={label}
                onClick={() => toggleDamageType(type)}
                isSelected={filters.rarities.includes(type)}
              />
            ))}
          </div>
          <div className='sinner-panel'>
            <FilterButton label={"Y"}></FilterButton>
            <FilterButton label={"F"}></FilterButton>
            <FilterButton label={"D"}></FilterButton>
          </div>
        </div>
    )
}

export default FilterPanel;