import React, { useContext, useState, useEffect } from 'react';
import { Context } from '../context/ContextApi';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Button, Typography, Skeleton } from '@mui/material';

function BarChartcode({ props }) {

  const { apidata,isError,isCall,setIsCall } = useContext(Context);
  const [page, setPage] = useState(0)
  const uniqueInsights = {};
  const [chunk, setChunk] = useState(50);
  const [aspect, setAspect] = useState(2);

useEffect(()=>{
  if(isCall) setPage(0);
  setIsCall(false)
},[isCall])


  useEffect(() => {
    function handleResize() {
      const width = window.innerWidth;
      if (width < 768) {
        setChunk(20);
        setAspect(1);
      } else if (width >= 768 && width < 1024) {
        setChunk(30);
        setAspect(2);
      } else {
        setChunk(20);
        setAspect(2);
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
  console.log(apidata.length)
  return (

    <div className="main-box">
      <Typography variant='h2' sx={{ fontWeight: "600", marginBottom: "2rem", textTransform: "capitalize" }}>{props}</Typography>
      {!isError?
      <>
      {uniqueData.length !== 0 ?

<>
<ResponsiveContainer width="100%" aspect={aspect}><BarChart
  width={500}
  height={300}
  data={slicedData}
  // margin={{
  //   top: 5,
  //   right: 30,
  //   left: 20,
  //   bottom: 5,
  // }}
  barSize={20}
>
  <XAxis dataKey="insight" scale="point" padding={{ left: 10, right: 10 }} />
  <YAxis />
  <Tooltip />
  <Legend />

  <Bar dataKey={props} fill="#673ab7" background={{ fill: '#eee' }} />
</BarChart>
  <Button variant='contained' sx={{backgroundColor:"#673ab7",":hover":{backgroundColor:"#512da8"}}} onClick={() => increment()} disabled={page >= uniqueData.length / chunk - 1}>Next</Button>
  <Button variant='contained' sx={{backgroundColor:"#673ab7",marginLeft: "2rem",":hover":{backgroundColor:"#512da8"}}} onClick={() => decrement()} disabled={page === 0} >Previous</Button></ResponsiveContainer></> 
  : 
  
  <Typography>OOPS! No result found</Typography>
  
  }</>:
  <ResponsiveContainer width="100%" aspect={aspect}>
  <Skeleton variant="rectangular" width={210} height={60} />
  </ResponsiveContainer>

}
        


     


    </div>
  )
}

export default BarChartcode