import React from 'react';
import AuthContextComponent from '../auth/AuthContextComponent';
import validToken from '../auth/validToken';

const Navbar = ({ onModalToggle }) => {
  return (
    <nav style={{ backgroundColor: '#dedede', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '25px' }}>
      <div>
        <img src="logo.png" alt="Logo" style={{ width: '50px', height: '50px', color: 'black' }} />
        <span></span>
      </div>
      <div>
        <button style={{ padding: '10px', borderRadius: '10px', backgroundColor: 'white', color: 'black', marginRight: '10px' }} onClick={onModalToggle}>Create poll</button>
        <button style={{ padding: '10px', borderRadius: '10px', backgroundColor: 'white', color: 'black' }}>Log out</button>
      </div>
    </nav>
  );
};

export default Navbar;
