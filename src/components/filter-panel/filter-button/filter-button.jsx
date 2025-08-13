import './filter-button.css'

const FilterButton = ({ value, isSelected, onClick, label}) => {
  const handleClick = () => {
    console.log("Toggling " + value);
    onClick(value);
  }

  return (
    <div className='icon-container'>
      <button className='button' onClick={() => handleClick()}>
        {label}
      </button>
    </div>
  )
}

export default FilterButton;