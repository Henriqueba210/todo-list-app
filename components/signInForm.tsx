import { createUserWithEmailAndPassword } from "firebase/auth";
import { Modal } from "flowbite-react";
import { NextPage } from "next";
import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { auth } from "../lib/firebase";

export interface FormStatus {
  showForm: boolean;
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
}

interface RegisterForm {
  email: string;
  password: string;
}

export const SignInForm: NextPage<FormStatus> = (formStatus: FormStatus) => {
  let [userCreatedSucessefuly, setFormState] = useState(false);
  const { register, handleSubmit } = useForm<RegisterForm>();
  const onSubmit = handleSubmit((data) => registerUser(data));

  function registerUser(registerForm: RegisterForm) {
    createUserWithEmailAndPassword(
      auth,
      registerForm.email,
      registerForm.password
    )
      .then(() => {
        toast.success("Registration Success");
        formStatus.setShowForm(false);
        setFormState(true);
      })
      .catch((error) => {
        toast.error("Registration Error");
        console.error(error);
        setFormState(false);
      });
  }

  return (
    <React.Fragment>
      <Toaster />
      <Modal
        show={formStatus.showForm}
        onClose={() => formStatus.setShowForm(false)}
      >
        <Modal.Header>Register</Modal.Header>
        <Modal.Body>
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
              <button className="w-full py-2 px-4 bg-blue-400 hover:bg-blue-500 rounded-full text-white text-sm">
                Register
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};
