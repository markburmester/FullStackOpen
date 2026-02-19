import { Link } from 'react-router-dom'

const Menu = () => {
  const menuStyle = {
    display: 'flex',
    gap: '15px',
    padding: '15px 0',
    marginBottom: '20px',
    borderBottom: '1px solid #e0e0e0',
    alignItems: 'center'
  }

  const linkStyle = {
    textDecoration: 'none',
    color: '#0071e3',
    padding: '8px 16px',
    borderRadius: '8px',
    fontSize: '15px',
    fontWeight: '600',
    transition: 'all 0.2s ease',
    letterSpacing: '-0.3px'
  }

  return (
    <div style={menuStyle}>
      <Link to='/' style={linkStyle} className="menu-link">Blogs</Link>
      <Link to='/create' style={linkStyle} className="menu-link">Create new</Link>
      <Link to='/users' style={linkStyle} className="menu-link">Users</Link>
    </div>
  )
}

export default Menu
