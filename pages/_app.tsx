import "../styles/globals.css";
import type { AppProps } from "next/app";
import { UserContext } from "../lib/context";
import { Toaster } from "react-hot-toast";
import AppNavbar from "../components/appNavbar";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserContext.Provider value={{ user: null, username: "tester" }}>
      <AppNavbar />
      <Component {...pageProps} />
      <Toaster />
    </UserContext.Provider>
  );
}

export default MyApp;
