import React, { useContext,useState,useEffect } from 'react';
import { Context } from '../context/ContextApi';
import { Typography,Skeleton,Button } from '@mui/material';
import { PieChart, Pie, Tooltip, ResponsiveContainer } from 'recharts';

function PieChartCode() {
    const { apidata,isError,isCall,setIsCall } = useContext(Context);
    const [chunk, setChunk] = useState(50);
  const [aspect, setAspect] = useState(2);
  const [page, setPage] = useState(0)
  useEffect(()=>{
    if(isCall) setPage(0);
    setIsCall(false)
  },[isCall])
  useEffect(() => {
    function handleResize() {
      const width = window.innerWidth;
      if (width < 768) {
        setChunk(10);
        setAspect(1);
      } else if (width >= 768 && width < 1024) {
        setChunk(20);
        setAspect(1);
      } else {
        setChunk(20);
        setAspect(2);
      }
    }

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [])

    
    const field="country"
    const extractedData = apidata.map((obj) => ({
        key: obj._id,
        [field]:obj[`${field}`]
      }));

      function countOccurrences(arr, key) {
        const filteredArray = arr.filter(obj => obj[key]);
       
        return filteredArray.reduce((acc, obj) => {
          const value = obj[key];
          acc[value] = (acc[value] || 0) + 1;
          return acc;
        }, {});
      }

      const countedArray = countOccurrences(extractedData, field);
      const resultArray = Object.entries(countedArray).map(([key, value]) => ({ name: key, count: value }));
      console.log("pie",resultArray);

      const slicedData = resultArray.slice(chunk * page, chunk * (page + 1));

      const increment = () => {
        if (!(page > resultArray.length / chunk - 1)) {
          setPage(page + 1);
        }
      };
    
      const decrement = () => {
        if (page > 0) {
          setPage(page - 1);
        }
      };


  return (
    
    <div className='main-box'>
        <Typography variant='h2' sx={{ fontWeight: "600", marginBottom: "2rem",textTransform:"capitalize" }}>Country</Typography>
        {!isError?
      <>
      {apidata.length!==0?<ResponsiveContainer width="100%" aspect={aspect}><PieChart width={500} height={500}>
          <Pie
            dataKey="count"
            isAnimationActive={true}
            data={slicedData}
            cx="50%"
            cy="50%"
            outerRadius={90}
            fill="#673ab7"
            label
          />
          <Tooltip />
          
        </PieChart>
        <Button variant='contained'  sx={{backgroundColor:"#673ab7",":hover":{backgroundColor:"#512da8"}}} onClick={() => increment()} disabled={page >= resultArray.length / chunk - 1}>Next</Button>
  <Button variant='contained' onClick={() => decrement()} disabled={page === 0}  sx={{backgroundColor:"#673ab7",marginLeft:"2rem",":hover":{backgroundColor:"#512da8"}}}>Previous</Button>
        </ResponsiveContainer>:<Typography>OOPS! No result found</Typography>}
        
      
      </>  :<ResponsiveContainer width="100%" aspect={aspect}>
  <Skeleton variant="rectangular" width={210} height={60} />
  </ResponsiveContainer>
      }
          
      </div>
  )
}

export default PieChartCode