import Item from "./utils/ItemMercado";

// endpoint: { productos } 

const Ventas = ({ ifExists,productos }) => {
  return (
    <>
      <div className="nike-container">
        <div
          className={`grid items-center justify-items-center gap-3 lg:gap-5 mt-7 
        ${
          ifExists
            ? "grid-cols-3 xl:grid-cols-2 sm:grid-cols-1"
            : "grid-cols-4 xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1"
        }`}
        >
          {productos?.items?.map((item, i) => (
            <Item {...item} key={i} ifExists={ifExists} />
          ))}
        </div>
        {/* <!-- component -->
<!-- This is an example component --> */}
        {/* <div className=" mx-auto mt-10">
          <nav aria-label="Page navigation example">
            <ul className="inline-flex -space-x-px">
              <li>
                <a
                  href="#"
                  className="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 ml-0 rounded-l-lg leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  Atrás
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  1
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  2
                </a>
              </li>
              <li>
                <a
                  href="#"
                  aria-current="page"
                  className="bg-blue-50 border border-gray-300 text-blue-600 hover:bg-blue-100 hover:text-blue-700  py-2 px-3 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                >
                  3
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  4
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  5
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 rounded-r-lg leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  Siguiente
                </a>
              </li>
            </ul>
          </nav>
        
        </div> */}
      </div>
    </>
  );
};

export default Ventas;
