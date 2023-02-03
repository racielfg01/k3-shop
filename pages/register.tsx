import Link from "next/link";

const Register = () => {


  return (
    <div
      className="flex flex-wrap min-h-screen w-full content-center 
    justify-center bg-theme py-10"
    >
      {/* //<!-- Login component --> */}
      <div className="flex shadow-md  ">
        {/* //<!-- Login banner --> */}
        <div
          className="flex flex-wrap content-center justify-center rounded-l-md"
          style={{ width: "24rem", height: "32rem" }}
        >
          <div className="absolute mt-8 ">
            {/* //<!-- Heading --> */}
            <h1 className="text-xl font-semibold ">Crea una Cuenta!</h1>
            <small className="text-gray-900">
              Por favor rellene los siguientes datos
            </small>
          </div>

          <img
            className="w-full h-full bg-center bg-no-repeat bg-cover rounded-l-md"
            src="/assests/register-image.jpeg"
          />
        </div>

        {/* //<!-- Login form --> */}
        <div
          className="flex flex-wrap content-center justify-center rounded-r-md bg-white "
          style={{ width: "24rem", height: "32rem" }}
        >
          <div className="w-72 ">
       

            {/* //<!-- Form --> */}
            <form className="mt-4">
              <div className="mb-3">
                <label className="mb-2 block text-xs font-semibold">
                  Nombre
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="block w-full rounded-md border border-gray-300 focus:border-blue-700 
                 focus:outline-none focus:ring-1 focus:ring-blue-700 py-1 px-1.5 text-gray-500"
                />
              </div>
              <div className="mb-3">
                <label className="mb-2 block text-xs font-semibold">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="block w-full rounded-md border border-gray-300 focus:border-blue-700 
                 focus:outline-none focus:ring-1 focus:ring-blue-700 py-1 px-1.5 text-gray-500"
                />
              </div>
              <div className="mb-3">
                <label className="mb-2 block text-xs font-semibold">
                  Contraseña
                </label>
                <input
                  type="password"
                  placeholder="*****"
                  className="block w-full rounded-md border
                 border-gray-300 focus:border-blue-700 focus:outline-none focus:ring-1
                  focus:ring-blue-700 py-1 px-1.5 text-gray-500"
                />
              </div>{" "}
              <div className="mb-3">
                <label className="mb-2 block text-xs font-semibold">
                  Confirmar Contraseña
                </label>
                <input
                  type="password"
                  placeholder="*****"
                  className="block w-full rounded-md border
                 border-gray-300 focus:border-blue-700 focus:outline-none focus:ring-1
                  focus:ring-blue-700 py-1 px-1.5 text-gray-500"
                />
              </div>
              <div className="mb-3 flex flex-wrap content-center">
                <input
                  id="remember"
                  type="checkbox"
                  className="mr-1 checked:bg-blue-700"
                />
                <label
                  htmlFor="remember"
                  className="mr-auto text-xs font-semibold"
                >
                 Acepto los términos y condiciones.
                </label>
              
              </div>
              <div className="mb-3">
                <button
                  className="mb-1.5 block w-full text-center text-white bg-blue-700
                 hover:bg-blue-900 px-2 py-1.5 rounded-md"
                >
                  Registrarse
                </button>
                <button
                  className="flex flex-wrap justify-center w-full border border-gray-300
                 hover:border-gray-500 px-2 py-1.5 rounded-md"
                >
                  <img
                    className="w-5 mr-2"
                    src="https://lh3.googleusercontent.com/COxitqgJr1sJnIDe8-jiKhxDx1FrYbtRHKJ9z_hELisAlapwE9LUPh6fcXIfb5vwpbMl4xl9H9TRFPc5NOO8Sb3VSgIBrfRYvW6cUA"
                  />
                  Registrarse con Google
                </button>
              </div>
            </form>

            {/* //<!-- Footer --> */}
            <div className="text-center">
              <span className="text-xs text-gray-400 font-semibold">
                Ya tienes una cuenta
              </span>
              <Link href={'/login'}>
              <button  className="text-xs font-semibold text-blue-700 ml-5">
                Entrar
              </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

