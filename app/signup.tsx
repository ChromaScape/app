import { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, View, Pressable } from "react-native";
import { Link, router } from "expo-router";
import React from "react";
import { useUser } from "../components/UserProvider";

export default function LogIn() {
  const [email, onChangeEmail] = useState("");
  const [password, onChangePassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { apiUser, user, idToken, requestCreateAccount } = useUser();

  useEffect(() => {
    if (apiUser && user && idToken) {
      router.push("/Devices");
    }
  }, [apiUser]);

  return (
    <View style={styles.container}>
      <Text style={styles.signupTitle}>Sign Up</Text>
      <Text style={styles.signupInfo}>A few quicks things to get started</Text>
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
        style={styles.signupBlock}
        onPress={() => {
          requestCreateAccount(email, password)
            .catch((e) => setErrorMessage(JSON.stringify(e)))
            .finally(() => setLoading(false));
          setLoading(true);
          // router.push("/Devices");
        }}
      >
        <Text style={styles.loginText}>Create Account</Text>
      </Pressable>
      <View style={styles.signupText}>
        <Text style={styles.signupInfo}>Already have an account?</Text>
        <View style={styles.space}></View>
        <Link href="/login" style={styles.login}>
          Log In
        </Link>
      </View>
      <Text> {loading ? "loading" : errorMessage} </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  signupBlock: {
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
    backgroundColor: "#FFE4C4",
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

  signupTitle: {
    color: "black",
    fontSize: 30,
    textAlign: "center",
    justifyContent: "center",
    marginBottom: 20,
  },

  signupInfo: {
    color: "black",
    fontSize: 15,
    textAlign: "center",
    justifyContent: "center",
    marginBottom: 20,
  },

  login: {
    color: "#74B3CE",
    fontSize: 15,
    textAlign: "center",
    justifyContent: "center",
  },
});
