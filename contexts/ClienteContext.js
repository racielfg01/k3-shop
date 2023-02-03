import { initScriptLoader } from "next/script";
import React, { createContext, useContext, useReducer, useState } from "react";
import { ClienteReducer } from "./reducers/ClienteReducer";


const initialProps = [
  {
    nombre: "Raciel",
    apellidos: "Ferr",
    telefono: "52013998",
    direccion: "Punta gorda",
    email: "racielfg01@gmail.com",
    infoAdicional: "gran persona",
    notasInternas: "No se le muestra al Cliente",
    proveedor: false,
    imagen:'',
  },  {
    nombre: "Raciel 1",
    apellidos: "Ferr",
    telefono: "52013998",
    direccion: "Punta gorda",
    email: "racielfg01@gmail.com",
    infoAdicional: "gran persona",
    notasInternas: "No se le muestra al Cliente",
    proveedor: false,
    imagen:'',
  },  {
    nombre: "Raciel 2",
    apellidos: "Ferr",
    telefono: "52013998",
    direccion: "Punta gorda",
    email: "racielfg01@gmail.com",
    infoAdicional: "gran persona",
    notasInternas: "No se le muestra al Cliente",
    proveedor: false,
    imagen:'',
  },
];

export const ClienteContext = createContext([]);

export const useCliente =()=> useContext(ClienteContext);


const ClienteProvider = (props) => {
  const [alert, setAlert] = useState(0);
    const [clientesC, dispatch] = useReducer(ClienteReducer, []);
  
  return (
    <ClienteContext.Provider value={{ clientesC,alert, setAlert, dispatch }}>
      {props.children}
    </ClienteContext.Provider>
  );
};

export default ClienteProvider;
