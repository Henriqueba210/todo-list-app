import { doc, onSnapshot } from "firebase/firestore";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "./firebase";

export function useUserData() {
  const [user, isLoading] = useAuthState(auth);
  const [username, setUsername] = useState<string | null | undefined>(
    undefined
  );
  const router = useRouter();

  useEffect(() => {
    let unsubscribe;
    if (user && !isLoading) {
      const ref = doc(firestore, "users", user.uid);

      unsubscribe = onSnapshot(ref, (doc) => {
        console.log(doc.data()?.username);
        setUsername(doc.data()?.username);
      });
    } else if (!isLoading && user !== undefined) {
      console.log("No user");
      setUsername(null);
      // router.replace("/login");
    }
    return unsubscribe;
  }, [user]);

  return { user, username };
}
