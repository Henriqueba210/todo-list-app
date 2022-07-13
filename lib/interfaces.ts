interface FormStatus {
  showForm: boolean;
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
}

interface FirestoreUser {
  username: String | null;
  displayName: String | null;
}

interface FirestoreUsername {
  uid: String | null;
}

interface UserNameFormProps {
  username: string | null;
  isValid: boolean;
  loading: boolean;
}

export type { FormStatus, FirestoreUser, FirestoreUsername, UserNameFormProps };
