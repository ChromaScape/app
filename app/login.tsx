import { useState } from "react";
import { StyleSheet, Text, TextInput, View, Pressable } from "react-native";
import { router } from "expo-router";
import React from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";

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
    <View style={styles.container}>
      <Text style={styles.loginTitle}>Login</Text>
      <Text style={styles.loginInfo}>Welcome to ChromaScape</Text>
      <View style={styles.inputContainer}>
        <TextInput
          onChangeText={onChangeEmail}
          placeholder="Email"
          value={email}
          style={styles.loginText}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Password"
          onChangeText={onChangePassword}
          value={password}
          style={styles.loginText}
        />
      </View>

      <Pressable
        style={styles.loginBlock}
        onPress={() => {
          LogInWithAccountCreds();
          router.push("/Devices");
        }}
      >
        <Text style={styles.loginText}>Log in</Text>
      </Pressable>
      <View style={styles.signupText}>
        <Text style={styles.loginInfo}>Don't have an account?</Text>
        <View style={styles.space}></View>
        <Pressable onPress={() => router.push("/signup")}>
          <Text style={styles.signup}>Sign up</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  loginBlock: {
    backgroundColor: "#A7AFB2",
    padding: 10,
    borderRadius: 10,
    width: 200,
    marginBottom: 10,
  },
  space: {
    width: 5,
  },
  signupText: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  container: {
    flex: 1,
    backgroundColor: "#74B3CE",
    justifyContent: "center",
    alignItems: "center",
  },

  inputContainer: {
    backgroundColor: "white",
    borderRadius: 25,
    padding: 10,
    width: "80%",
    marginBottom: 15,
  },

  loginText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    justifyContent: "center",
  },

  loginTitle: {
    color: "white",
    fontSize: 30,
    textAlign: "center",
    justifyContent: "center",
    marginBottom: 20,
  },

  loginInfo: {
    color: "white",
    fontSize: 15,
    textAlign: "center",
    justifyContent: "center",
    marginBottom: 20,
  },

  signup: {
    color: "#FFE4C4",
    fontSize: 15,
    textAlign: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
});
