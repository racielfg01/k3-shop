// import { v1 } from "uuid";

export const ArticuloReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ARTICULO":
      return [
        ...state,
        {
          id: action.articulo.id,
          nombre: action.articulo.nombre,
          descripcion: action.articulo.descripcion,
          etiquetas: action.articulo.etiquetas,
          precio_compra: action.articulo.precio_compra,
          precio_venta: action.articulo.precio_venta,
          ganancia: action.articulo.ganacia,
          unidad: action.articulo.unidad,
          servicio: action.articulo.servicio,
          cantidad: action.articulo.cantidad,
          imagen: action.articulo.imagen,
        },
      ];
    case "REMOVE_ARTICULO":
      return state.filter((art) => art.id != action.articulo.id);
    case "UPDATE_ARTICULO":
      let articulo= action.articulo;
      if(articulo!==undefined){
        return state.map((art) =>art.id == articulo.id
        ?articulo:art); 
      }
      return state;
    
    case "SCYNC_ARTICULO":
      return action.articulos;
      
    default:
      return state;
  }
};
