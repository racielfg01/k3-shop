import {
  Add,
  ArrowBackIosOutlined,
  Delete,
  DeleteOutline,
  DeleteOutlined,
  EditOutlined,
  Remove,
} from "@mui/icons-material";
import {
  Box,
  Button,
  // Card,
  CardContent,
  CardHeader,
  Fab,
  // Grid,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { blue, red } from "@mui/material/colors";
import { ArticuloContext } from "../../contexts/ArticuloContext";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import Localbase from "localbase";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import LocalPrintshopOutlinedIcon from '@mui/icons-material/LocalPrintshopOutlined';
import { Container, Text, Card, Grid, Row } from "@nextui-org/react";
let db = new Localbase("db");

const cBlue = blue[500];
const cRed = red[500];

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

  useEffect(() => {
    const getFacturas = async () => {
      try {
        let factura = await db
          .collection("facturas")
          .doc({ id: query.id })
          .get();
        factura = factura === undefined ? "":factura;
        console.log(
          "🚀 ~ file: [id].js ~ line 68 ~ getFacturas ~ factura",
          factura
        );
        setFactura(factura);
      } catch (error) {
        console.log("error: ", error);
      }
    };
    getFacturas();
  }, []);

  return (
    <>{factura.cliente&&(
      <Container direction="column" sx={{  height: "100vh" }}>
      <Grid.Container gap={2} justify="center" css={{mt: "2rem",}}>
          <Card  justify="center" css={{ p: "$6", mw: "500px" ,}}>
            <Card.Header>
              <Grid.Container css={{ pl: "$6" }}>
                <Grid xs={12} justify="end">
                  <Link href={`/facturas/edit/${query.id}`}>
                    <a>
                        <EditOutlined color="primary" />
                    </a>
                  </Link>
                  <Grid css={{ml:"$10"}}>

                  <Link href={`/facturas/print/${query.id}`}>
                    <a>
                        <LocalPrintshopOutlinedIcon color="primary" />
                    </a>
                  </Link>
                  </Grid>
                </Grid>
                <Grid xs={12}>
                  <Text h3 css={{ lineHeight: "$xs" }}>
                    Cliente: {cliente.nombre} {cliente.apellidos}
                  </Text>
                </Grid>
                {/* <Grid xs={12}>
                  :<Text css={{ color: "$accents8" }}>{cliente.telefono}</Text>
                </Grid> */}
              </Grid.Container>
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
    )}
    </>
  );
};

export default Detalles;

