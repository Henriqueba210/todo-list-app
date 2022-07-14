import {
  collection,
  collectionGroup,
  doc,
  DocumentData,
  getDocs,
  orderBy,
  Query,
  query,
  where,
} from "firebase/firestore";
import type { NextPage } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import AddButton from "../components/addButton";
import { UserContext } from "../lib/context";
import { auth, firestore } from "../lib/firebase";
import "../styles/Home.module.css";
import { useCollection } from "react-firebase-hooks/firestore";
import { TasksList } from "../components/tasksList";
import { Spinner } from "flowbite-react";
import CreateNewPost from "../components/createNewPost";

const Dashboard: NextPage = () => {
  const [showUserNameForm, setShowUsernameForm] = useState(false);
  const [showCreateNewPostForm, setShowCreateNewPostForm] = useState(false);
  const { user, username } = useContext(UserContext);
  const UserNameForm = dynamic(() => import("../components/userNameForm"));
  const [taskQuery, setQuery] = useState<Query<DocumentData>>();

  useEffect(() => {
    if (username === null && user) {
      console.log(username);

      setShowUsernameForm(true);
    }
    if (user) {
      console.log(user.uid);
      setQuery(
        query(collection(firestore, "tasks"), where("userID", "==", user?.uid))
      );
    }
  }, [username, user]);

  return (
    <div className="min-h-screen dark:bg-gray-900">
      <UserNameForm
        showForm={showUserNameForm}
        setShowForm={setShowUsernameForm}
      ></UserNameForm>
      {taskQuery !== undefined ? (
        <TasksList query={taskQuery} />
      ) : (
        <Spinner size={"lg"} />
      )}
      <CreateNewPost
        showForm={showCreateNewPostForm}
        setShowForm={setShowCreateNewPostForm}
      />
      <AddButton onClickHandler={() => setShowCreateNewPostForm(true)} />
    </div>
  );
};

export default Dashboard;
