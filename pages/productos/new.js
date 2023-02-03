// import { blue, red } from "@mui/material/colors";
// import moment from "moment";
// import { v1 } from "uuid";
// import Localbase from "localbase";
// import {
//   Input,
//   Row,
//   Text,
//   Textarea,
//   Grid,
//   Button,
//   Card,
//   Checkbox,
//   Dropdown,
// } from "@nextui-org/react";
// import { Select } from "chakra-react-select";
// import theme from "../../lib/theme";

import { useArticulo } from "../../contexts/ArticuloContext";
import { useEffect, useState, Fragment, useMemo } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import usePocketBase from "../../hooks/usePocketBase";
import UploadFiles from "../../components/UploadFiles";
// let db = new Localbase("db");

const ProductForm = () => {
  const { getFullList, createRecord } = usePocketBase();
  const { push, query } = useRouter();
  // const cBlue = blue[500];

  const { setAlert, dispatch } = useArticulo();
  const [success, setSuccess] = useState(false);
  const [categorias, setCategorias] = useState([]);
  const [producto, setProducto] = useState({
    nombre: "",
    descripcion: "",
    precio_compra: 0,
    precio_venta: 0,
    unidad: "",
    images: "",
    cantidad: 0,
    detalles: "",
    etiquetas: "",
    fecha_de_caducidad: "",
    categoria: "",
  });

  const validationSchema = Yup.object().shape({
    nombre: Yup.string()
      .required("Nombre es requerido")
      .min(4, "El nombre debe tener al menos 6 caracteres ")
      .max(50, "El nombre no debe exceder los 50 caracteres"),
    precio_compra: Yup.number()
      .typeError("Debe especificar un número")
      .required("Precio de compra es requerido")
      .min(0, "Debe ser mayor que cero")
      .positive("Debe ser mayor que cero"),
    precio_venta: Yup.number()
      .typeError("Debe especificar un número")
      .required("Precio de venta es requerido")
      // .min(0, "Debe ser mayor que cero")
      .test(
        "max",
        "Debe ser mayor que precio de compra",
        (value, context) => value > context.parent.precio_compra
      )
      .positive("Debe ser mayor que cero"),

    cantidad: Yup.number()
      .default(0)
      .typeError("Debe ser un número")
      .integer("Debe ser un número entero"),
  });

  const {
    register,
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: useMemo(() => producto, [producto]),
  });

  //=========upload file to pocketbase===========

  // const uploadToPockerbase = async (event) => {
  //   const body = new FormData();
  //   body.append("file", image);
  //   // listen to file input changes and add the selected files to the form data
  // fileInput.addEventListener('change', function () {
  //   for (let file of fileInput.files) {
  //       body.append('documents', file);
  //   }
  // });
  // return body;
  // };

  // const fileInput = document.getElementById('imagenes');

  // listen to file input changes and add the selected files to the form data
  // fileInput.addEventListener('change', function () {
  //     for (let file of fileInput.files) {
  //         formData.append('documents', file);
  //     }
  // });

  const loadImages = (e) => {
    // e.target.value
    console.log(
      "🚀 ~ file: new.js:124 ~ loadImages ~ e.target.value",
      e.target.value
    );
  };
  //=================================================

  const onSubmit = async (data) => {
    const formData = new FormData();

    for (let file of data.images) {
      // console.log("🚀 ~ file: new.js:127 ~ onSubmit ~ file", file);
      // images.push(file.name);
      formData.append("images", file);
    }

    let ganancia = data.precio_venta - data.precio_compra;
    formData.append("ganancia", ganancia);
    formData.append("cantidad", data.cantidad);
    formData.append("descripcion", data.descripcion);
    formData.append("detalles", data.detalles);
    formData.append("fecha_de_caducidad", data.fecha_de_caducidad);
    formData.append("nombre", data.nombre);
    formData.append("precio_compra", data.precio_compra);
    formData.append("precio_venta", data.precio_venta);
    formData.append("unidad", data.unidad);
    // console.log("🚀 ~ file: new.js:141 ~ onSubmit ~ formData", formData);

    try {
      if (image !== "") {
        // uploadToServer();
      } else {
        // console.log("no se ha selecionado una imagen");
      }
      if (!query.id) {
        // dispatch({ type: "ADD_ARTICULO", articulo: prod });
        //localbase
        // db.collection("articulos").add(prod);
        // pocketbase
        const record = await createRecord("productos", formData);
        console.log("🚀 ~ file: new.js:141 ~ onSubmit ~ record", record)
      } else {
        console.log("🚀 ~ file: new.js:92 ~ onSubmit ~ prod", prod);
        dispatch({ type: "UPDATE_ARTICULO", articulo: prod });
        // localbase
        // db.collection("articulos").doc({ id: query.id }).update(prod);
      }
      // setAlert(1);
      let back = "/productos";
      push(back);
    } catch (error) {
      console.error(error);
    }
  };

  //============= manejo del stepper========================

  const Form1 = () => {
    return (
      <div
      // className="flex flex-col md:flex-row"
      >
        <div className="md:col-span-5">
          <label
            htmlFor="nombre"
            className={`${errors.nombre ? "text-red-400" : "text-blue-400"} `}
          >
            Nombre
          </label>
          <input
            type="text"
            name="nombre"
            id="nombre"
            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
            {...register("nombre")}
          />
          <p className={` ${errors.nombre && "visible text-red-400 "}`}>
            {errors.nombre ? errors.nombre?.message : ""}
          </p>
        </div>
        <div className="md:col-span-5">
          <label htmlFor="descripcion">Descripción</label>
          <textarea
            name="descripcion"
            className=" border  rounded px-4  bg-gray-50 mt-1 block w-full 
                            border-gray-300 shadow-sm focus:border-indigo-300 focus:ring
                             focus:ring-indigo-200 focus:ring-opacity-50"
            rows={3}
            defaultValue={""}
            {...register("descripcion")}
          />
        </div>{" "}
        <div className="lg:col-span-2 md:col-span-1 w-full">
          <div className="grid gap-4 gap-y-2 text-sm grid-cols-2 ">
            <div className="md:col-span-5">
              <label htmlFor="precio_compra">Precio de compra</label>
              <input
                type="number"
                name="precio_compra"
                id="precio_compra"
                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                {...register("precio_compra")}
              />
            </div>{" "}
            <div className="md:col-span-5">
              <label htmlFor="precio_venta">Precio de venta</label>
              <input
                type="text"
                name="precio_venta"
                id="precio_venta"
                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                {...register("precio_venta")}
              />
            </div>
            <div className="md:col-span-5">
              <label htmlFor="images">Imagenes</label>
              <input
                className=" w-full mt-1 rounded-md border h-10 bg-gray-50 border-gray-300 
                        shadow-sm focus:border-indigo-300 focus:ring
                         focus:ring-indigo-200 focus:ring-opacity-50"
                id="images"
                type="file"
                multiple
                {...register("images")}
              />
            </div>{" "}
            <div className="md:col-span-5">
              <label htmlFor="cantidad">Cantidad</label>
              <input
                type="number"
                name="cantidad"
                id="cantidad"
                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                {...register("cantidad")}
              />
            </div>{" "}
          </div>
        </div>
      </div>
    );
  };

  const Form2 = () => {
    return (
      <div>
        <div className="md:col-span-5 block">
          <label htmlFor="detalles">Detalles</label>
          <textarea
            className=" border rounded px-4  bg-gray-50 mt-1 block w-full 
border-gray-300 shadow-sm focus:border-indigo-300 focus:ring
focus:ring-indigo-200 focus:ring-opacity-50"
            rows={3}
            defaultValue={""}
            {...register("detalles")}
          />
        </div>{" "}
        <div className="lg:col-span-2 md:col-span-1 w-full">
          <div className="grid gap-4 gap-y-2 text-sm grid-cols-2 ">
            <div className="md:col-span-5">
              <label htmlFor="unidad">Unidad</label>
              <input
                type="text"
                name="unidad"
                id="unidad"
                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                {...register("unidad")}
              />
            </div>
            <div className="md:col-span-5">
              <label htmlFor="etiquetas">Etiquetas</label>
              <input
                type="text"
                name="etiquetas"
                id="etiquetas"
                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                {...register("etiquetas")}
              />
            </div>{" "}
            <div className="md:col-span-5 ">
              <span className="text-gray-700">Categoria</span>
              <select
                className=" w-full mt-1 rounded-md border h-10 bg-gray-50 border-gray-300 
                        shadow-sm focus:border-indigo-300 focus:ring
                      focus:ring-indigo-200 focus:ring-opacity-50"
                {...register("categoria")}
              >
                <option className="p-5">Corporate event</option>
                <option>Wedding</option>
                <option>Birthday</option>
                <option>Other</option>
              </select>
            </div>{" "}
            <div className="md:col-span-5">
              <label htmlFor="fecha_de_caducidad">Fecha de caducidad</label>
              <input
                type="date"
                name="fecha_de_caducidad"
                id="fecha_de_caducidad"
                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                {...register("fecha_de_caducidad")}
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  function getSteps() {
    return ["Datos basicos", "Datos finales", "Hecho!"];
  }

  function getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return <Form1 />;
      case 1:
        return <Form2 />;
      case 2:
        return "Tu producto ha sido Guardado";
      default:
        return "Unknown stepIndex";
    }
  }

  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  //============= upload image for sever nextjs========================
  const [image, setImage] = useState("");

  const uploadToClient = (event) => {
    // const timeStamp = moment().format("DD-MM-YYYY");
    // if (event.target.files && event.target.files[0]) {
    //   const i = event.target.files[0];
    //   let url = `/uploads/${timeStamp}-${i.name}`;
    //   setImage(i);
    //   let prod = producto;
    //   prod.imagen = `${url}`;
    //   setProducto(prod);
    //   console.log("paso");
    // }
  };

  const uploadToServer = async (event) => {
    const body = new FormData();
    body.append("file", image);
    const response = await fetch("/api/uploads", {
      method: "POST",
      body,
    }).then((response) => response.json());
  };

  //===============================================
  const getCategorias = async () => {
    try {
      const records = await getFullList("categorias");
      const categoria = [];
      records?.map((e) => {
        if (e) {
          categoria.push({ value: e.nombre, label: e.nombre });
        }
      });
      setCategorias(categoria);
    } catch (error) {
      console.log("error: ", error);
    }
  };

  // useEffect(() => {
  //   const getArticulo = async () => {
  //     try {
  //       let articulo = await db
  //         .collection("articulos")
  //         .doc({ id: query.id })
  //         .get();
  //       console.log("articulo: ", articulo);
  //       setProducto(articulo);
  //     } catch (error) {
  //       console.log("error: ", error);
  //     }
  //   };

  //   if (query.id) {
  //     getArticulo();
  //   }
  //   getCategorias();
  // }, []);

  useEffect(() => {
    let defaultValue = {};

    if (query.id) {
      // defaultValue.nombre = producto.nombre;
      // defaultValue.descripcion = producto.descripcion;
      // defaultValue.precio_compra = producto.precio_compra;
      // defaultValue.precio_venta = producto.precio_venta;
      // defaultValue.ganancia = producto.ganancia;
      // defaultValue.cantidad = producto.cantidad;
      // defaultValue.etiquetas = producto.etiquetas;
      // defaultValue.unidad = producto.unidad;
      defaultValue = { ...producto };
      console.log(
        "🚀 ~ file: new.js:164 ~ useEffect ~ defaultValue",
        defaultValue
      );

      reset({ ...defaultValue });
    }
  }, [producto]);

  return (
    <>
      <div className="min-h-screen bg-theme p-12 grid grid-cols-6 gap-8 justify-center">
        <div className="bg-white rounded-lg col-start-2 col-span-4 w-auto mx-auto shadow-lg">
          <div className="grid grid-cols-3 lg:grid-cols-2 sm:grid-cols-1 ">
            <img
              className="object-cover h-64 w-64 rounded-lg"
              src="/assests/register-image.jpeg"
            />

            <form
              className="col-start-2 col-span-3"
              onSubmit={handleSubmit(onSubmit)}
              encType="multipart/form-data"
            >
              <div className=" grid w-auto items-center mx-auto ">
                <div className="grid grid-cols-1">
                  <div className="text-gray-600 my-2 ml-4">
                    <p className="font-medium text-lg ml-6">Nuevo Producto</p>
                    <p>Por favor llene los siguientes campos.</p>
                  </div>

                  <div className="flex items-center justify-around  text-white relative">
                    {steps.map((label,i) => (
                      <div className="flex px-1" key={i}>
                        <div className="rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 bg-blue-600 border-blue-600">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="100%"
                            height="100%"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-user-plus "
                          >
                            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                            <circle cx="8.5" cy="7" r="4"></circle>
                            <line x1="20" y1="8" x2="20" y2="14"></line>
                            <line x1="23" y1="11" x2="17" y2="11"></line>
                          </svg>
                        </div>
                        <div className="absolute top-0 -ml-5 text-center mt-16 w-32 text-xs font-medium uppercase text-blue-600">
                          {label}
                        </div>
                        <div className="flex-auto border-t-2 transition duration-500 ease-in-out border-blue-600"></div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-8 p-4 grid ">
                  {activeStep === steps.length ? (
                    <div>
                      <h4>El producto se ha guardado Correctamente</h4>
                      <Link href={"/mercado"}>
                        <button
                          type="button"
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                          Volver a mercado
                        </button>
                      </Link>
                    </div>
                  ) : (
                    <div>
                      <h4>{getStepContent(activeStep)}</h4>
                      {/* botones de Form */}
                      <div className="grid grid-cols-3 gap-4 mt-8">
                        <div className="">
                          <Link href={"/mercado"}>
                            <button
                              type="button"
                              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            >
                               {activeStep !==2 ?"Cancelar":"Mercado"}
                            </button>
                          </Link>
                        </div>
                        <div className="col-span-2 ">
                        {activeStep ===1 &&(
                                <button
                                className="bg-blue-500 hover:bg-blue-700 text-white
                                         font-bold py-2 px-4 rounded mr-2"
                                onClick={handleBack}
                              >
                                Atrás
                              </button>
                            )
                            } 
                          {activeStep ===0 &&(
                                  <button
                                  className="bg-blue-500 hover:bg-blue-700 text-white
                                           font-bold py-2 px-4 rounded mr-2"
                                  onClick={handleNext}
                                >
                                  Siguiente
                                </button>
                            )
                            }     
                               {activeStep === 1 && (
                              <button
                                type="submit"
                                className="bg-blue-500 hover:bg-blue-700 text-white
                                     font-bold py-2 px-4 rounded mr-2"
                                disabled={activeStep === 0}
                                // onClick={handleNext}
                              >
                                Guardar
                              </button>
                            )}
                                           
                        </div>
                      </div>
                   
                    </div>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>

        <div></div>
      </div>
    </>
  );
};

export default ProductForm;

{
  /* <Grid.Container gap={2} justify="center" css={{ mt: "$2" }}>
<Card css={{ p: "$6", mw: "450px" }}>
  <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
    <Card.Header>
      <Grid aling="space-between">
        <Text h3 css={{ width: "350px" }}>
          {query.id ? "Editar producto " : "Crear producto"}
        </Text>
      </Grid>
    </Card.Header>
    <Card.Body>
      <Grid xs={12}>
        <Input
          width="455px"
          size={"lg"}
          clearable
          label={errors.nombre ? errors.nombre?.message : "Nombre"}
          color="primary"
          shadow={false}
          status={errors.nombre ? "error" : "primary"}
          helperColor={errors.nombre ? "success" : "error"}
          {...register("nombre")}
          type="text"
          aria-label="nombre"
        />
      </Grid>
      <Grid xs={12} css={{ py: "$8" }}>
        <Textarea
          size={"lg"}
          width="455px"
          clearable
          color="primary"
          status={"primary"}
          label={"Descripción"}
          rows={4}
          {...register("descripcion")}
          aria-label="descripcion"
        />
      </Grid>{" "}
      <Grid xs={12} css={{ py: "$8" }}>
        <Input
          width="455px"
          size={"lg"}
          clearable
          type="number"
          label={
            errors.precio_compra
              ? errors.precio_compra?.message
              : "Precio de compra"
          }
          color="primary"
          shadow={false}
          status={errors.precio_compra ? "error" : "primary"}
          helperColor={errors.precio_compra ? "success" : "error"}
          {...register("precio_compra")}
          aria-label="precio_compra"
        />{" "}
        <Input
          width="455px"
          size={"lg"}
          clearable
          type="number"
          label={
            errors.precio_venta
              ? errors.precio_venta?.message
              : "Precio de venta"
          }
          color="primary"
          shadow={false}
          status={errors.precio_venta ? "error" : "primary"}
          helperColor={errors.precio_venta ? "success" : "error"}
          {...register("precio_venta")}
          aria-label="precio_venta"
        />
      </Grid>{" "}
      <Grid xs={12} css={{ py: "$8" }}>
        <Input
          width="455px"
          size={"lg"}
          clearable
          label="Etiquetas"
          color="primary"
          shadow={false}
          status={"primary"}
          {...register("etiquetas")}
          aria-label="etiquetas"
        />
      </Grid>{" "}
      <Grid xs={12} css={{ py: "$8" }}>
        <Textarea
          size={"lg"}
          width="455px"
          clearable
          color="primary"
          status={"primary"}
          label={"Detalles"}
          rows={4}
          {...register("detalles")}
          aria-label="detalles"
        />
      </Grid>{" "}
      <Grid xs={12} css={{ py: "$8" }}>
        <Input
          width="455px"
          size={"lg"}
          clearable
          label={errors.unidad ? errors.unidad?.message : "Unidad"}
          color="primary"
          shadow={false}
          status={errors.unidad ? "error" : "primary"}
          helperColor={errors.unidad ? "success" : "error"}
          {...register("unidad")}
          aria-label="unidad"
        />

        <Input
          width="455px"
          size={"lg"}
          clearable
          type="number"
          label={
            errors.cantidad ? errors.cantidad?.message : "Cantidad"
          }
          color="primary"
          shadow={false}
          status={errors.cantidad ? "error" : "primary"}
          helperColor={errors.cantidad ? "success" : "error"}
          {...register("cantidad")}
          aria-label="cantidad"
        />
      </Grid>{" "}
      <Grid xs={12} css={{ py: "$8" }}>
        <Text> Catergorias</Text>
        <Select
instanceId="chakra-react-select-1"
// isMulti
name="Categorias"
// options={categorias}
options={[
  {
    label: "I am red",
    value: "i-am-red",
    colorScheme: "red", // The option color scheme overrides the global
  },
  {
    label: "I fallback to purple",
    value: "i-am-purple",
  },
]}
placeholder="Seleccione alguna categoria.."
closeMenuOnSelect={false}
theme={theme}
/>
       </Grid>{" "}
      <Grid xs={12} css={{ py: "$8" }}>
        <Input
          width="455px"
          size={"lg"}
          clearable
          color="primary"
          shadow={false}
          status={"primary"}
          aria-label="fecha_de_caducidad"
          label="Fecha de Caducidad"
          type="date"
          {...register("fecha_de_caducidad")}
        />
      </Grid>{" "}
      <Grid xs={12} css={{ py: "$8" }}>
        <Input
          width="455px"
          size={"lg"}
          clearable
          labelLeft="Imagenes"
          color="primary"
          type="file"
          shadow={false}
          status={"primary"}
          {...register("images")}
          aria-label="imagen"
          onChange={loadImages}
          // onChange={saveImageIndexedDB}
          // onChange={uploadToPockerbase}
        />
      </Grid>{" "}
    </Card.Body>
    <Card.Footer>
      <Row justify="space-between">
        <Link href="/productos">
          <a>
            <Button>
              <Text color="white">Atrás</Text>
            </Button>
          </a>
        </Link>

        <Button type="submit">
          <Text color="white">Guardar</Text>
        </Button>
      </Row>
    </Card.Footer>
  </form>
</Card>
</Grid.Container> */
}
