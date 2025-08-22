import './filter-panel.css'
import FilterButton from './filter-button/filter-button.jsx'

const rarities = [
  { rarity: 0, tooltipText: "0", icon: "2/21/IDNumber1.png" },
  { rarity: 1, tooltipText: "00", icon: "9/90/IDNumber2.png" },
  { rarity: 2, tooltipText: "000", icon: "8/82/IDNumber3.png" },
]

const damageTypes = [
  { type: "Blunt", icon: "7/7f/Blunt.png" },
  { type: "Slash", icon: "5/56/Slash.png" },
  { type: "Pierce", icon: "9/9b/Pierce.png" },
]

const sinTypes = [
  {type: "Wrath", icon: "1/11/LcbSinWrath.png"},
  {type: "Lust", icon: "c/c2/LcbSinLust.png"},
  {type: "Sloth", icon: "a/a8/LcbSinSloth.png"},
  {type: "Glut", icon: "f/fc/LcbSinGluttony.png"},
  {type: "Gloom", icon: "9/9a/LcbSinGloom.png"},
  {type: "Pride", icon: "b/b3/LcbSinPride.png"},
  {type: "Envy", icon: "f/f2/LcbSinEnvy.png"},
]

const FilterPanel = ({ filters, sinners, toggleRarity, toggleDamageType, toggleSin, toggleSinner, setSearchTerm, clearFilters }) => {
  const filterPanelConfigs = [
  {
    className: 'rarity-panel',
    panelName: 'Rarity',
    data: rarities,
    valueKey: 'rarity',
    tooltipKey: 'tooltipText',
    iconKey: 'icon',
    onClick: toggleRarity,
    selected: filters.rarities,
  },
  {
    className: 'damage-type-panel',
    panelName: 'Damage Type',
    data: damageTypes,
    valueKey: 'type',
    tooltipKey: 'type',
    iconKey: 'icon',
    onClick: toggleDamageType,
    selected: filters.damageTypes,
  },
  {
    className: 'sin-type-panel',
    panelName: 'Sin',
    data: sinTypes,
    valueKey: 'type',
    tooltipKey: 'type',
    iconKey: 'icon',
    onClick: toggleSin,
    selected: filters.sinTypes,
  },
  {
    className: 'sinner-panel',
    panelName: 'Sinner',
    data: sinners,
    valueKey: 'name',
    tooltipKey: 'name',
    iconKey: 'icon',
    onClick: toggleSinner,
    selected: filters.sinnerNames,
  },
  ];
  
  return(
  <div className='vbox'>

    <div className='search-filter-container'>
    <input
      id="search-input"
      className='search-input' 
      type="text"
      placeholder='Search by name...' 
      onChange={(e) => setSearchTerm(e.target.value)}/>
    <button className='reset-filters-btn' onClick={clearFilters}>
      Clear Filters
    </button>
    </div>
    
    <section className='filter-panel'>
    {filterPanelConfigs.map(({ className, panelName, data, valueKey, tooltipKey, iconKey, onClick, selected }) => (
      <div key={className} className={className}>
      <div className='vbox'>

        <h3 className='filter-btns-section'>{panelName}</h3>

        <div className='filter-btns-container'>
        {data.map(buttonDataObj => {
          const value = buttonDataObj[valueKey];
          return (
          <FilterButton
            key={value}
            value={value}
            icon={buttonDataObj[iconKey]}
            tooltipText={buttonDataObj[tooltipKey]}
            onClick={() => onClick(value)}
            isSelected={selected.includes(value)}
          />
          );
        })}
        </div>
        
      </div>
      </div>
    ))}
    </section>
    
  </div>
  )
}

export default FilterPanel;