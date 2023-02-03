import React, { createContext, useContext, useReducer, useState } from "react";
import { ArticuloReducer } from "./reducers/ArticuloReducer";


export const ArticuloContext = createContext([]);

export const useArticulo =()=> useContext(ArticuloContext);


const ArticuloProvider = (props) => {
  const [alert, setAlert] = useState(0);
    const [articulos, dispatch] = useReducer(ArticuloReducer, []);
  
  return (
    <ArticuloContext.Provider value={{ articulos,alert, setAlert, dispatch }}>
      {props.children}
    </ArticuloContext.Provider>
  );
};

export default ArticuloProvider;
