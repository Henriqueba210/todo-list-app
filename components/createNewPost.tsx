import { query, collection, where, orderBy } from "firebase/firestore";
import { useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { firestore, auth } from "../lib/firebase";

export default function PostList() {
  const ref = query(
    collection(firestore, "tasks"),
    where("userID", "==", auth.currentUser?.uid),
    orderBy("createdAt")
  );

  const [querySnapshot] = useCollection(ref);
  const [title, setTitle] = useState("");

  const isValid = title.length > 3 && title.length < 100;

  return <div></div>;
}
