import React from 'react';


function Navbar() {
  return (
    <nav className='Navbar'>
      <div className="Nav-logo">
        {/* Logo */}
      </div>
      <ul className="Nav-logout">
        <li><button>Log out</button></li>
      </ul>
    </nav>
  );
}

export default Navbar;
