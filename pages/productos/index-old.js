import React, { useContext, useEffect, useState, useReducer } from "react";
import { ArticuloContext } from "../../contexts/ArticuloContext";

import Localbase from "localbase";
import Buscar from "../../components/Buscar";
import Body from "../../components/Body";
import usePocketBase from "../../hooks/usePocketBase";



const Productos = () => {
  const { articulos, alert, setAlert, dispatch } = useContext(ArticuloContext);
  const [buscar, setBuscar] = useState("");
  const [productos, setProductos] = useState([]);
  const { getProductos } = usePocketBase();

  // let total = `Total - ${
  //   productos.length === 1
  //     ? `${productos.length} producto`
  //     : `${productos.length} productos`
  // }`;
  // const handleAlertClose = () => setAlert(0);

  const buscarArticulos = () => {
    const res = articulos.filter(
      (articulo) => porNombre(articulo) || porEtiquetas(articulo)
    );
    setProductos(res);
  };

  const closeBuscar = () => {
    setBuscar("");
    setProductos(articulos);
  };

  const porNombre = (articulo) => {
    return (
      articulo.nombre.toLowerCase().includes(buscar) ||
      articulo.nombre.includes(buscar)
    );
  };
  const porEtiquetas = (articulo) => {
    return (
      articulo.etiquetas.toLowerCase().includes(buscar) ||
      articulo.etiquetas.includes(buscar)
    );
  };

  const handleChange = (event) => {
    let { value } = event.target;
    setBuscar(value);
    buscarArticulos();
  };

  const deleteItem = (id) => {
    const res = productos.filter((val) => val.id !== id);
    // console.log(res);
    setProductos(res);
    setAlert(2);
  };
  
  useEffect(() => {
    const getArticulos = async () => {
      // let db = new Localbase("db");
      try {
        // const articulos = await db.collection("articulos").get();
        const articulos =(await getProductos()).items;
        dispatch({ type: "SCYNC_ARTICULO", articulos });
        setProductos(articulos);
      } catch (error) {
        console.log("error:", error);
      }
    };
    getArticulos();
  }, []);

  useEffect(() => {
    if (buscar === "") {
      closeBuscar();
    }
  }, [buscar]);

  return (
    <>
      <Buscar
        flag={"productos"}
        payload={productos.length}
        handleChange={handleChange}
        alerta={alert}
      />
      <Body 
      flag={"productos"} 
      payload={productos} 
      deleteItem={deleteItem}
       />
    </>
  );
};

export default Productos;
