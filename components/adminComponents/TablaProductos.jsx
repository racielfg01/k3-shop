import Link from "next/link";

const TablaProductos = ({
  nombre,
  urlAdicionar,
  columnas,
  data,
}) => {

  return (
    <div
      className="bg-white md:flex md:items-center
       md:justify-between shadow rounded-lg  md:p-6 xl:p-8 
      "
    >

      <div className=" p-6 xl:p-3 ">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-1">
              {nombre}
            </h3>
            <span className="text-sm font-normal text-gray-500">
              Esta es su lista de {nombre.toLowerCase()}
            </span>
          </div>
          <div className="flex sm:justify-center space-x-6">
            <Link href={urlAdicionar}>
              <button
                className="bg-cyan-600 text-white text-sm 
              font-medium  hover:bg-cyan-400 rounded-lg p-2"
              >
                Adicionar
              </button>
            </Link>
            {/* <div className="flex-shrink-0">
              <a
                href="#"
                className="text-sm font-medium text-cyan-600 hover:bg-gray-100 rounded-lg p-2"
              >
                View all
              </a>
            </div> */}
          </div>
        </div>
      
        <div className="flex flex-col mt-8">
          <div className="overflow-x-auto rounded-lg">
            <div className="align-middle inline-block min-w-full">
              <div className="shadow overflow-hidden sm:rounded-lg">
            

                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-100">
                    <tr>
                      {columnas.map((item, i) => (
                        <th
                          key={i}
                          scope="col"
                          className="p-4 text-left text-xs font-medium
                           text-gray-500 uppercase tracking-wider"
                        >
                          {item}
                        </th>
                      ))}
    
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {nombre=="productos"?
                      data?.map(({ id, nombre, cantidad, precio_venta }, i) => (
                      
                        <tr key={i}>
                          <td
                            className="p-4 whitespace-nowrap text-sm 
                            font-normal text-gray-900"
                          >
                            <Link href={`/productos/${id}`}>
                              {nombre}
                              {/* <span className="font-semibold">
                              Bonnie Green
                            </span> */}
                            </Link>
                          </td>
                          <td
                            className="p-4 whitespace-nowrap 
                            text-sm font-normal text-gray-500"
                          >
                            {cantidad}
                          </td>
                          <td
                            className="p-4 whitespace-nowrap text-sm
                             font-semibold text-gray-900"
                          >
                            ${precio_venta}
                          </td>
                        </tr>
                      ))
                    :
                    data?.map(({ id, numero, cliente,proveedor, precioTotal }, i) => (
                      
                      <tr key={i}>
                        <td
                          className="p-4 whitespace-nowrap text-sm 
                          font-normal text-gray-900"
                        >
                          <Link href={`/facturas/${id}`}>
                            {numero}
                            {/* <span className="font-semibold">
                            Bonnie Green
                          </span> */}
                          </Link>
                        </td>
                        <td
                          className="p-4 whitespace-nowrap 
                          text-sm font-normal text-gray-500"
                        >
                          {cliente}
                        </td>  <td
                          className="p-4 whitespace-nowrap 
                          text-sm font-normal text-gray-500"
                        >
                          {proveedor}
                        </td>
                        <td
                          className="p-4 whitespace-nowrap text-sm
                           font-semibold text-gray-900"
                        >
                          ${precioTotal}
                        </td>
                      </tr>
                    ))
                    }
                   
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TablaProductos;
