import "../styles/globals.css";
import type { AppProps } from "next/app";
import { UserContext } from "../lib/context";
import { Toaster } from "react-hot-toast";
import AppNavbar from "../components/appNavbar";
import { useUserData } from "../lib/hooks";
import { DarkThemeToggle, Flowbite } from "flowbite-react";

function MyApp({ Component, pageProps }: AppProps) {
  const userData = useUserData();

  return (
    <Flowbite>
      <UserContext.Provider value={userData}>
        <AppNavbar />
        <Component {...pageProps} />
        <Toaster />
      </UserContext.Provider>
    </Flowbite>
  );
}

export default MyApp;
