import React, { useContext } from 'react';
import { Context } from '../context/ContextApi';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';

import Toolbar from '@mui/material/Toolbar';
import { Link } from 'react-router-dom';


function ResponsiveDrawer(props) {
  const { setOpen,open } = useContext(Context);



const drawer = (
  <div>
    <Toolbar />
    <Divider />
    <List>
      <Link to="/bar-intensity" style={{textDecoration:"none",color:"black"}}>
      <ListItemButton onClick={()=>setOpen(false)}>
      <ListItem sx={{padding:"1rem 4rem",textDecoration:"none",color:"black"}}>Intensity</ListItem>
      </ListItemButton>
      </Link>
      <Link to="/bar-likelihood" style={{textDecoration:"none",color:"black"}}>
      <ListItemButton onClick={()=>setOpen(false)}>
      <ListItem sx={{padding:"1rem 4rem"}}>Likelihood</ListItem>
      </ListItemButton>
      </Link>
      <Link to="/pie-country" style={{textDecoration:"none",color:"black"}}>
      <ListItemButton onClick={()=>setOpen(false)}>
      <ListItem sx={{padding:"1rem 4rem"}}>Country</ListItem>
      </ListItemButton>
      </Link>
      <Link to="/radar-relevance" style={{textDecoration:"none",color:"black"}}>
      <ListItemButton onClick={()=>setOpen(false)}>
      <ListItem sx={{padding:"1rem 4rem"}}>Relevance</ListItem>
      </ListItemButton>
      </Link>
      <Link to="/stack-bar-topics" style={{textDecoration:"none",color:"black"}}>
      <ListItemButton onClick={()=>setOpen(false)}>
      <ListItem sx={{padding:"1rem 4rem"}}>Topics</ListItem>
      </ListItemButton>
      </Link>
    </List>
    
  </div>
);

 console.log(open)

  return (
    <>
    <div>
      
      <Drawer open={open} onClose={()=>setOpen(false)}>
        {drawer}
      </Drawer>
    </div>
    
    </>
  );
}

export default ResponsiveDrawer;