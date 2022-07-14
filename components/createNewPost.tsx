import { setDoc, doc, addDoc, collection } from "firebase/firestore";
import { ref } from "firebase/storage";
import { Modal, Select, Textarea, TextInput } from "flowbite-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { firestore, auth, serverTimestamp } from "../lib/firebase";
import { FormStatus } from "../lib/interfaces";
import { task } from "./tasksList";

export default function CreateNewPost(formStatus: FormStatus) {
  async function addPost(data: task) {
    const uid = auth?.currentUser?.uid;
    console.log(uid);
    console.log(data);

    const taskToBeCreated = {
      title: data.title,
      description: data.description,
      status: data.status,
      userID: uid,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    } as task;

    await addDoc(collection(firestore, "tasks"), taskToBeCreated).then(() => {
      toast.success("Task Created!");
      formStatus.setShowForm(false);
      reset();
    });
  }

  let [userCreatedSucessefuly, setFormState] = useState(false);
  const { register, handleSubmit, reset } = useForm<task>();
  const onSubmit = handleSubmit((data) => addPost(data));

  return (
    <div>
      <Modal
        show={formStatus.showForm}
        onClose={() => formStatus.setShowForm(false)}
      >
        <Modal.Header>Create New Task</Modal.Header>
        <Modal.Body>
          <form action="" className="space-y-6" onSubmit={onSubmit}>
            <div>
              <label
                htmlFor=""
                className="text-sm font-bold text-gray-200 block"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                {...register("title")}
                required={true}
                className="w-full p-2 border border-gray-300 hover:border-blue-300 focus:border-blue-400 rounded mt-1"
              />
            </div>
            <div>
              <label
                htmlFor=""
                className="text-sm font-bold text-gray-200 block"
              >
                Description
              </label>
              <textarea
                rows={4}
                id="description"
                {...register("description")}
                required={true}
                className="w-full p-2 border border-gray-300 hover:border-blue-300 focus:border-blue-400 rounded mt-1"
              />
            </div>
            <div>
              <label
                htmlFor=""
                className="text-sm font-bold text-gray-200 block"
              >
                Status
              </label>
              <select
                {...register("status")}
                id="status"
                required={true}
                className="w-full p-2 border border-gray-300 hover:border-blue-300 focus:border-blue-400 rounded mt-1"
              >
                <option>To Do</option>
                <option>In Progress</option>
                <option>Completed</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <button className="w-full py-2 px-4 bg-blue-400 hover:bg-blue-500 rounded-full text-white text-sm">
                create
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
