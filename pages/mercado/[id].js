import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { AdminLayout } from "../../components";

// import Localbase from "localbase";

// import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
// import AddLocationOutlinedIcon from "@mui/icons-material/AddLocationOutlined";
// import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
// import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import usePocketBase from "../../hooks/usePocketBase";
import { Record } from "pocketbase";
import { StarIcon } from "@heroicons/react/24/solid";
import { setAddItemToCart, setOpenCart } from "../../contexts/CartSlice";
import { useDispatch } from "react-redux";
// import ReactStars from "react-stars";

// let db = new Localbase("db");

const Detalles = () => {
  const { getFileUrl, getRecordID } = usePocketBase();
  const { push, query } = useRouter();
  const [articulo, setArticulo] = useState({});
  const [files, setFiles] = useState([]);
  const [dummy, setDummy] = useState(0);
  const [showDetails, setShowDetails] = useState(true);
  const [index, setIndex] = useState(0);
  const {
    id,
    nombre,
    descripcion,
    detalles,
    precio_venta,
    precio_compra,
    ganancia,
    unidad,
    images,
    cantidad,
    servicio,
    etiquetas,
    valoracion,
  } = articulo !== undefined ? articulo : "";

  const dispatch = useDispatch();
  const ifCartState = true;

  const onAddToCart = () => {
    let img = files[0];
    let precio = precio_venta;
    // const item = { id, title, text, img, color, shadow, price };
    const item = { id, img, nombre, precio, valoracion };
    dispatch(setAddItemToCart(item));
  };

  const onCartToggle = () => {
    // si el producto no esta agrgar 1
    dispatch(
      setOpenCart({
        cartState: true,
      })
    );
  };

  useEffect(() => {
    const getArticulo = async () => {
      try {
        let articulo = await getRecordID("productos", query.id);
        setArticulo(articulo);
      } catch (error) {
        console.log("error: ", error);
      }
    };
    getArticulo();
  }, []);

  const getFiles = () => {
    images?.map(async (img, idx) => {
      if(articulo!==''){
        let url = await getFileUrl(articulo, img);
        files[idx] = url;
        setDummy(Math.random());
      }
    });
  };

  useEffect(() => {
    getFiles();
  }, [images]);

  // className="px-4 h-8 py-2 text-sm font-medium text-gray-900 bg-white border
  // border-gray-200 rounded-r-md hover:bg-gray-100 hover:text-blue-700
  // focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700
  //  dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white
  //   dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"

  return (
    <AdminLayout>
      <div className="flex ">
        {/* <div className=" bg-white shadow rounded-lg p-2 sm:p-6 xl:p-8 w-full   "> */}
        <div
          className={`blur-effect-theme duration-500 rounded-lg p-2 sm:p-6 xl:p-8 w-full
           max-w-xl absolute opacity-100 visible translate-x-0`}
        >
          <div className="mb-4 flex  justify-between">
            <div className="flex-shrink-0">
              <Link href={`/mercado`}>
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
                  <Image
                    className="h-60 w-full object-contain rounded-lg"
                    src={files[0]}
                    // width={500}
                    // height={500}
                    fill="contain"
                    priority
                    // blurDataURL={files[0]}
                    // placeholder="blur"
                    alt="producto"
                  />
                </div>
                <div className="flex gap-3 items-start rounded-lg my-4 overflow-x-auto">
                  {files?.map((item, i) => (
                    <img
                      key={i}
                      className="h-24 w-24 rounded-lg"
                      src={item}
                      alt="producto"
                    />
                  ))}
                </div>
              </div>
            </div>

            <div>
              <div className="flex flex-col ">
                <div className="overflow-x-auto rounded-lg">
                  <div className="align-middle inline-block min-w-full">
                    <div className="text-2xl text-gray-700 mb-6">{nombre}</div>
                    <div className="flex justify-between mb-4 mx-6">
                      <p className="text-black font-mono text-lg">
                        ${precio_venta}
                      </p>
                      <div className="flex justify-start mb-2 my-1 ">
                        <StarIcon className="icon-style w-5 h-5 md:w-4 md:h-4 fill-amber-400" />
                        <p className="text-black">{valoracion}/5</p>
                      </div>
                    </div>
                    <p className="text-black flex justify-start text-sm mb-4">
                      Descripcion: {descripcion}
                    </p>

                    {/* Select Cantidad  */}
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
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="grid divide-y divide-neutral-200 max-w-xl mx-auto mt-8">
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
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Detalles;
{
  /*<div className="flex  bg-gray-200 min-h-screen">
<div className="grid grid-cols-12">

  <div className="col-span-12 flex justify-between">
    <Link href={`/productos/`}>
      <button color="primary" ghost rounded css={{ mr: "$10" }}>
        Atrás
      </button>
    </Link>
    <Link href={`/productos/edit/${query.id}`}>
      <button color="primary" rounded>
        Editar producto
      </button>
    </Link>
  </div>

  <div className="col-span- bg-green-300 ">
    <img
      src={(files[0] && files[index]) || "/noimagen.jpeg"}
      width={"100%"}
      height={340}
      objectFit="cover"
      alt="div image background"
    />
  <div className="wrap">
    {files.map((img, i) => (
      <>
        <div key={i}>
          <div css={{ w: "100%" }}>
            <img
              src={img}
              alt={nombre}
              width={100}
              height={100}
              onMouseEnter={() => setIndex(i)}
              objectFit="cover"
              onClick={() => setIndex(i)}
            />
          </div>
        </div>
      </>
    ))}
  </div>
  </div>

<div className="col-span-3 bg-blue-200">
  <div>
    <div
      h2
      size={30}
      css={{
        divGradient: "45deg, $blue600 -20%, $pink600 50%",
      }}
      weight="bold"
    >
      {nombre}
    </div>
    <div y={0.3} />
    <div wrap="wrap">
     <ReactStars
          count={5}
          // onChange={ratingChanged}
          size={24}
          color2={"#ffd700"}
          value={valoracion}
        />{" "} 
      { <div css={{ ml: "$3" }} h4>
        {valoracion}%
      </div>
    </div>
    <div>
      <div justify="space-between">
        <div>
          {showDetails ? (
            <div>
              <div gap={1}>
                <div>
                  <div h3>Precio venta: ${precio_venta} </div>
                </div>
                <div>
                  <div h3>Precio compra: ${precio_compra} </div>
                </div>
                <div>
                  <div h3>Ganancia: </div>{" "}
                  <div h3 color="success">
                    ${precio_venta - precio_compra}{" "}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div gap={2}>
                <div>
                  <div h2> ${precio_venta} </div>
                </div>
                <div>
                  <div
                    del
                    css={{
                      color: "$accents7",
                      fontWeight: "$semibold",
                      fontSize: "$3xl",
                    }}
                  >
                    $350
                  </div>
                </div>
                <div>
                  <div
                    color="success"
                    css={{
                      fontWeight: "$semibold",
                      fontSize: "$3xl",
                    }}
                  >
                    20% off
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>

    <div h5>{descripcion} </div> */
}
{
  /* Tabla de ejemplo */
}

{
  /*    */
}
{
  /* <div>
      <div>
        {cantidad == 0 ? (
          <div h4 color="error">
            Producto no disponible{" "}
          </div>
        ) : (
          <div h4 color="success">
            Producto disponible{" "}
          </div>
        )}
      </div>
      <div>
        <div>
          <div h5 css={{ mr: "$4" }}>
            Ubicación:{" "}
          </div>
          <div color={"secondary"} size="xs"> */
}
{
  /* <AddLocationOutlinedIcon /> */
}
{
  /* <div css={{ color: "white" }}>Santiago de Cuba</div>
          </div>
        </div>
      </div>
      <div y={0.3} />
      <div>
        {showDetails ? (
          <div>
            <div h5 css={{ mt: "$5" }}>
              Cantidad:{" "}
            </div>
            <div h5 css={{ mt: "$3", ml: "$5" }}>
              {cantidad}
            </div>
          </div>
        ) : (
          <div>
            <div h5 css={{ mt: "$5" }}>
              Cantidad:{" "}
            </div>
            <div size="xs">
              <button>-</button>
              {/* <Input size="xs" value={1} width="15%" onChange={handleOnChange} /> 
              <button>+</button>
            </div>
          </div>
        )}
      </div>

      {showDetails ? (
        ""
      ) : (
        <div css={{ mt: "$10" }}>
          <div gap={1} justify={"flex-start"}>
            <div>
              <button
                color="primary"
                rounded
                onClick={() =>
                  onAdd({ producto: articulo, cantidad: qty })
                }
                disabled={cantidad > 0 ? false : true}
              >
                Añadir al carrito
              </button>
            </div>{" "}
            <div>
              <button
                color="primary"
                ghost
                rounded
                onClick={() => push("/facturas/new")}
                disabled={cantidad > 0 ? false : true}
              >
                Comprar ahora
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  </div>
</div>
</div> */
}
{
  /* Detalles del Producto  */
}
{
  /* <div xs={12}>
  <div>
    <Collapse.Group>
    <Collapse title="Detalles del producto" expanded>
      <div>{detalles}</div>
    </Collapse>
  </Collapse.Group>
  </div>
</div>
</div> */
}
