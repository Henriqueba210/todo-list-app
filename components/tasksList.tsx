import {
  query,
  collection,
  where,
  orderBy,
  deleteDoc,
  DocumentData,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import { useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { firestore, auth } from "../lib/firebase";

export function TasksList() {
  const ref = query(
    collection(firestore, "tasks"),
    where("userID", "==", auth.currentUser?.uid),
    orderBy("createdAt")
  );

  const [querySnapshot] = useCollection(ref);

  const tasks = querySnapshot?.docs;

  tasks?.forEach((item) => console.log(item));

  return <></>;
}

export type tasks = {
  taskDocument: QueryDocumentSnapshot<DocumentData>;
};

export enum status {
  toDo = "To Do",
  inProgress = "In Progress",
  completed = "Completed",
}

export type task = {
  title: string;
  description: string;
  status: status;
};

export function TaskItem({ taskDocument }: tasks) {}
