import Image from "next/image";
import logo from "../public/M-logo.png";

function Banner() {
  return (
    <div className="flex justify-between items-center
     bg-yellow-400 border-y border-black py-10 lg:py-0">

       <div className="px-10 space-y-5">
        <h1 className="text-6xl max-w-xl font-serif">
            <span className="underline decoration-black
            decotation-4
            ">
                Medium</span> {" "}
            is a place to write, read and 
            connect
        </h1>
        <h2>
            It's aesy and free to 
            post your thinking on any topic and 
            connect with millions of readers.
        </h2>
       </div>
      <Image 
            className="hidden md:inline-flex h-32 lg:h-full"
          
            src={logo}
            alt="Logo de Medium"          
      />
    </div>
  )
}

export default Banner