export const ClienteReducer = (state, action) => {
  switch (action.type) {
    case "ADD_CLIENTE":
      return [
        ...state,
        {
          id: action.cliente.id,
          nombre: action.cliente.nombre,
          apellidos: action.cliente.apellidos,
          telefono: action.cliente.telefono,
          direccion: action.cliente.direccion,
          email: action.cliente.email,
          infoAdicional: action.cliente.infoAdicional,
          notasInternas: action.cliente.notasInternas,
          proveedor: action.cliente.proveedor,
          imagen:action.cliente.imagen,
        },
      ];
      case "REMOVE_CLIENTE":
        return state.filter((cli) => cli.id != action.cliente.id);
      case "UPDATE_CLIENTE":
        let cliente= action.cliente;
        if(cliente!==undefined){
          return state.map((cli) =>cli.id == cliente.id
          ?cliente:cli); 
        }
        return state;
      
      case "SCYNC_CLIENTE":
        return action.clientes;
    default:
      return state;
  }
};
