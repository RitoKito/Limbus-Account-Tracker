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

const FilterPanel = ({ filters, sinners, toggleRarity, toggleDamageType, toggleSinner, setSearchTerm, clearFilters }) => {
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
      className: 'sinner-panel',
      panelName: 'Sinners',
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