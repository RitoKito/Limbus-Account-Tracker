import './FilterButton.css'

const FilterButton = ({ value, isSelected, onClick, icon, tooltipText }) => {
  const handleClick = () => {
    onClick(value);
  }

  return (
    <div className='filter-button-container'>
      <button className={`filter-button ${isSelected?'toggled':''}`} onClick={() => handleClick()}>
        <img src={icon}></img>
      </button>
      <span className='tooltip-text'>{tooltipText}</span>
    </div>
  )
}

export default FilterButton;