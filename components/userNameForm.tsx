import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, writeBatch } from "firebase/firestore";
import { Button, Modal, Spinner, TextInput } from "flowbite-react";
import { debounce } from "lodash";
import { FormEvent, useCallback, useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { UserContext } from "../lib/context";
import { auth, firestore } from "../lib/firebase";
import {
  FirestoreUser,
  FirestoreUsername,
  FormStatus,
  UserNameFormProps,
} from "../lib/interfaces";

export default function UserNameForm(formStatus: FormStatus) {
  const [formValue, setFormValue] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [loading, setIsLoading] = useState(false);

  const { user, username } = useContext(UserContext);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

    if (val.length < 3) {
      setFormValue(val);
      setIsLoading(false);
      setIsValid(false);
    }

    if (re.test(val)) {
      setFormValue(val);
      setIsLoading(true);
      setIsValid(false);
    }
  };

  const onSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userDoc = doc(firestore, `users/${user!.uid}`);
    const usernameDoc = doc(firestore, `usernames/${formValue}`);

    const batch = writeBatch(firestore);

    batch.set(userDoc, {
      username: formValue,
      displayName: user?.displayName,
    } as FirestoreUser);
    batch.set(usernameDoc, { uid: user?.uid } as FirestoreUsername);

    await batch.commit();
  };

  function UsernameMessage({ username, isValid, loading }: UserNameFormProps) {
    if (loading) {
      return (
        <div className="text-center mb-4">
          <Spinner size={"lg"} />
        </div>
      );
    } else if (isValid) {
      return (
        <p className="text-lg text-green-500 mb-4">{username} is available!</p>
      );
    } else if (username!.length > 2 && !isValid) {
      return <p className="text-lg text-amber-300 mb-4">Username is taken!</p>;
    } else {
      return null;
    }
  }

  const checkUsername = useCallback(
    debounce(async (username: string) => {
      console.log("debounce chamado");
      if (username.length >= 3) {
        const ref = doc(firestore, `usernames/${username}`);
        const teste = await getDoc(ref);
        console.log("Firestore read executed");
        console.log(!teste.exists());
        setIsValid(!teste.exists());
        setIsLoading(false);
      }
    }, 500),
    []
  );

  useEffect(() => {
    console.log("effect chamado");
    checkUsername(formValue);
  }, [formValue, checkUsername]);

  return (
    <div>
      <Modal
        show={formStatus.showForm}
        size="md"
        popup={true}
        onClose={() => formStatus.setShowForm(false)}
      >
        <Modal.Body>
          <div className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8 pt-8">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
              Choose Username
            </h3>
            <form onSubmit={onSubmit} autoComplete="off">
              <TextInput
                name="username"
                placeholder="Username"
                value={formValue}
                onChange={onChange}
                className="dark:!border-gray-500 dark:!bg-gray-600 mb-4"
              ></TextInput>

              <UsernameMessage
                username={formValue}
                isValid={isValid}
                loading={loading}
              ></UsernameMessage>
              <Button
                type="submit"
                disabled={!isValid}
                color={"green"}
                pill={true}
              >
                Choose
              </Button>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
