
import { Route, Routes } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { Context } from './context/ContextApi';
import Layout from './components/Layout';
import Home from './components/Home';
import BarChartcode from './components/BarChartcode';
import PieChartCode from './components/PieChartCode';
import RadarChartcode from "./components/RadarChartCode"
import StackBarChartCode from './components/StackBarChartCode';
function App() {
  const {setApidata,setFilterPagedata, setIsError}=useContext(Context);

  const URL="https://blackcopper-task.vercel.app/api/data";
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
      setFilterPagedata(data);
      setIsError(false);
      
    } catch (error) {
      
      setIsError(true);
      console.error('Error fetching data:', error);
    }
  }
  useEffect(() => {
    fetchData()
  }, [])
  
  return (
    <>
    <Layout>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/bar-likelihood' element={<BarChartcode props="likelihood"/>}/>
      <Route path='/bar-intensity' element={<BarChartcode props="intensity"/>}/>
      <Route path='/pie-country' element={<PieChartCode></PieChartCode>}/>
      <Route path='/radar-relevance' element={<RadarChartcode props="relevance"/>}/>
      <Route path='/stack-bar-topics' element={<StackBarChartCode></StackBarChartCode>}/>
      <Route path='*' element={<div>error</div>}></Route>
    </Routes>
    </Layout>
   
    </>
  );
}

export default App;
