import "../styles/globals.css";
import "../styles/App.css";

import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import Store from "../contexts/Store.js";
import { Toaster } from "react-hot-toast";


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={Store}>
      <Toaster position="top-center" reverseOrder={false} />
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
