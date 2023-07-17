import { useState, useEffect } from "react";
import { StyleSheet, Text, Image, View } from "react-native";

import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../firebaseConfig";

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

  useEffect(() => {
    const unsubscribeFromAuthStatuChanged = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        setUser(user);
      } else {
        // User is signed out
        setUser(undefined);
      }
    });

    return unsubscribeFromAuthStatuChanged;
  }, []);

  return (
    <View style={styles.box}>
      {user ? (
        <View>
          <Text>current user : {user.email}</Text>
        </View>
      ) : (
        <Text> not signed in </Text>
      )}
    </View>
  );
}
