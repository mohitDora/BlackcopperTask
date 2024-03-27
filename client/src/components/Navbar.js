import React, { useContext} from 'react';
import { Context } from '../context/ContextApi';
import './navbar.css';
import LightModeIcon from '@mui/icons-material/LightMode';
import { Button, IconButton } from '@mui/material';
import ResponsiveDrawer from './ResponsiveDrawer';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

function Navbar() {

  const { setOpen } = useContext(Context);

  
  return (
    <div className="navbar-container" >
      <nav className="glass-navbar">
        <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
          <IconButton onClick={()=>setOpen(true)} style={{color:"black",fontSize:"5rem"}}>
<MenuIcon></MenuIcon>
          </IconButton>
        <Link to="/" style={{textDecoration:"none",color:"black"}}>
        <div className="navbar-logo">Dashboard</div>
        </Link>
        
        </div>
        
        {/* <IconButton style={{color:"black",}}>
            <LightModeIcon></LightModeIcon>
        </IconButton> */}
       
      </nav>
      <ResponsiveDrawer></ResponsiveDrawer>
    </div>
  );
}

export default Navbar;
