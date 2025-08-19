import './filter-button.css'
import { useState, useEffect } from 'react';
import { loadIcon } from '@/utils/iconLoader';

const FilterButton = ({ value, isSelected, onClick, icon, tooltipText }) => {
  const [iconSrc, setIconSrc] = useState(null);
  useEffect(() => {
    let isMounted = true;

    loadIcon(icon).then(setIconSrc)

    return () => {
      isMounted = false;
    };
  }, [icon]);

  const handleClick = () => {
    onClick(value);
  }

  return (
    <div className='filter-button-container'>
      <button className={`filter-button ${isSelected?'toggled':''}`} onClick={() => handleClick()}>
        <img src={iconSrc}></img>
      </button>
      <span className='tooltip-text'>{tooltipText}</span>
    </div>
  )
}

export default FilterButton;