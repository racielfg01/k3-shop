

export const FacturaReducer = (state, action) => {
  switch (action.type) {
    case "ADD_FACTURA":
      return [
        ...state,
        {
          id: action.factura.id,
          cliente: action.factura.cliente,
          productos: action.factura.productos,
          descuentos: action.factura.descuentos,
          impuestos: action.factura.impuestso,
          flete: action.factura.flete,
          total: action.factura.precioTotal,
          observaciones: action.factura.observaciones,

          fechaCreacion:action.factura.fechaCreacion,
          fechaActualizacion:action.factura.fechaActualizacion,
        },
      ];
    case "REMOVE_FACTURA":
      return state.filter((fact) => fact.id != action.id);
    case "UPDATE_FACTURA":
      return state.map((fact) => {
        if (fact.uuid === action.factura.id) {
          return [...fact, action.factura];
        }
        return state;
      });
      case "SCYNC_FACTURA":
        return action.factura;
    default:
      return state;
  }
};
