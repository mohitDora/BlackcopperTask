import React from 'react';
import './navbar.css';
import LightModeIcon from '@mui/icons-material/LightMode';
import { IconButton } from '@mui/material';

function Navbar() {
  return (
    <div className="navbar-container">
      <nav className="glass-navbar">
        <div className="navbar-logo">Dashboard</div>
        <IconButton>
            <LightModeIcon></LightModeIcon>
        </IconButton>
       
      </nav>
    </div>
  );
}

export default Navbar;
