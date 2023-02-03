import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectTotalQTY, setOpenCart } from "../contexts/CartSlice.js";


import {
  HeartIcon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  ArrowRightOnRectangleIcon
} from "@heroicons/react/24/outline";
import logo from "../public/assests/logo.png";
import Image from "next/image.js";
import Link from "next/link.js";
import NavbarCuenta from "./NavbarCuenta.jsx";

const Navbar = () => {
  const [navState, setNavState] = useState(false);
  const dispatch = useDispatch();
  const totalQTY = useSelector(selectTotalQTY);

  const onCartToggle = () => {
    dispatch(
      setOpenCart({
        cartState: true,
      })
    );
  };

  const onNavScroll = () => {
    if (window.scrollY > 30) {
      setNavState(true);
    } else {
      setNavState(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", onNavScroll);

    return () => {
      window.removeEventListener("scroll", onNavScroll);
    };
  }, []);

  
  return (
    <>
      <header
        className={
          !navState
            ? "absolute top-2 left-0 right-0 opacity-100 z-50"
            : "fixed top-0 left-0 right-0 h-[9vh] flex items-center justify-center opacity-100 z-[200] blur-effect-theme"
        }
      >
        <nav className="flex items-center justify-between nike-container">

          <div className="flex items-center">
            <div className="hidden sm:visible">

        <button
                id="toggleSidebarMobile"
                aria-expanded="true"
                aria-controls="sidebar"
                className="lg:hidden mr-2 text-gray-600 hover:text-gray-900 
                cursor-pointer p-2 hover:bg-gray-100 focus:bg-gray-100 
                focus:ring-2 focus:ring-gray-100 rounded"
              >
                <svg
                  id="toggleSidebarMobileHamburger"
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <svg
                  id="toggleSidebarMobileClose"
                  className="w-6 h-6 hidden"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
        </button>
            </div>
        <Link href={'/'}>

            <Image
              src={logo}
              alt="logo/img"
              className={`w-20 h-auto ${navState && "filter brightness-0"}`}
            />
          </Link>
          </div>
          <ul className="flex items-center justify-center gap-2">
            <li className="grid items-center">
              <MagnifyingGlassIcon
                className={`icon-style ${
                  navState && "text-slate-900 transition-all duration-300"
                }`}
              />
            </li>
            {/* <li className="grid items-center">
              <HeartIcon
                className={`icon-style ${
                  navState && "text-slate-900 transition-all duration-300"
                }`}
              />
            </li> */}
            <li className="grid items-center">
              <button
                type="button"
                onClick={onCartToggle}
                className="border-none outline-none active:scale-110 transition-all duration-300 relative"
              >
                <ShoppingBagIcon
                  className={`icon-style ${
                    navState && "text-slate-900 transition-all duration-300"
                  }`}
                />
                <div
                  className={`absolute top-4 right-0 shadow w-4 h-4 text-[0.65rem] 
                  leading-tight font-medium rounded-full flex items-center
                   justify-center cursor-pointer hover:scale-110 transition-all duration-300 ${
                    navState
                      ? "bg-slate-900 text-slate-100 shadow-slate-900"
                      : "bg-slate-100 text-slate-900 shadow-slate-100"
                  }`}
                >
                  {totalQTY}
                </div>
              </button>
            </li>
            <li className="grid items-center">
              <a
                href={"#"}
                className="flex items-center"
                target={"_blank"}
                role="button"
              >
                <button
                  type="button"
           
                >
                <ArrowRightOnRectangleIcon   className={`icon-style ${
                    navState && "text-slate-900 transition-all duration-300"
                  }`}
                />
                </button>
              </a>
            </li>
            {/* <li className="grid items-center">
              <a
                href={"#"}
                className="flex items-center"
                target={"_blank"}
                role="button"
              >
                <Link href={"/register"}>
                <button
                  type="button"
                  className={`button-theme
                  ${    navState
                    ? "bg-slate-900 text-slate-100 shadow-slate-900"
                    : "bg-slate-100 text-slate-900 shadow-slate-100"
                  }
                      py-1.5 px-2`}>
                  Registrarse
                </button>
                    </Link>
              </a>
            </li> */}
            <li>
            <NavbarCuenta/>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
