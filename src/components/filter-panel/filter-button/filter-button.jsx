import './filter-button.css'
import { WIKI_BASE_IMAGE_URL } from '../../../config';

const FilterButton = ({ value, isSelected, onClick, icon, tooltipText }) => {
  const handleClick = () => {
    onClick(value);
  }

  return (
    <div className='filter-button-container'>
      <button className={`filter-button ${isSelected?'toggled':''}`} onClick={() => handleClick()}>
        <img src={WIKI_BASE_IMAGE_URL + icon}></img>
      </button>
      <span className='tooltip-text'>{tooltipText}</span>
    </div>
  )
}

export default FilterButton;