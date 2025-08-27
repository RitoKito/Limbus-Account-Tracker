import "./NavigationBar.css"
import { NavLink } from 'react-router-dom';

const NavigationBar = () => {
  return(
    <div className="navigation-bar">
      <ul>
        {/*<li><NavLink to="/" className={({ isActive }) => isActive ? 'active-link' : undefined}>About</NavLink></li>*/}
        <li><NavLink to="/" className={({ isActive }) => isActive ? 'active-link' : undefined}>Account Settings</NavLink></li>
        {/*<li><NavLink to="/AccountSummary" className={({ isActive }) => isActive ? 'active-link' : undefined}>Account Summary</NavLink></li>*/}
      </ul>
    </div>
  )
}

export default NavigationBar