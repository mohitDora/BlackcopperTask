import React, { createContext, useState} from 'react'

export const Context = createContext()

function ContextApi({children}) {

  const [apidata,setApidata]=useState([]);
  const [filterPagedata,setFilterPagedata]=useState([]);
  const [display,displayData]=useState("All");
  const [open, setOpen]=useState(false);
  const [isError, setIsError]=useState(false);
  const [isCall,setIsCall] = useState(false)
  return (
    <Context.Provider value={{apidata,setApidata,display,displayData,open, setOpen,filterPagedata,setFilterPagedata,setIsError,isError,isCall,setIsCall }}>
      {children}
    </Context.Provider>
  )
}

export default ContextApi