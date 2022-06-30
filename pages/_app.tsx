import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useForm } from "react-hook-form";
import { useState } from "react";

interface userForm {
  email: string;
  password: string;
  remember: boolean;
}

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
