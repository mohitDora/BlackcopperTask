import Navbar from './components/Navbar';
import { Route, Routes } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { Context } from './context/ContextApi';
function App() {
  const {apidata}=useContext(Context);
  console.log(apidata)

  const URL="/data";
  const fetchData=async()=>{
    try {
      const response = await fetch(URL);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      console.log('Data from server:', data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  useEffect(() => {
    fetchData()
  }, [])
  
  return (
    <>
    <Routes>
      <Route path='/' element={<Navbar></Navbar>}/>
      <Route path='*' element={<div>error</div>}></Route>
    </Routes>
    
   
    </>
  );
}

export default App;
