import { NavLink } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="navbar">
      <NavLink to="/" className="logo">
        <div className="logo-icon">✦</div>
        <span><strong>Placement</strong><span className="purple">Analyzer</span></span>
      </NavLink>
      <div className="nav-links">
        {[['/', 'Home'], ['/analyze', 'Analyze'],
          ['/assessment', 'Assessment'], ['/dashboard', 'Dashboard']
        ].map(([path, label]) => (
          <NavLink
            key={path}
            to={path}
            end={path === '/'}
            className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}
          >
            {label}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}