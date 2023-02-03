import { useDispatch } from "react-redux";

import { StarIcon, ShoppingBagIcon } from "@heroicons/react/24/solid";
import { setAddItemToCart, setOpenCart } from "../../contexts/CartSlice";
import Image from "next/image";
import Link from "next/link";
import usePocketBase from "../../hooks/usePocketBase";
import { useEffect, useState } from "react";



const Item = (
producto

  // ifExists,
  // color,
  // shadow,
  // title,
  // text,
  // btn,
  // rating,
  // price,
) => {

  const {images,
    id,
    nombre,
    precio_venta,
    valoracion} =producto !== undefined ? producto : "";
  const { getFileUrl, } = usePocketBase();

  // const [articulo, setArticulo] = useState({});
  const [files, setFiles] = useState([]);
  const [dummy, setDummy] = useState(0);

  const dispatch = useDispatch();

  const onAddToCart = () => {
    let img=files[0]
    let precio=precio_venta
    // const item = { id, title, text, img, color, shadow, price };
    const item = { id,img,nombre,precio, valoracion };
    dispatch(setAddItemToCart(item));
  };

  const onCartToggle = () => {
    dispatch(
      setOpenCart({
        cartState: true,
      })
    );
  };

  const getFiles = () => {
    images?.map(async (img, idx) => {
      let url = await getFileUrl(producto, img);
      files[idx] = url;
      setDummy(Math.random());
    });
  };
  
  useEffect(() => {
    getFiles();
  }, [images]);

    //  ${ifExists ? "justify-items-start" : "justify-items-center"}
    // ${ifExists ? "absolute top-5 right-1" : "justify-center"}
    // ${ifExists
    //   ? "h-auto w-64 lg:w-56 md:w-48 -rotate-[35deg]"
    //   : "h-36 w-64"}
    // hover:-rotate-12
    // -rotate-[35deg]
      
  return (
    <>
    {}
      <div
        className={`relative border grid items-center rounded-lg transition-all
         duration-700 ease-in-out w-full hover:scale-105 shadow-lg
        `}
      >
        <Link href={`/mercado/${id}`}>
          <div
            className={`flex bg-white rounded-t items-center `}
          >
            <img
              src={files[0]}
              alt={`producy-img-${id}`}
              // width={500}
              // height={500}
              className={`transitions-theme rounded-t h-36 w-64 lg:w-56 md:w-48
                  `}
            />
          </div>
        </Link>
        <div  className={"grid"} >
          <h1 className="text-slate-800 text-md lg:text-md- md:text-base font-medium filter drop-shadow flex justify-center">
            {nombre}
          </h1>
          <div className="flex justify-start mb-2 my-1">
            <StarIcon className="icon-style w-5 h-5 md:w-4 md:h-4 fill-amber-400" />
            <StarIcon className="icon-style w-5 h-5 md:w-4 md:h-4 fill-amber-400" />
            <StarIcon className="icon-style w-5 h-5 md:w-4 md:h-4 fill-amber-400" />
            <StarIcon className="icon-style w-5 h-5 md:w-4 md:h-4 fill-amber-400" />
            <StarIcon className="icon-style w-5 h-5 md:w-4 md:h-4 fill-amber-400" />
            <h1 className="md:text-sm text-sm text-slate-800 ml-4">{valoracion}/5</h1>
          </div>

          <div className="flex justify-between mx-3 ">
            <h1 className="text-gray-800 text-lg font-bold">${precio_venta}</h1>

            <button
              type="button"
              className="bg-white/90 blur-effect-theme button-theme p-0.5 shadow shadow-sky-200"
              onClick={() => onAddToCart()}
            >
              <ShoppingBagIcon className="icon-style text-slate-900" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Item;
