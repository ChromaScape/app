import { useState } from "react";
import { StyleSheet, Text, TextInput, View, Button } from "react-native";
import React from "react";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";

import { API_ENDPOINT, ApiUser } from "../config/api";

import styles from "../styles";

export default function CreateAccount() {
  const [email, onChangeEmail] = useState("");
  const [password, onChangePassword] = useState("");

  async function pushNewAccountCreds() {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const idToken = await auth.currentUser?.getIdToken();
      if (!idToken) {
        throw new Error("not logged in somehow");
      }

      // console.log(idToken)

      const res = await fetch(API_ENDPOINT + "/user", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: idToken,
        },
      });

      const newUser = await res.text();
      // console.log(newUser);
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;

      console.error(error);
    }
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

      <Button onPress={pushNewAccountCreds} title="Create Account" />
    </View>
  );
}
