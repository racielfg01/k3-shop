import React, { useContext, useEffect, useState, useReducer } from "react";
import { ClienteContext } from "../../contexts/ClienteContext";
import { AddOutlined, Close } from "@mui/icons-material";
import {
  Alert,
  // Button,
  // Card,
  CardHeader,
  Container,
  // Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import Link from "next/link";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
// import ItemListClient from "../../components/ItemListClient";
import { blue, red } from "@mui/material/colors";
import Localbase from "localbase";
import ItemList from "../../components/ItemListFact";
import LocalPrintshopOutlinedIcon from "@mui/icons-material/LocalPrintshopOutlined";
import { Text, Card, Input, Spacer, Row,Grid,Button } from "@nextui-org/react";
import Body from "../../components/Body";
import Buscar from "../../components/Buscar";


const Facturas = () => {
  const { facturasC, alert, setAlert, dispatch } = useContext(ClienteContext);
  const [buscar, setBuscar] = useState("");
  const [existBusq, setExistBusq] = useState(false);
  const [facturas, setFacturas] = useState([]);
  const [facturasB, setFacturasB] = useState([]);

  // let total = facturas
  //   ? facturas.length == 1
  //     ? `Total - ${facturas.length} factura`
  //     : `Total - ${facturas.length} facturas`
  //   : `Total - 0 facturas`;
  // const handleAlertClose = () => setAlert(0);

  const buscarFacturas = () => {
    if (facturasC !== undefined) {
      const res = facturasC.filter((factura) => porCliente(factura));
      setFacturasB(res);
    }
  };

  const closeBuscar = () => {
    setExistBusq(false);
    setFacturas(facturas);
  };

  const porCliente = (cliente) => {
    return cliente.nombre.toLowerCase().includes(buscar)||cliente.nombre.includes(buscar);
  };

  //  const porApellidos = (cliente) => {
  //   return cliente.apellidos.toLowerCase().includes(buscar)||cliente.apellidos.includes(buscar);
  // };

  const handleChange = (event) => {
    let { value } = event.target;
    setBuscar(value);
    buscarFacturas();
  };

  const deleteItem = (id) => {
    const res = facturas.filter((val) => val.id !== id);
    setFacturas(res);
    setAlert(2);
  };

  const getFacturas = async () => {
    let db = new Localbase("db");
    try {
      const facturas = await db.collection("facturas").get();
      dispatch({ type: "SCYNC_FACTURAS", facturas: facturas.reverse() });
      setFacturas(facturas);
    } catch (error) {
      console.log("error:", error);
    }
  };

  useEffect(() => {
    getFacturas();
  }, []);

  useEffect(() => {
    if (buscar === "") {
      closeBuscar();
    }
  }, [buscar]);


  // useEffect(() => {
  //   if (alert === 1 || alert === 2) {
  //     setTimeout(() => setAlert(0), 6000);
  //   }
  // },   
  // [alert]);


  return (
    <>
      <Buscar
        flag={"facturas"}
        payload={facturas.length}
        handleChange={handleChange}
        alerta={alert}
      />
      <Body 
      flag={"facturas"} 
      payload={existBusq?facturasB:facturas} 
      deleteItem={deleteItem}
       />
    </>
  );
};

export default Facturas;

// {alert == 1 ? (
//   <Container>
//     <Card css={{ $$cardColor: "$colors$primary" }}>
//       <Card.Body>
//         <Row justify="center" align="center">
//           <Text h6 size={15} color="white" css={{ m: 0 }}>
//             Factura guardada correctamente
//           </Text>
//         </Row>
//       </Card.Body>
//     </Card>
//   </Container>
// ) : (
//   ""
// )}
// {alert == 2 ? (
//   <Container>
//     <Card css={{ $$cardColor: "$colors$primary" }}>
//       <Card.Body>
//         <Row justify="center" align="center">
//           <Text h6 size={15} color="white" css={{ m: 0 }}>
//           Factura eliminada correctamente
//           </Text>
//         </Row>
//       </Card.Body>
//     </Card>
//   </Container>
// ) : (
//   ""
// )}

// <Container >
//   <Card variant="bordered" xl={8} css={{ mt: "1rem" }}>
//     <Card.Body>
//       <Row justify="space-around" align="center" >
//         <Text h6 size={24} css={{ m: 0 }}>
//         Facturas
//           <span>
//             <Text h6>{total}</Text>
//           </span>
//         </Text>
        
//       </Row>

//       <Row justify="center">
//         <Grid item xl={12}>
//           <Spacer y={1.5} />
//           <Input
//             size="md"
//             clearable
//             underlined
//             labelPlaceholder="Buscar"
//             // initialValue="NextUI"
//             value={buscar || ""}
//             onChange={handleChange}
//             css={{ width: "60vw" }}
//           />
//         </Grid>
//       </Row>
//     </Card.Body>
//   </Card>

// <Container>
//   {facturas?.length > 0 ? (
//     <>
//       <Grid.Container
//         direction="column"
//         // justify="center"
//         alignItems="center"
//         css={{
//           m: "$2",
//           maxHeight: "100vh",
//           height: "80vh",
//           overflow: "auto",
//         }}
//         gap={1}
//       >
//         {facturas.map((factura, i) => (
//           <Grid key={i}>
//             <ItemList factura={factura} deleteItem={deleteItem} />
//           </Grid>
//         ))}
//         <Spacer y={1} />
//       </Grid.Container>
//     </>
//   ) : (
//     <Container>
//       <Card css={{ mt:"$10" }}>
//         <Card.Body>
//           <Row justify="center" align="center">
//             <Text h6 size={15} css={{ m: 0 }}>
//               No hay facturas.
//             </Text>
//           </Row>
//         </Card.Body>
//       </Card>
//     </Container>
//   )}
// </Container>
// </Container>
