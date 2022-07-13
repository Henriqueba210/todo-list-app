import { User } from "firebase/auth";
import { createContext } from "react";

export interface AppUser {
  user: User | null | undefined;
  username: string | null | undefined;
}

export const UserContext = createContext<AppUser>({
  user: undefined,
  username: undefined,
});
