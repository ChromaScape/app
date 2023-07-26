import { useState, useEffect } from "react";
import { StyleSheet, Text, Image, View, Button } from "react-native";

import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../config/firebase";
import { API_ENDPOINT, ApiUser } from "../config/api";

const styles = StyleSheet.create({
  input: {
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: 200,
  },
  box: {
    borderWidth: 1,
    padding: 10,
  },
});

export default function CreateAccount() {
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
        
      } else {
        // User is signed out
        setUser(undefined);
        setIdToken("");
      }
    });

    return unsubscribeFromAuthStatuChanged;
  }, []);

  useEffect(() => {
    getUserFromDb()
  }, [])


  async function getUserFromDb() {
    try {

      const idToken = await auth.currentUser?.getIdToken();
      console.log(idToken)
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
      setApiUser(retUser)
      
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <View style={styles.box}>
      {user ? (
        <View>
          <Text>current user : {user.email}</Text>
          <Text>firebase id : {user.uid}</Text>
          <Text>db id : {apiUser?.id.toString()}</Text>
          <Text>id token : {idToken}</Text>
          <Button onPress={() => console.log(idToken)} title="log token"/>
        </View>
      ) : (
        <Text> not signed in </Text>
      )}
    </View>
  );
}
