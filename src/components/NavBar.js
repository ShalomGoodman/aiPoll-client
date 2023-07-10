import React from 'react';

function Navbar() {
  return (
    <nav className='Navbar'>
      <div className="Nav-logo">
        {/* Logo */}
      </div>
      <ul className="Nav-button">
        <li><button>Log out</button></li>
      </ul>
    </nav>
  );
}

export default Navbar;
