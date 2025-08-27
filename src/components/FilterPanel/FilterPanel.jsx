import './FilterPanel.css'
import FilterButton from './FilterButton/FilterButton.jsx'
import {getFilterPanelConfigs} from './FilterPanelConfig.js'

const FilterPanel = ({
  filters,
  sinners,
  toggleOwned,
  toggleWishlisted,
  toggleRarity,
  toggleDamageType,
  toggleSin,
  toggleSinner,
  setSearchTerm,
  clearFilters,
}) => {
  const FILTER_PANEL_CONFIGS = getFilterPanelConfigs({
    filters,
    sinners,
    toggleRarity,
    toggleDamageType,
    toggleSin,
    toggleSinner,
  });
  
  return(
  <div className='vbox'>

    <div className='search-filter-container'>
      <input
        id="search-input"
        className='search-input' 
        type="text"
        placeholder='Search by name...' 
        onChange={(e) => setSearchTerm(e.target.value)}/>
      <button onClick={clearFilters}>
        Clear Filters
      </button>
    </div>
    
    <section className='filter-panel'>
      {FILTER_PANEL_CONFIGS.map(({ className, panelName, data, valueKey, tooltipKey, iconKey, onClick, selected }) => (
        <div key={className} className={className}>
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
      ))}
    </section>

    <h3 className='filter-btns-section'>Filter by Owned / Wishlisted</h3>
    <section className='filter-account-state'>
      <FilterButton 
        width='100px' 
        tooltipText={'Owned'}
        isSelected={filters.ownedEnabled}
        onClick={toggleOwned}
      />
      <FilterButton 
        width='100px' 
        tooltipText={'Wishlisted'}
        isSelected={filters.wishlistedEnabled}
        onClick={toggleWishlisted}
      />
    </section>
  </div>
  )
}

export default FilterPanel;