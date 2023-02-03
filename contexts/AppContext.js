import React,{createContext,useState} from 'react'

export const Context =createContext();

const AppContextProvider =({children})=> {
//  const [isLightTheme, setIsLightTheme] = useState(true);
//  const [light, setLight] = useState({syntax:'#555',ui:"#ddd",bg:"#eee"})
//  const [dark, setDark] = useState({syntax:'#ddd',ui:"#333",bg:"#555"})

const state={
    isLightTheme:true,
    light:{syntax:'#555',ui:"#ddd",bg:"#eee"},
    dark:{syntax:'#ddd',ui:"#333",bg:"#555"},
    clientes:[],
    productos:[],
    facturas:[]
}

 

  return (
    <Context.Provider value={state}>    
            {children}
    </Context.Provider>
  )
}

export default AppContextProvider;