import {
  useState,
  useEffect,
  createContext,
  useCallback,
  useContext,
} from "react";
import { StyleSheet, Text, Image, View, Button } from "react-native";

import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";
import { auth } from "../config/firebase";
import { API_ENDPOINT, ApiUser } from "../config/api";

import styles from "../styles";
import React from "react";
import { setStatusBarHidden } from "expo-status-bar";

export interface UserContextProps {
  user: User | undefined;
  idToken: string;
  apiUser: ApiUser | undefined;
  requestLogIn: (email: string, password: string) => Promise<void>;
  requestLogOut: () => Promise<void>;
  requestCreateAccount: (email: string, password: string) => Promise<void>;
}

export const UserContext = createContext<UserContextProps>({
  user: undefined,
  idToken: "",
  apiUser: undefined,
  requestLogIn: async (..._) => {},
  requestLogOut: async (..._) => {},
  requestCreateAccount: async (..._) => {},
});

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>();
  const [idToken, setIdToken] = useState("");
  const [apiUser, setApiUser] = useState<ApiUser | undefined>();

  useEffect(() => {
    const unsubscribeFromAuthStatuChanged = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        setUser(user);
        user.getIdToken().then(setIdToken);
        getUserFromDb();
      } else {
        // User is signed out
        setUser(undefined);
        setIdToken("");
      }
    });

    return unsubscribeFromAuthStatuChanged;
  }, []);

  async function logInWithAccountCreds(email: string, password: string) {
    await signInWithEmailAndPassword(auth, email, password);
  }

  async function performSignOut() {
    await signOut(auth);
  }

  async function pushNewAccountCreds(email: string, password: string) {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const idToken = await auth.currentUser?.getIdToken();
    if (!idToken) {
      throw new Error("not logged in somehow");
    }

    await fetch(API_ENDPOINT + "/user", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: idToken,
      },
    });
  }

  async function getUserFromDb() {
    try {
      const idToken = await auth.currentUser?.getIdToken();
      // console.log(idToken);
      if (!idToken) {
        return;
      }

      const res = await fetch(API_ENDPOINT + "/user", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: idToken,
        },
      });

      const retUser = (await res.json()) as ApiUser;
      setApiUser(retUser);
    } catch (e) {
      // console.log(e);
    }
  }

  return (
    <UserContext.Provider
      value={{
        user,
        idToken,
        apiUser,
        requestLogIn: logInWithAccountCreds,
        requestLogOut: performSignOut,
        requestCreateAccount: pushNewAccountCreds,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => {
  return useContext(UserContext);
};
