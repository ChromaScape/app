import { useState } from "react";
import { StyleSheet, Text, TextInput, View, Button } from "react-native";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";

import styles from "../styles";
import React from "react";

export default function LogIn() {
  const [email, onChangeEmail] = useState("");
  const [password, onChangePassword] = useState("");

  async function LogInWithAccountCreds() {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }

  return (
    <View style={styles.box}>
      <View>
        <Text>Email</Text>
        <TextInput
          onChangeText={onChangeEmail}
          value={email}
          style={styles.input}
        />
      </View>
      <View>
        <Text>Password</Text>
        <TextInput
          onChangeText={onChangePassword}
          value={password}
          style={styles.input}
        />
      </View>

      <Button onPress={LogInWithAccountCreds} title="Log In" />
    </View>
  );
}
