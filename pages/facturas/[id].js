
import { useContext, useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { AdminLayout } from "../../components";




const Detalles = () => {
  const { push, query } = useRouter();
  const [factura, setFactura] = useState({});
  // let urlEdit=""

  // // if(query.id){
  // //   urlEdit=`/productos/edit/${query.id}`;
  // // }
  // // urlEdit='/productos';

  const {
    id,
    cliente,
    precioTotal,
    fechaCreacion,
    productos,
    impuestos,
    descuentos,
    flete,
    observaciones,
  } = factura;

//   useEffect(() => {
//     const getFacturas = async () => {
//       try {
//         let factura = await db
//           .collection("facturas")
//           .doc({ id: query.id })
//           .get();
//         factura = factura === undefined ? "":factura;
      
//         setFactura(factura);
//       } catch (error) {
//         console.log("error: ", error);
//       }
//     };
//     getFacturas();
//   }, []);

// const getFiles = () => {
//     images?.map(async (img, idx) => {
//       if(articulo!==''){
//         let url = await getFileUrl(articulo, img);
//         files[idx] = url;
//         setDummy(Math.random());
//       }
//     });
//   };

//   useEffect(() => {
//     getFiles();
//   }, [images]);

  return (
    <>
       <AdminLayout>
      <div className="flex ">
        {/* <div className=" bg-white shadow rounded-lg p-2 sm:p-6 xl:p-8 w-full   "> */}
        <div
          className={`blur-effect-theme duration-500 rounded-lg p-2 sm:p-6 xl:p-8 w-full
           max-w-xl absolute opacity-100 visible translate-x-0`}
        >
          <div className="mb-4 flex  justify-between">
            <div className="flex-shrink-0">
              <Link href={`/facturas`}>
                <button
                  className="button-theme bg-theme-cart text-white text-sm 
                    font-medium rounded-l"
                >
                  Atrás
                </button>
              </Link>
            </div>
            {/* <div className="flex-shrink-0">
                  <Link href={`/productos/edit/${query.id}`}></Link>
                  <button
                    className="bg-cyan-600 text-white text-sm 
              font-medium  hover:bg-cyan-400 rounded-lg p-2"
                  >
                    Editar
                  </button>
                </div> */}
          </div>
          <div className=" flex justify-around gap-6">
            <div className="flex  2xl:col-span-2 ">
              <div>
                <div className="flex items-center">
                  {/* <Image
                    className="h-60 w-full object-contain rounded-lg"
                    src={files[0]}
                    // width={500}
                    // height={500}
                    fill="contain"
                    priority
                    // blurDataURL={files[0]}
                    // placeholder="blur"
                    alt="producto"
                  /> */}
                </div>
                {/* <div className="flex gap-3 items-start rounded-lg my-4 overflow-x-auto">
                  {files?.map((item, i) => (
                    <img
                      key={i}
                      className="h-24 w-24 rounded-lg"
                      src={item}
                      alt="producto"
                    />
                  ))}
                </div> */}
              </div>
            </div>

            <div>
              <div className="flex flex-col ">
                <div className="overflow-x-auto rounded-lg">
                  <div className="align-middle inline-block min-w-full">

                    <div className="text-2xl text-gray-700 mb-6">Datos de la factura</div>
                    {/* <div className="text-2xl text-gray-700 mb-6">{nombre}</div> */}
                    {/* <div className="flex justify-between mb-4 mx-6">
                      <p className="text-black font-mono text-lg">
                      </p>
                      <div className="flex justify-start mb-2 my-1 ">
                        <StarIcon className="icon-style w-5 h-5 md:w-4 md:h-4 fill-amber-400" />
                        <p className="text-black">{valoracion}/5</p>
                      </div>
                    </div>
                    <p className="text-black flex justify-start text-sm mb-4">
                      Descripcion: {descripcion}
                    </p>

                    <div
                      className="inline-flex rounded-md shadow-sm mb-2"
                      role="group"
                    >
                      <button
                        className="bg-theme-cart text-white flex justify-center
                        text-2xl font-medium w-8 p-1 h-8"
                      >
                        -
                      </button>
                      <input type="text" className="w-10 h-8" placeholder="1" />
                      <button
                        className="bg-theme-cart text-white flex justify-center
                        text-xl font-medium w-8 p-1 h-8"
                      >
                        +
                      </button>
                    </div>

                    <div className="my-2 flex justify-center">
                      <button
                        className="bg-white border border-gray-700 text-gray-700 text-sm 
              font-medium  hover:bg-gray-200 rounded-lg p-2 mr-6"
                        onClick={() => onAddToCart()}
                      >
                        Añadir al carrito
                      </button>
                      <button
                        className="button-theme bg-theme-cart text-white text-sm 
                        font-medium rounded-lg p-2"
                        onClick={() => onCartToggle()}
                      >
                        Comprar Ahora
                      </button>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="grid divide-y divide-neutral-200 max-w-xl mx-auto mt-8">
            <div className="py-5">
              <details className="group">
                <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                  <span> Detalles</span>
                  <span className="transition group-open:rotate-180">
                    <svg
                      fill="none"
                      height="24"
                      shapeRendering="geometricPrecision"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      viewBox="0 0 24 24"
                      width="24"
                    >
                      <path d="M6 9l6 6 6-6"></path>
                    </svg>
                  </span>
                </summary>
                <p className="text-neutral-600 mt-3 group-open:animate-fadeIn">
                  {detalles}
                </p>
              </details>
            </div>
          </div> */}
        </div>
      </div>
    </AdminLayout>
    
    </>
  );
};

export default Detalles;

// {factura.cliente&&(
//     <Container direction="column" sx={{  height: "100vh" }}>
//     <Grid.Container gap={2} justify="center" css={{mt: "2rem",}}>
//         <Card  justify="center" css={{ p: "$6", mw: "500px" ,}}>
//           <Card.Header>
//             <Grid.Container css={{ pl: "$6" }}>
//               <Grid xs={12} justify="end">
//                 <Link href={`/facturas/edit/${query.id}`}>
//                   <a>
//                       <EditOutlined color="primary" />
//                   </a>
//                 </Link>
//                 <Grid css={{ml:"$10"}}>

//                 <Link href={`/facturas/print/${query.id}`}>
//                   <a>
//                       <LocalPrintshopOutlinedIcon color="primary" />
//                   </a>
//                 </Link>
//                 </Grid>
//               </Grid>
//               <Grid xs={12}>
//                 <Text h3 css={{ lineHeight: "$xs" }}>
//                   Cliente: {cliente.nombre} {cliente.apellidos}
//                 </Text>
//               </Grid>
              {/* <Grid xs={12}>
                :<Text css={{ color: "$accents8" }}>{cliente.telefono}</Text>
              </Grid> */}
            {/* </Grid.Container>
          </Card.Header>
          <Card.Body css={{ py: "$2" }}>
            <Text h5 b>Productos:</Text>
       
               <Grid.Container direction="column">
              {productos?.map(({ producto, cantidad }, i) => (
                
                <>
                <Grid >
                  <Card css={{ mw: "330px" }} variant="bordered">
                    <Card.Body
                      css={{ py: "$2" }}
                      justify="space-between"
                    ></Card.Body>
          
                    <Text b>{producto.nombre}</Text>
                    <Grid.Container justify="space-between" gap={0.25}>
                      <Grid xs={4}>
                        <Text>cantidad: ({cantidad})</Text>
                      </Grid>
                      <Grid xs={4}>
                        <Text>
                          precio: <Text b>${producto.precio_venta}</Text>
                        </Text>
                      </Grid>
                    </Grid.Container>
                  </Card>
                  </Grid>
                </>
              ))}
              </Grid.Container>
     
            <Card.Divider/>
            <Text>Descuentos : ${descuentos}</Text>{" "}
            <Text>Impuestos : ${impuestos}</Text>
            <Text>Flete : ${flete}</Text>
            <Text h4>Precio Total : <Text b>${precioTotal}</Text></Text>

            <Text>Observaciones: {observaciones}</Text>{" "}
          </Card.Body>
        
          <Card.Footer>
            <Link href="/facturas">
              <a>
                <Text color="primary">Atrás</Text>
              </a>
            </Link>
          </Card.Footer>
        </Card>
      </Grid.Container>
    </Container>
  )} */}