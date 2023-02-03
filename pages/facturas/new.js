import React, { useEffect, useState, Fragment, useMemo } from "react";
import { useRouter } from "next/router";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  AlertTitle,
  Autocomplete,
  // Button,
  // Card,
  CardActions,
  CardHeader,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  // Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  MenuItem,
  Paper,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { blue, red } from "@mui/material/colors";
import moment from "moment";
import { Box } from "@mui/system";
import { v1 } from "uuid";
import Localbase from "localbase";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import InboxIcon from "@mui/icons-material/MoveToInbox";
// import Select from "react-select";
import {
  Select,
  AsyncSelect,
  CreatableSelect,
  AsyncCreatableSelect,
} from "chakra-react-select";


import AddIcon from "@mui/icons-material/Add";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import { useFactura } from "../../contexts/FacturaContext";
import { useStateContext } from "../../contexts/ecommerceState";
import {
  Input,
  Row,
  Text,
  Card,
  Grid,
  Button,
  Dropdown,
  Collapse,
} from "@nextui-org/react";

let db = new Localbase("db");

const Form = () => {
  const { push, query } = useRouter();
  const cBlue = blue[500];

  const {
    totalPrice,
    cartItems,
    setCartItems,
    setShowCart,
    totalQuantities,
    setTotalQuantities,
    toggleCartItemQuantity,
    setTotalPrice,
    onRemove,
  } = useStateContext();

  const [clientes, setClientes] = useState([]);

  const [success, setSuccess] = useState(false);
  const [precioTotal, setPrecioTotal] = useState(0);
  const [cliente, setCliente] = useState({
    nombre: "",
    apellidos: "",
    telefono: 0,
    direccion: "",
    email: "",
    infoAdicional: "",
    notasInternas: "",
    proveedor: false,
    imagen: "",
  });

  const [factura, setFacturas] = useState({
    numero: "fact-0000-22",
    cliente: {},
    productos: [],
    descuentos: 0,
    impuestos: 0,
    flete: 0,
    precioTotal: 0,
  });

  // const customStyles = {
  //   option: (provided, state) => ({
  //     ...provided,
  //     // borderBottom: '1px dotted pink',
  //     // color: state.isSelected ? 'red' : 'blue',
  //     // padding: 20,
  //   })
  // }
  const { setAlert, dispatch } = useFactura();

  const validationSchema = Yup.object().shape({
    descuentos: Yup.number().min(0, "El minimo es cero"),

    impuestos: Yup.number().min(0, "El minimo es cero"),

    flete: Yup.number().min(0, "El minimo es cero"),
  });

  const {
    register,
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: useMemo(() => factura, [factura]),
  });

  const handleChangeSelect = (event) => {
    setCliente(event.target.value);
  };

  const cleanCart = () => {
    setCartItems([]);
    setTotalQuantities(0);
    setTotalPrice(0);
  };

  const actualizarCantidadxProducto = ({ producto, cantidad }) => {
    producto.cantidad = producto.cantidad - cantidad;
    db.collection("articulos").doc({ id: producto.id }).update(producto);
  };

  const getNumeroFactura = () => {
    let cantidad = db.collection("facturas").all();
  };

  const onSubmit = (data) => {
    cartItems.map((item) => actualizarCantidadxProducto(item));

    let factura = data;
    factura.numero = getNumeroFactura();
    factura.cliente = clientes.find((c) => c.id === cliente);
    factura.productos = cartItems;

    factura.precioTotal =
      totalPrice - (factura.descuentos + factura.impuestos + factura.flete);
    setPrecioTotal(factura.precioTotal);
    factura.fechaCreacion = moment().format("LLLL");

    try {
      factura.id = v1();
      dispatch({ type: "ADD_FACTURA", factura: factura });
      db.collection("facturas").add(factura);

      setAlert(1);
      cleanCart();
      let back = "/pedidos";
      push(back);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const getClientes = async () => {
      let db = new Localbase("db");
      try {
        let clientes = await db.collection("clientes").get();

        setClientes(clientes);
      } catch (error) {
        console.log("error: ", error);
      }
    };
    getClientes();
  }, []);

  return (
    <>
      <Grid.Container gap={2} justify="center">
        <Card css={{ p: "$6", mw: "500px" }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Card.Header>
              <Row justify={"center"} align="center">
                <Grid >
                  <Text h3 css={{ width: "150px" }}>
                    {query.id ? "Editar factura" : "Crear factura"}
                  </Text>
                </Grid>
              </Row>
            </Card.Header>
            <Card.Body css={{ py: "$2" }}>
              <Row>
                <Grid>
                  <Text h4>No. de factura: <Text >{factura.numero}</Text></Text>
                </Grid>
              </Row>
              <Grid>
                {/* <Select
                  // styles={customStyles}
                  
                  id="react-select-live-region"
                  options={clientes.map((c) => ({
                    value: c.id,
                    label: c.nombre + " " + c.apellidos,
                  }))}
                  className="react-select-container"
                  classNamePrefix="react-select"
                  placeholder="Selecione el cliente"
                  // theme={theme => ({
                  //   ...theme,
                  //   borderRadius: 0,
                  //   colors: {
                  //     ...theme.colors,
                  //     primary25: 'hotpink',
                  //     primary: 'black',
                  //   }})}
                /> */}
                 {/* <Select
    colorScheme="purple"
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
  /> */}
              </Grid>
            
              <Grid>
                <Collapse.Group accordion={false}>
                  <Collapse
                    title={<Text h5>Productos ({cartItems.length}) </Text>}
                  >
                    <Text>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </Text>
                  </Collapse>
                </Collapse.Group>
              </Grid>
              <Grid xs={12}>
                <Input
                  width="455px"
                  // bordered
                  size={"lg"}
                  clearable
                  labelLeft="Descuento"
                  aria-label="descuento"
                  status={"primary"}
                  color={"primary"}
                  helperColor={errors.descuento ? "success" : "error"}
                  helperText={errors.descuento?.message}
                  {...register("descuento")}
                />
              </Grid>{" "}
              <Grid xs={12}>
                <Input
                  width="455px"
                  // bordered
                  size={"lg"}
                  clearable
                  labelLeft="Impuesto"
                  aria-label="impuesto"
                  status={"primary"}
                  color={"primary"}
                  helperColor={errors.impuesto ? "success" : "error"}
                  helperText={errors.impuesto?.message}
                  {...register("impuesto")}
                />
              </Grid>{" "}
              <Grid xs={12}>
                <Input
                  width="455px"
                  // bordered
                  size={"lg"}
                  clearable
                  labelLeft="Flete"
                  aria-label="flete"
                  status={"primary"}
                  color={"primary"}
                  helperColor={errors.flete ? "success" : "error"}
                  helperText={errors.flete?.message}
                  {...register("flete")}
                />
              </Grid>{" "}
              <Grid xs={12}>
                <Input
                  width="455px"
                  labelLeft="Observaciones"
                  size={"lg"}
                  clearable
                  aria-label="observaciones"
                  status={"primary"}
                  color={"primary"}
                  helperColor={errors.observaciones ? "success" : "error"}
                  helperText={errors.observaciones?.message}
                  {...register("observaciones")}
                />
              </Grid>
              <Grid>
                <Text h5> Total: ${totalPrice} </Text>
                <Text h6>Precio total : ${precioTotal}</Text>
              </Grid>
            </Card.Body>
            <Card.Footer>
              <Row justify="space-between">
                <Link href="/clientes">
                  <a>
                    <Button>
                      <Text>Atrás</Text>
                    </Button>
                  </a>
                </Link>

                <Button type="submit">
                  <Text>Guardar</Text>
                </Button>
              </Row>
            </Card.Footer>
          </form>
        </Card>
      </Grid.Container>
    </>
  );
};

