import React from 'react';
import Navbar from './Navbar';
import Filter from './Filter';

const Layout = ({children}) => {
    return (
        <>
            <Navbar></Navbar>
            <Filter></Filter>
            {children}
        </>
    );
};

export default Layout;
