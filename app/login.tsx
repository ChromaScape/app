import { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, View, Pressable } from "react-native";
import { router } from "expo-router";
import React from "react";
import { useUser } from "../components/UserProvider";

export default function LogIn() {
  const [email, onChangeEmail] = useState("");
  const [password, onChangePassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { apiUser, user, idToken, requestLogIn } = useUser();

  useEffect(() => {
    if (apiUser && user && idToken) {
      router.push("/Devices");
    }
  }, [apiUser]);

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
          autoCapitalize="none"
          autoComplete="email"
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Password"
          onChangeText={onChangePassword}
          value={password}
          style={styles.loginText}
          autoCapitalize="none"
          autoComplete="password"
        />
      </View>
      <Pressable
        style={styles.loginBlock}
        onPress={() => {
          requestLogIn(email, password)
            .catch((e) => setErrorMessage(JSON.stringify(e)))
            .finally(() => setLoading(false));
          setLoading(true);
          // router.push("/Devices");
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
      <Text> {loading ? "loading" : errorMessage} </Text>
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
    color: "black",
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
