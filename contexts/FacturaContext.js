import React, { createContext, useContext, useReducer, useState } from "react";
import { FacturaReducer } from "./reducers/FacturaReducer";

const initialData=[
 {
   id: 1,
   cliente: {
     id: 1,
     nombre: "Raciel",
     apellidos: "Ferr",
     telefono: "52013998",
     direccion: "Punta gorda",
     email: "racielfg01@gmail.com",
     infoAdicional: "gran persona",
     notasInternas: "No se le muestra al Cliente",
     proveedor: false,
   },
   articulos: [
     {
       id: 1,
       nombre: "producto 1",
       descripcion: "Producto 1",
       precio: 0,
       unidad: "u",
       servicio: false,
     },
     {
       id: 2,
       nombre: "producto 2",
       descripcion: "Producto 2",
       precio: 0,
       unidad: "u",
       servicio: false,
     },
   ],
   descuento: 0,
   impuesto: 0,
   flete: 0,
   Total: 0,
   observaciones: "",
   estado: {},
   fechaCreacion: "",
   fechaActulizacion: "",
 },
]
export const FacturaContext = createContext([]);

export const useFactura =()=> useContext(FacturaContext);

const FacturaProvider = ({children}) => {
  const [alert, setAlert] = useState(0);
  const [facturasC, dispatch] = useReducer(FacturaReducer, []);

  return (
    <FacturaContext.Provider value={{ facturasC,alert, setAlert,dispatch }}>
      {children}
    </FacturaContext.Provider>
  );
};

export default FacturaProvider;
