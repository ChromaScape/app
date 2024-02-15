import { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, View, Button } from "react-native";

import { auth } from "../config/firebase";
import { API_ENDPOINT, Pattern } from "../config/api";
import styles from "../styles";

export default function ViewPatterns(prop: {
  onPatternChange: (d: Pattern[]) => void;
}) {
  const [message, setMessage] = useState("");
  const [patterns, setPatterns] = useState<Pattern[]>([]);

  useEffect(() => {
    refreshPatterns();
  }, []);

  async function refreshPatterns() {
    try {
      setMessage("loading");

      const idToken = await auth.currentUser?.getIdToken();

      if (!idToken) {
        setMessage("not logged in");
        return;
      }

      const res = await fetch(API_ENDPOINT + "/user/patterns", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: idToken,
        },
      });

      const patternsList = (await res.json()) as Pattern[];
      // console.log(patternsList);

      if (!patternsList.length) {
        setMessage("no patterns");
      } else {
        setMessage("");
      }

      setPatterns(patternsList);
      prop.onPatternChange(patternsList);
    } catch (e) {
      // console.log(e);
      setMessage("failed");
    }
  }

  return (
    <View style={styles.box}>
      <Text>patterns</Text>
      <Button onPress={refreshPatterns} title="refresh" />
      {patterns.map((p) => (
        <View key={p.id.toString()}>
          <Text>id: {p.id.toString()}</Text>
          <Text>content: {p.content}</Text>
        </View>
      ))}
      <Text> {message} </Text>
    </View>
  );
}
