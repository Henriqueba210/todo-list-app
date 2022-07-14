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

const Dashboard: NextPage = () => {
  const [showForm, setShowForm] = useState(false);
  const { user, username } = useContext(UserContext);
  const UserNameForm = dynamic(() => import("../components/userNameForm"));

  useEffect(() => {
    if (username === null && user) {
      console.log(username);

      setShowForm(true);
    }
  }, [username]);

  return (
    <div className="min-h-screen dark:bg-gray-900">
      <UserNameForm
        showForm={showForm}
        setShowForm={setShowForm}
      ></UserNameForm>
      <AddButton />
    </div>
  );
};

export default Dashboard;
