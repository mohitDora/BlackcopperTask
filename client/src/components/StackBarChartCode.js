import React, { useContext, useState,useEffect } from 'react';
import { Context } from '../context/ContextApi';
import { Button,Typography,Skeleton } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function StackBarChartCode() {
    const { apidata,isError,isCall,setIsCall } = useContext(Context);
    const [page, setPage] = useState(0);
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
            setChunk(10);
            setAspect(1);
          } else if (width >= 768 && width < 1024) {
            setChunk(15);
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
        topic: obj.topic,
        insight: obj.insight
    }));

    function mergeObjectsByinsight(arr) {
        const mergedObjects = {};

        arr.forEach(obj => {
            const insight = obj.insight;
            const topic = obj.topic;

            if (!mergedObjects[insight]) {
                mergedObjects[insight] = {};
            }

            if (!mergedObjects[insight][topic]) {
                mergedObjects[insight][topic] = 1;
            } else {
                mergedObjects[insight][topic]++;
            }
        });
        const result = [];
        for (const insight in mergedObjects) {
            const topics = mergedObjects[insight];
            const topicCounts = Object.entries(topics).map(([topic, count]) => ({ [topic]: count }));
            const mergedtopics = Object.assign({}, ...topicCounts);
            result.push({ insight, ...mergedtopics });
        }

        return result;
    }
    const mergedArray = mergeObjectsByinsight(extractedData);
    console.log(mergedArray);

    function getUniqueValuesByKey(arr, key) {
        const uniqueValues = new Set();
        arr.forEach(obj => {
            uniqueValues.add(obj[key]);
        });
        return Array.from(uniqueValues);
    }

    let isPurple = true;
    let currentHue = 270;

    function generateNextColor() {
        const hue = isPurple ? currentHue : (currentHue + 180) % 360;
        const saturation = '100%';
        const lightness = '50%';
        const color = `hsl(${hue}, ${saturation}, ${lightness})`;
        isPurple = !isPurple;
        currentHue = (currentHue + 0.09) % 360;
        return color;
    }

    const uniqueNames = getUniqueValuesByKey(extractedData, 'topic');
    const ret = uniqueNames?.map((item, index) => {
        const shade = generateNextColor();
        return (

            <Bar key={index} dataKey={item} stackId="" fill={shade} />
        )
    })

    const slicedData = mergedArray.slice(chunk * page, chunk * (page + 1));

    const increment = () => {
      if (!(page > mergedArray.length / chunk - 1)) {
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
                <Typography variant='h2' sx={{ fontWeight: "600", marginBottom: "2rem",textTransform:"capitalize" }}>Topics</Typography>
                {!isError?
            <>
            {slicedData.length!==0?
                    <ResponsiveContainer width="100%" aspect={aspect}>
                    <BarChart
                        width={500}
                        height={300}
                        data={slicedData}
                       
                        margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                        barSize={20}
                    >

                        <XAxis dataKey="insight" />
                        <YAxis domain={[0, 5]}/>
                        <Tooltip />
                        
                        {ret}
                    </BarChart>
                    <Button variant='contained'  sx={{backgroundColor:"#673ab7",":hover":{backgroundColor:"#512da8"}}} onClick={() => increment()} disabled={page >= mergedArray.length / chunk - 1}>Next</Button>
        <Button variant='contained' onClick={() => decrement()} disabled={page === 0}  sx={{backgroundColor:"#673ab7",marginLeft:"2rem",":hover":{backgroundColor:"#512da8"}}}>Previous</Button>
        </ResponsiveContainer>:<Typography>OOPS! No result found</Typography>
                }
            </>  :<ResponsiveContainer width="100%" aspect={aspect}>
  <Skeleton variant="rectangular" width={210} height={60} />
  </ResponsiveContainer>
            }
                    
                    

                
            </div>
    )
}

export default StackBarChartCode