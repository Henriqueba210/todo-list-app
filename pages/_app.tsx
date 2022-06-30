import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useForm } from "react-hook-form";
import { useState } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  // return <Component {...pageProps} />;
  const [email, setEmail] = useState("");
  const { register, handleSubmit } = useForm();
  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <div>
      <div className="min-h-screen flex flex-col justify-center">
        <div className="max-w-md w-full mx-auto">
          <div className="text-center font-medium text-xl">something</div>
          <div className="text-3xl font-bold text-gray-900 mt-2 text-center">
            another text
          </div>
        </div>
        <div className="max-w-md w-full mx-auto mt-4 bg-white p-8 border border-gray-300">
          <form action="" className="space-y-6" onSubmit={onSubmit}>
            <div>
              <label
                htmlFor=""
                className="text-sm font-bold text-gray-600 block"
              >
                Email
              </label>
              <input
                type="text"
                {...register("email")}
                className="w-full p-2 border border-gray-300 hover:border-blue-300 focus:border-blue-400 rounded mt-1"
              />
            </div>
            <div>
              <label
                htmlFor=""
                className="text-sm font-bold text-gray-600 block"
              >
                Password
              </label>
              <input
                type="password"
                {...register("password")}
                className="w-full p-2 border border-gray-300 hover:border-blue-300 focus:border-blue-400 rounded mt-1"
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input type="checkbox" className="h-4 text-blue-400 rounded" />
                <label htmlFor="" className="ml-2 text-sm text-gray-600">
                  Remember Me
                </label>
              </div>
              <div>
                <a href="" className="font-medium text-sm text-blue-400">
                  Forgot Password
                </a>
              </div>
            </div>
            <div>
              <button className="w-full py-2 px-4 bg-blue-400 hover:bg-blue-500 rounded-md text-white text-sm">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default MyApp;
