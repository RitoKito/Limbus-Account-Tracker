import './FilterButton.css'

const FilterButton = ({ value, isSelected, onClick, icon, tooltipText, width='45px' }) => {
  const handleClick = () => {
    onClick(value);
  }

  return (
    <div className='filter-button-container'>
      <button 
        className={`filter-button ${isSelected?'toggled':''}`} 
        onClick={() => handleClick()}
        style={{ width }}
        >
          {icon?<img src={icon}></img>:`${tooltipText}`}
      </button>
      <span className='tooltip-text'>{tooltipText}</span>
    </div>
  )
}

export default FilterButton;