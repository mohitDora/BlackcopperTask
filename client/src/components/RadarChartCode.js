import React, { useContext,useState,useEffect } from 'react';
import { Context } from '../context/ContextApi';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { Button,Typography,Skeleton } from '@mui/material';

function RadarChartcode({props}) {

  const { apidata,isError,isCall,setIsCall} = useContext(Context);
  const [page, setPage] = useState(0);
  const [chunk, setChunk] = useState(50);
  const [aspect, setAspect] = useState(2);

  const uniqueInsights = {};
  useEffect(() => {
    function handleResize() {
      const width = window.innerWidth;
      if (width < 768) {
        setChunk(20);
        setAspect(1);
      } else if (width >= 768 && width < 1024) {
        setChunk(30);
        setAspect(1);
      } else {
        setChunk(20);
        setAspect(1);
      }
    }

    handleResize();
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [])
  const extractedData = apidata.map((obj) => ({
    key: obj._id,
    [props]: obj[props],
    insight: obj.insight
  }));

  useEffect(()=>{
    if(isCall) setPage(0);
    setIsCall(false)
  },[isCall])
  const uniqueData = extractedData.reduce((result, obj) => {
    if (!uniqueInsights[obj.insight]) {
      const id = Math.random().toString(36).substr(2, 9);
      result.push({ ...obj, id }); 
      uniqueInsights[obj.insight] = true;
    }
    return result;
  }, []);
  
  const slicedData = uniqueData.slice(chunk * page, chunk * (page + 1));
  
  const increment = () => {
    if (!(page > uniqueData.length / chunk - 1)) {
      setPage(page + 1);
    }
  };

  const decrement = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };
console.log("rel",slicedData)
  return (
    
    <div className='main-box'>
        <Typography variant='h2' sx={{fontWeight:"600",marginBottom:"2rem",textTransform:'capitalize'}}>{props}</Typography>
        {!isError?
      <>
      {apidata.length!==0?
          <ResponsiveContainer width="100%" aspect={aspect}>
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={slicedData}>
          <PolarGrid />
          <PolarAngleAxis dataKey="insight" />
          <PolarRadiusAxis />
          <Radar name="Mike" dataKey="relevance" stroke="#8884d8" fill="#673ab7" fillOpacity={1} />
        </RadarChart>
        <Button variant='contained'  sx={{backgroundColor:"#673ab7",":hover":{backgroundColor:"#512da8"}}} onClick={() => increment()} disabled={page >= uniqueData.length / chunk - 1}>next</Button>
        <Button variant='contained' onClick={() => decrement()} disabled={page === 0}  sx={{backgroundColor:"#673ab7",marginLeft:"2rem",":hover":{backgroundColor:"#512da8"}}}>Previous</Button>
        </ResponsiveContainer>
         :<Typography>OOPS! No result found</Typography>}
      </> : <ResponsiveContainer width="100%" aspect={aspect}>
  <Skeleton variant="rectangular" width={210} height={60} />
  </ResponsiveContainer>
      }
          
      
        
      </div>
  )
}

export default RadarChartcode