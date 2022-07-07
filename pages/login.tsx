import { signInWithEmailAndPassword } from "firebase/auth";
import type { NextPage } from "next";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { auth } from "../lib/firebase";
import { toast } from "react-hot-toast";
import "../styles/Home.module.css";
import dynamic from "next/dynamic";
interface userForm {
  email: string;
  password: string;
  remember: boolean;
}

const Login: NextPage = () => {
  const { register, handleSubmit } = useForm<userForm>();
  const onSubmit = handleSubmit((data) => signInWithCredentials(data));
  const [showFrom, setShowForm] = useState(false);
  const renderModal = false;
  const SignInForm = dynamic(() => import("../components/signInForm"));

  return (
    <div>
      <SignInForm showForm={showFrom} setShowForm={setShowForm} />
      <div className="h-100 mt-24 flex flex-col justify-center">
        <div className="mx-auto w-[18rem] h-[4.5rem] bg-blue-500 rounded text-center flex justify-center items-center drop-shadow-2xl">
          <h1 className="h-auto text-[45px] font-bold text-white ">
            Task Easy
          </h1>
        </div>
        <div className="max-w-md w-full mx-auto mt-24">
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
                {...register("email", {
                  required: "Email Address is required",
                })}
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
                {...register("password", {
                  required: "Email Address is required",
                })}
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
                <a
                  href=""
                  className="font-medium text-sm text-blue-800 underline"
                >
                  Forgot Password
                </a>
              </div>
            </div>
            <div>
              <button className="w-full py-2 px-4 bg-blue-400 hover:bg-blue-500 rounded-full text-white text-sm">
                Login
              </button>
            </div>
            <div className="!mt-16">
              <button
                className="w-full py-2 px-4 bg-blue-400 hover:bg-blue-500 rounded-full text-white text-sm"
                type="button"
                onClick={() => setShowForm(true)}
              >
                Register Here
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

function signInWithCredentials(useForm: userForm) {
  const authPromise = signInWithEmailAndPassword(
    auth,
    useForm.email,
    useForm.password
  );
  toast.promise(authPromise, {
    loading: "Loading",
    success: "Success",
    error: "Invalid E-mail or Password",
  });
}

export default Login;
