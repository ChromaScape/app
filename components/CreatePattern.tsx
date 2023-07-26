import { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, View, Button } from "react-native";

import { auth } from "../config/firebase";
import { API_ENDPOINT, Pattern } from "../config/api";

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

export default function CreatePattern() {
  const [message, setMessage] = useState("");
  const [content, setContent] = useState("");


  async function createPattern() {
    try {
      setMessage("sending");

      const idToken = await auth.currentUser?.getIdToken();

      if (!idToken) {
        setMessage("not logged in");
        return;
      }

      const res = await fetch(API_ENDPOINT + "/user/pattern", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: idToken,
        },
        body: JSON.stringify({content})
      });

      setMessage("sent");
      
    } catch (e) {
      console.log(e);
      setMessage("failed");
    }
  }

  return (
    <View style={styles.box}>
      <Text>create pattern</Text>
      <Text> {message} </Text>
      <TextInput
          onChangeText={setContent}
          value={content}
          style={styles.input}
      />
      <Button onPress={createPattern} title="Create Pattern" />

      
    </View>
  );
}
