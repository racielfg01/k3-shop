import Link from "next/link";

const Login = () => {
  return (
    <div className="flex flex-wrap min-h-screen w-full content-center justify-center
    bg-theme py-10">

 {/* //<!-- Login component --> */}
 <div className="flex shadow-md">

       {/* //<!-- Login banner --> */}
       <div className="flex flex-wrap content-center justify-center rounded-l-md" 
        style={{width: "24rem", height: "32rem"}}>
          <img className="w-full h-full bg-center bg-no-repeat bg-cover rounded-l-md"
           src="https://i.imgur.com/9l1A4OS.jpeg"/>
        </div>

      {/* //<!-- Login form --> */}
        <div className="flex flex-wrap content-center justify-center rounded-r-md bg-white"
         style={{width: "24rem", height: "32rem"}}
         >
          <div className="w-72">
          {/* //<!-- Heading --> */}
            <h1 className="text-xl font-semibold">Hola, Bienvenido</h1>
            <small className="text-gray-400">Por favor entre sus datos</small>
    
          {/* //<!-- Form --> */}
            <form className="mt-4">
              <div className="mb-3">
                <label className="mb-2 block text-xs font-semibold">Email</label>
                <input type="email" placeholder="Enter your email"
                 className="block w-full rounded-md border border-gray-300 focus:border-purple-700 
                 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500" />
              </div>
    
              <div className="mb-3">
                <label className="mb-2 block text-xs font-semibold">Contraseña</label>
                <input type="password" placeholder="*****" className="block w-full rounded-md border
                 border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1
                  focus:ring-purple-700 py-1 px-1.5 text-gray-500" />
              </div>
    
              <div className="mb-3 flex flex-wrap content-center">
                <input id="remember" type="checkbox" className="mr-1 checked:bg-purple-700 mb-1" /> 
                <label htmlFor="remember" className="mr-auto text-xs font-semibold">Recordar contraseña</label>
                <a href="#" className="text-xs font-semibold text-purple-700">¿Olvidaste tu contraseña?</a>
              </div>
    
              <div className="mb-3">
                <button className="mb-1.5 block w-full text-center text-white bg-purple-700
                 hover:bg-purple-900 px-2 py-1.5 rounded-md">Entrar</button>
                <button className="flex flex-wrap justify-center w-full border border-gray-300
                 hover:border-gray-500 px-2 py-1.5 rounded-md">
                  <img className="w-5 mr-2" 
                  src="https://lh3.googleusercontent.com/COxitqgJr1sJnIDe8-jiKhxDx1FrYbtRHKJ9z_hELisAlapwE9LUPh6fcXIfb5vwpbMl4xl9H9TRFPc5NOO8Sb3VSgIBrfRYvW6cUA"/>
                  Regístrase con Google
                </button>
              </div>
            </form>
    
          {/* //<!-- Footer --> */}
            <div className="text-start">
              <span className="text-xs text-gray-400 font-semibold">
                ¿No tienes una cuenta todavía?</span>
              <Link href={'/register'}>
              <button className="text-xs font-semibold text-purple-700 ">Regístrase</button>
              </Link>
            </div>
          </div>
        </div>
    
   
    
      </div>
    
  
    </div>
      
   
    
  )
}

export default Login;



{/* <body className="font-mono bg-gray-400"> */}
    {/* <!-- Container --> */}
    {/* <div className="container mx-20">
        <div className="flex justify-center px-6 my-8"> */}
            {/* <!-- Row --> */}
            {/* <div className="w-2/3 xl:w-3/4 lg:w-11/12 flex"> */}
                {/* <!-- Col --> */}
                {/* <div
                    className=" bg-[url('/assests/register-image.jpeg')] w-full h-auto
                    flex items-stretch
                     bg-gray-400 lg:w-1/2 bg-cover rounded-l-lg "
                ></div> */}
                {/* hidden sm:block */}
                {/* <!-- Col --> */}
                {/* <div className="w-full lg:w-7/12 bg-white p-5 rounded-lg lg:rounded-l-none">
                    <h3 className="pt-4 text-2xl text-center">Crea una Cuenta!</h3>
                    <form className="px-8 pt-6 pb-8 mb-4 bg-white rounded">
                        <div className="mb-4 md:flex md:justify-between">
                            <div className="mb-4 md:mr-2 md:mb-0">
                                <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="firstName">
                                    First Name
                                </label>
                                <input
                                    className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                    id="firstName"
                                    type="text"
                                    placeholder="First Name"
                                />
                            </div>
                            <div className="md:ml-2">
                                <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="lastName">
                                    Last Name
                                </label>
                                <input
                                    className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                    id="lastName"
                                    type="text"
                                    placeholder="Last Name"
                                />
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="email">
                                Email
                            </label>
                            <input
                                className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                id="email"
                                type="email"
                                placeholder="Email"
                            />
                        </div>
                        <div className="mb-4 md:flex md:justify-between">
                            <div className="mb-4 md:mr-2 md:mb-0">
                                <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="password">
                                    Password
                                </label>
                                <input
                                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border border-red-500 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                    id="password"
                                    type="password"
                                    placeholder="******************"
                                />
                                <p className="text-xs italic text-red-500">Please choose a password.</p>
                            </div>
                            <div className="md:ml-2">
                                <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="c_password">
                                    Confirm Password
                                </label>
                                <input
                                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                    id="c_password"
                                    type="password"
                                    placeholder="******************"
                                />
                            </div>
                        </div>
                        <div className="mb-6 text-center">
                            <button
                                className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                                type="button"
                            >
                                Register Account
                            </button>
                        </div>
                        <hr className="mb-6 border-t" />
                        <div className="text-center">
                            <a
                                className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                                href="#"
                            >
                                Forgot Password?
                            </a>
                        </div>
                        <div className="text-center">
                            <a
                                className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                                href="./index.html"
                            >
                                Already have an account? Login!
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
	</body> */}