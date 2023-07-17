import { useState } from "react";
import { StyleSheet, Text, TextInput, View, Button } from "react-native";

import { createUserWithEmailAndPassword } from "firebase/auth";
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
  const [email, onChangeEmail] = useState("");
  const [password, onChangePassword] = useState("");

  async function pushNewAccountCreds() {
    return createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
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

      <Button onPress={pushNewAccountCreds} title="Create Account" />
    </View>
  );
}
