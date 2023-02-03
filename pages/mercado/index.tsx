import { NextPage } from "next";
import { Cart, Categorias, Layout, Navbar, Sales, Ventas } from "../../components";

const Home: NextPage = () => {
  return (
    <main className=" bg-theme min-h-screen overflow-hidden" >
     <Navbar/>
      <Cart/>
      <div className="pt-24 mx-6 mb-8">
        <Categorias/>
         </div>
       </main >
  );
};

export default Home;
