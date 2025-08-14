import { useState, useEffect } from 'react';
import './filter-button.css'

const iconMap = import.meta.glob('../../../assets/button_icons/**/*.png');

const FilterButton = ({ value, isSelected, onClick, icon, tooltipText }) => {
  const [iconSrc, setIconSrc] = useState(null);
  useEffect(() => {
    let isMounted = true;

    async function loadIcon() {
      if(!icon) return;

      const iconPath = `../../../assets/button_icons/${icon}`;
      const loader = iconMap[iconPath];

      if(loader) {
        const module = await loader();
        if(isMounted) {
          setIconSrc(module.default);
        }
      }
      else {
        console.warn(`Icon not found for path: ${iconPath}`);
      }
    }

    loadIcon();

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