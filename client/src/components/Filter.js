import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../context/ContextApi';
import { Select, FormControl, InputLabel, MenuItem, Box, Typography, Button,Accordion,AccordionDetails,AccordionSummary   } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';


function Filter() {
    const { filterPagedata,setApidata,setIsError,isCall,setIsCall } = useContext(Context);
    function uniqueField(array, field) {
        const uniqueValues = new Set();
        const uniqueFieldValues = array.filter(obj => {
            if (!uniqueValues.has(obj[field]) && obj[field] !== undefined && obj[field] !== null && obj[field] !== '') {
                uniqueValues.add(obj[field]);
                return true;
            }
            return false;
        }).map(obj => obj[field]);

        return uniqueFieldValues;
    }
    const uniqueregion = uniqueField(filterPagedata, "region").map((item, index) => {
        return (
            <MenuItem key={index} value={item}>{item}</MenuItem>
        )
    });
    const uniqueSector = uniqueField(filterPagedata, "sector").map((item, index) => {
        return (
            <MenuItem key={index} value={item}>{item}</MenuItem>
        )
    });
    const uniqueTopics = uniqueField(filterPagedata, "topic").map((item, index) => {
        return (
            <MenuItem key={index} value={item}>{item}</MenuItem>
        )
    });
    const uniqueSource = uniqueField(filterPagedata, "source").map((item, index) => {
        return (
            <MenuItem key={index} value={item}>{item}</MenuItem>
        )
    });
    const uniquePestle = uniqueField(filterPagedata, "pestle").map((item, index) => {
        return (
            <MenuItem key={index} value={item}>{item}</MenuItem>
        )
    });


    const [selectedRegions, setSelectedRegions] = useState([]);

    const handleChange1 = (event) => {
        setSelectedRegions(event.target.value);
    };
    const [selectedSectors, setSelectedSectors] = useState([]);

    const handleChange2 = (event) => {
        setSelectedSectors(event.target.value);
    };
    const [selectedTopics, setSelectedTopics] = useState([]);

    const handleChange3 = (event) => {
        setSelectedTopics(event.target.value);
    };
    const [selectedSources, setSelectedSources] = useState([]);

    const handleChange4 = (event) => {
        setSelectedSources(event.target.value);
    };
    const [selectedPestles, setSelectedPestles] = useState([]);

    const handleChange5 = (event) => {
        setSelectedPestles(event.target.value);
    };

const URL=`http://localhost:5000/api/data/like?region=${selectedRegions.toString()}&source=${selectedSources.toString()}&sector=${selectedSectors.toString()}&topic=${selectedTopics.toString()}&pestle=${selectedPestles.toString()}`;

  const fetchData=async()=>{
    try {
      const response = await fetch(URL,{
        method:"GET"
      });
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setApidata(data);
      setIsError(false);
      setIsCall(true);
  
    } catch (error) {
        setIsError(true)
      console.error('Error fetching data:', error);
    }
  }

function empty(){
    setSelectedRegions([]);
    setSelectedPestles([]);
    setSelectedSectors([]);
    setSelectedTopics([]);
    setSelectedSources([]);
    setApidata(filterPagedata)
}

useEffect(()=>{
    fetchData()
},[selectedPestles,selectedRegions,selectedSectors,selectedSources,selectedTopics])

const isempty=selectedPestles.length || selectedRegions.length || selectedSectors.length || selectedSources.length || selectedTopics.length;
console.log(isempty)
    return (
        <Box sx={{ marginTop: "10rem",padding:"0 5rem",display:"flex",gp:"2rem",flexWrap:"wrap" }}>
            <Accordion sx={{width:"100%",border:"0.1rem solid rgba(0,0,0,0.2)"}} elevation={0}>
            <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Typography variant='h2' sx={{ fontWeight: "600", margiBottom: "2rem",textTransform:"capitalize" }}>Filter</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{display:"flex",gap:"2rem",flexWrap:"wrap"}}>
            <FormControl fullWidth>
                <InputLabel id="multiple-select-label">Select regions</InputLabel>
                <Select
                    labelId="multiple-select-label"
                    id="multiple-select"
                    multiple
                    value={selectedRegions}
                    onChange={handleChange1}
                >
                    {uniqueregion}
                </Select>
            </FormControl>
            
            <FormControl fullWidth>
                <InputLabel id="multiple-select-label">Select sectors</InputLabel>
                <Select
                    labelId="multiple-select-label"
                    id="multiple-select"
                    multiple
                    value={selectedSectors}
                    onChange={handleChange2}
                >
                    {uniqueSector}
                </Select>
            </FormControl>
           
            <FormControl fullWidth>
                <InputLabel id="multiple-select-label">Select topics</InputLabel>
                <Select
                    labelId="multiple-select-label"
                    id="multiple-select"
                    multiple
                    value={selectedTopics}
                    onChange={handleChange3}
                >
                    {uniqueTopics}
                </Select>
            </FormControl>
          
            <FormControl fullWidth>
                <InputLabel id="multiple-select-label">Select sources</InputLabel>
                <Select
                    labelId="multiple-select-label"
                    id="multiple-select"
                    multiple
                    value={selectedSources}
                    onChange={handleChange4}
                >
                    {uniqueSource}
                </Select>
            </FormControl>
        
            <FormControl fullWidth>
                <InputLabel id="multiple-select-label">Select pestle</InputLabel>
                <Select
                    labelId="multiple-select-label"
                    id="multiple-select"
                    multiple
                    value={selectedPestles}
                    onChange={handleChange5}
                >
                    {uniquePestle}
                </Select>
            </FormControl>
           {/* <Button variant='contained' disabled={!isempty?true:false} sx={{backgroundColor:"#673ab7",":hover":{backgroundColor:"#512da8"}}} >Apply Filters</Button> */}
           <Button variant='contained' disabled={!isempty?true:false} sx={{backgroundColor:"#673ab7",":hover":{backgroundColor:"#512da8"}}} onClick={()=>empty()}>Clear Filters</Button>
           </AccordionDetails>
           </Accordion>
        </Box>
    )
}

export default Filter