import { NavLink } from 'react-router-dom';

const navigationItems = [
  { label: 'Home', to: '/', end: true },
  { label: 'About Us', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Portfolio', to: '/portfolio' },
  { label: 'Experience', to: '/experience' },
  { label: 'Contact', to: '/contact' },
];

export default function PrimaryNavigation({ onNavigate, className = '' }) {
  return (
    <nav
      aria-label="Primary navigation"
      className={`primary-navigation ${className}`.trim()}
    >
      <ul className="primary-navigation__list">
        {navigationItems.map(({ label, to, end }) => (
          <li className="primary-navigation__item" key={to}>
            <NavLink
              className={({ isActive }) =>
                `primary-navigation__link${isActive ? ' is-active' : ''}`
              }
              end={end}
              onClick={onNavigate}
              to={to}
            >
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
