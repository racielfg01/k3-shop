
import Head from "next/head";
import {  Cart, FlexContent, Footer, Hero, Navbar, Sales, Stories } from "../components";
import { heroapi, popularsales,topratesales, highlight, sneaker, story, footerAPI  } from "../data/data";


export default function Layout({children}) {
  return (
    <div >
    <Head>
      <title>My App</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
      <Navbar/>
      <Cart/>
      <main className='min-h-screen flex flex-col gap-16 relative' >
      <div className='bg-theme clip-path h-[85vh] lg:h-[75vh] md:h-[65vh] sm:h-[55vh] w-auto absolute
         top-0 left-0 right-0 opacity-100 z-0'>
         </div>
         <div className="z-20">

        {children}
         </div>

      {/* <Hero heroapi={heroapi}/> */}
      </main>

    <Footer footerAPI={footerAPI} />
  </div>
  )
}