export default Form;

{
  /* <Grid
container
direction="column"
justifyContent="center"
alignItems="center"
>
<Grid
  sx={{ m: "1rem", marginTop: "2rem", marginBottom: "6rem" }}
  justifyContent="center"
  alignItems="center"
>
  <Grid justifyContent="center" sx={{ m: "1rem" }}>
    <Card sx={{ maxWidth: 500 }}>
      <CardHeader
        title={
          query.id ? (
            <Typography variant="h5" align="center" margin="dense">
              Editar factura
            </Typography>
          ) : (
            <Typography variant="h5" align="center" margin="dense">
              Crear factura
            </Typography>
          )
        }
        subheader=""
      />

      <Box
        component="form"
        sx={{ m: "1rem" }}
        noValidate
        autoComplete="off"
      >
        <Grid
          container
          direction={"column"}
          justifyContent="space-around"
          alignItems="center"
        >
          <Container>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={12}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Clientes
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    defaultValue="Clientes"
                    value={cliente}
                    label="Clientes"
                    onChange={handleChangeSelect}
                  >
                    <Link href="/clientes/new?nuevo=nuevo">
                      <a>
                        <MenuItem
                          value="nuevo"
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            bgcolor: "#1769aa",
                            color: "white",
                            hover: "#4dabf5",
                          }}
                        >
                          Adicionar cliente <AddIcon />
                        </MenuItem>
                      </a>
                    </Link>
                    {clientes.map((cli, i) => (
                      <MenuItem key={i} value={cli.id}>
                        {cli.nombre}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Typography variant="inherit" color="textSecondary">
                  {errors.nombre?.message}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12}>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography>
                      Productos ({cartItems.length}){" "}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <List
                      sx={{
                        width: "100%",
                        maxWidth: 360,
                        maxHeight: 210,
                        overflow: "auto",
                        bgcolor: "background.paper",
                      }}
                      component="nav"
                      aria-labelledby="nested-list-subheader"
                    >
                      {cartItems?.map(({ producto, cantidad }, i) => (
                        <ListItemButton key={i}>
                          <ListItemIcon>
                            <InboxIcon />
                          </ListItemIcon>
                          <ListItemText
                            primary={
                              <>
                                <Grid
                                  container
                                  justifyContent="space-between"
                                >
                                  <Grid item>{producto.nombre}</Grid>
                                  <Grid item>({cantidad})</Grid>
                                </Grid>
                              </>
                            }
                            secondary={
                              <React.Fragment>
                                ${producto.precio_venta}
                              </React.Fragment>
                            }
                          />
                        </ListItemButton>
                      ))}
                    </List>
                  </AccordionDetails>
                </Accordion>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="descuentos"
                  name="descuentos"
                  label="Descuentos"
                  type="number"
                  fullWidth
                  margin="dense"
                  defaultValue={0}
                  InputLabelProps={{ shrink: true }}
                  {...register("descuentos")}
                  error={errors.descuentos ? true : false}
                />
                <Typography variant="inherit" color="textSecondary">
                  {errors.descuentos?.message}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="impuestos"
                  name="impuestos"
                  label="Impuestos"
                  type="number"
                  fullWidth
                  margin="dense"
                  defaultValue={0}
                  InputLabelProps={{ shrink: true }}
                  {...register("impuestos")}
                  error={errors.impuestos ? true : false}
                />
                <Typography variant="inherit" color="textSecondary">
                  {errors.impuestos?.message}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="flete"
                  name="flete"
                  label="Flete"
                  type="number"
                  fullWidth
                  margin="dense"
                  defaultValue={0}
                  InputLabelProps={{ shrink: true }}
                  {...register("flete")}
                  error={errors.flete ? true : false}
                />
                <Typography variant="inherit" color="textSecondary">
                  {errors.flete?.message}
                </Typography>
              </Grid>

              <Grid item xs={12} sm={12}>
                <TextField
                  id="observaciones"
                  name="observaciones"
                  label="Observaciones"
                  fullWidth
                  margin="dense"
                  InputLabelProps={{ shrink: true }}
                  {...register("observaciones")}
                  error={errors.observaciones ? true : false}
                />
                <Typography variant="inherit" color="textSecondary">
                  {errors.observaciones?.message}
                </Typography>
              </Grid>
            </Grid>
            <CardActions>
              <Grid
                container
                direction="column"
                justifyContent="flex-end"
              >
                <Typography variant="body1" margin="dense">
                  Total: ${totalPrice}   
                </Typography>
                <Typography variant="h6" margin="dense">
                  Precio total : ${precioTotal}
                </Typography>
              </Grid>
            </CardActions>

            <Box mt={3} display="flex" justifyContent="space-between">
              <Button
                variant="contained"
                color="primary"
                sx={{ mr: "2em" }}
                onClick={() => cleanCart()}
              >
                <Link href="/pedidos">
                  <a>Cancelar</a>
                </Link>
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit(onSubmit)}
              >
                Guardar
              </Button>{" "}
            </Box>
          </Container>
        </Grid>
      </Box>
    </Card>
  </Grid>
</Grid>
</Grid> */
}
