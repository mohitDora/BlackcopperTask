import React from 'react';
import BarChartcode from './BarChartcode';
import RadarChartcode from './RadarChartCode';
import PieChartCode from './PieChartCode';
import { Box } from '@mui/material';

const Home = () => {
    return (
        <>
            
            <Box sx={{ display: "flex", flexDirection: {xs:"column",md:"row"}, gap: "2rem" }}>
                <BarChartcode props="intensity"/>
                <BarChartcode props="likelihood"/>
            </Box>
           
            <Box sx={{ display: "flex", flexDirection: {xs:"column",md:"row"}, gap: "2rem" }}>
                <Box sx={{flexGrow:1}}>
                <RadarChartcode props="relevance"></RadarChartcode>
                </Box>
                <Box sx={{flexGrow:1}}>
                <PieChartCode></PieChartCode>
                </Box>
                
            </Box>
            
        </>
    );
};

export default Home;
