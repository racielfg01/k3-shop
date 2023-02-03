import Link from "next/link";
import { Record } from "pocketbase";
import  { useContext, useEffect, useState, useReducer } from "react";
import { AdminLayout, Layout } from "../../components";
import {  TablaProductos } from "../../components/adminComponents";

import { ArticuloContext } from "../../contexts/ArticuloContext";
import usePocketBase from "../../hooks/usePocketBase";
// import Localbase from "localbase";




const Productos = () => {
//   const { articulos, alert, setAlert, dispatch } = useContext(ArticuloContext);
  const [buscar, setBuscar] = useState("");
  const [productos, setProductos] = useState<Record[]>([]);
  const { getFullList } = usePocketBase();
  const columnNames=["Nombre","Cantidad","Precio"];

  // let total = `Total - ${
  //   productos.length === 1
  //     ? `${productos.length} producto`
  //     : `${productos.length} productos`
  // }`;
  // const handleAlertClose = () => setAlert(0);

//   const buscarArticulos = () => {
//     const res = articulos.filter(
//       (articulo) => porNombre(articulo) || porEtiquetas(articulo)
//     );
//     setProductos(res);
//   };

//   const closeBuscar = () => {
//     setBuscar("");
//     setProductos(articulos);
//   };

//   const porNombre = (articulo) => {
//     return (
//       articulo.nombre.toLowerCase().includes(buscar) ||
//       articulo.nombre.includes(buscar)
//     );
//   };
//   const porEtiquetas = (articulo) => {
//     return (
//       articulo.etiquetas.toLowerCase().includes(buscar) ||
//       articulo.etiquetas.includes(buscar)
//     );
//   };

//   const handleChange = (event) => {
//     let { value } = event.target;
//     setBuscar(value);
//     buscarArticulos();
//   };

//   const deleteItem = (id) => {
//     const res = productos.filter((val) => val.id !== id);
//     // console.log(res);
//     setProductos(res);
//     setAlert(2);
//   };
  
  useEffect(() => {
    const getArticulos = async () => {
      // let db = new Localbase("db");
      try {
        // const articulos = await db.collection("articulos").get();
        const articulos =await getFullList("productos");
        // dispatch({ type: "SCYNC_ARTICULO", articulos });
        setProductos(articulos);
      } catch (error) {
        console.log("error:", error);
      }
    };
    getArticulos();
  }, []);

//   useEffect(() => {
//     if (buscar === "") {
//       closeBuscar();
//     }
//   }, [buscar]);

  return (
  
   <TablaProductos 
   nombre="Productos" 
   urlAdicionar="/productos/new"
   columnas={columnNames}
   data={productos}
   />




  )
}

export default Productos

