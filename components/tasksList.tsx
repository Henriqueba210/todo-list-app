import { onAuthStateChanged } from "firebase/auth";
import {
  query,
  collection,
  where,
  orderBy,
  DocumentData,
  QueryDocumentSnapshot,
  Query,
  deleteDoc,
  Timestamp,
} from "firebase/firestore";
import { Button, Card, Label } from "flowbite-react";
import ButtonGroup from "flowbite-react/lib/esm/components/Button/ButtonGroup";
import { useContext, useEffect, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import toast from "react-hot-toast";
import { UserContext } from "../lib/context";
import { firestore, auth, getCurrentUser } from "../lib/firebase";

type props = {
  query: Query<DocumentData>;
};

export function TasksList({ query }: props) {
  const [querySnapshot] = useCollection(query);
  useEffect(() => {
    console.log(query);
    console.log(querySnapshot?.docs);
  });

  return (
    <>
      <div className="flex items-center justify-center flex-col pt-24 ">
        {querySnapshot?.docs?.map((task) => (
          <TaskItem taskDocument={task} key={(task.data() as task).title} />
        )) ?? null}
      </div>
    </>
  );
}

export type taskQueryDocument = {
  taskDocument: QueryDocumentSnapshot<DocumentData>;
};

export enum status {
  toDo = "To Do",
  inProgress = "In Progress",
  completed = "Completed",
}

export interface task {
  title: string;
  description: string;
  status: status;
  userID: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export function TaskItem({ taskDocument }: taskQueryDocument) {
  const taskData: task | undefined = taskDocument.data() as task;

  return (
    <>
      <Card className="w-fit px-12 mb-6">
        <label className="text-m font-bold text-gray-200 block">Title</label>
        <h3 className="text-xl bold dark:text-white">{taskData.title}</h3>

        <label className="text-m font-bold text-gray-200 block">
          Description
        </label>
        <p className="dark:text-white">{taskData.description}</p>

        <label className="text-m font-bold text-gray-200 block">Status</label>
        <p className="dark:text-white">({taskData.status})</p>
        <div className="flex justify-between">
          <Button color="yellow" className="mr-3">
            Modify Task
          </Button>
          <Button
            color="red"
            onClick={() => {
              deleteDoc(taskDocument.ref);
              toast.success("Task Deleted Successfully!");
            }}
          >
            Delete Task
          </Button>
        </div>
      </Card>
    </>
  );
}
