import React, { createContext, useState} from 'react'

export const Context = createContext()

function ContextApi({children}) {

  const [apidata,setApidata]=useState([]);
  return (
    <Context.Provider value={{apidata,setApidata }}>
      {children}
    </Context.Provider>
  )
}

export default ContextApi