import type { NextPage } from "next";
import { Layout, Cart, FlexContent, Footer, Hero, Navbar, Sales, Stories } from "../components";
import { heroapi, popularsales,topratesales, highlight, sneaker, story, footerAPI  } from "../data/data";


const Home: NextPage = () => {
  return (
     <Layout >
        <Hero heroapi={heroapi}/>
       <Sales endpoint={popularsales} ifExists/>
       <FlexContent endpoint={highlight} ifExists />
        <Sales endpoint={topratesales} ifExists={false}/>
        <FlexContent endpoint={sneaker} ifExists/>
        <Stories story={story} />
      </Layout>
  );
};

export default Home;
