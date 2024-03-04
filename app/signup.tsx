import { useState } from "react";
import { StyleSheet, Text, TextInput, View, Button, Pressable } from "react-native";
import React from "react";
import { router} from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import { API_ENDPOINT, ApiUser } from "../config/api";

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
    <View style={styles.container}>
        <Text style={styles.signupTitle}>
            Sign up
        </Text>
        <Text style={styles.signupInfo}>
            A few quicks things to get started
        </Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          onChangeText={onChangeEmail}
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

      <Pressable style={styles.signupBlock} onPress={pushNewAccountCreds}>
        <Text style={styles.loginText}>
        Create Account
        </Text>
      </Pressable>
      <View style={styles.signupText}>
        <Text style={styles.signupInfo}>
        Already have an account? 
        </Text>
        <View style={styles.space}></View>
        <Pressable onPress ={() => router.push ("/login")}>
            <Text style={styles.login}>
            Log in
            </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    signupBlock: {
        backgroundColor: "#A7AFB2",
        padding: 10,
        borderRadius: 10,
        width: 200,
        marginBottom: 10
    }, 
    space: {
        width: 5,
    },
    signupText: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    container: {
        flex: 1,
        backgroundColor: "#FFE4C4",
        justifyContent: 'center',
        alignItems: 'center',
    },

    inputContainer: {
        backgroundColor: 'white',
        borderRadius: 25,
        padding: 10,
        width: '80%', 
        marginBottom: 15
    },

    loginText: {
        color: "white",
        fontSize: 16,
        textAlign: "center", 
        justifyContent: "center",
    },

    signupTitle: {
        color: "black",
        fontSize: 30,
        textAlign: "center", 
        justifyContent: "center",
        marginBottom: 20
    },

    signupInfo: {
      color: "black",
      fontSize: 15,
      textAlign: "center", 
      justifyContent: "center",
      marginBottom: 20
  },

    login: {
        color: "#74B3CE",
        fontSize: 15,
        textAlign: "center", 
        justifyContent: "center",
    },
  });