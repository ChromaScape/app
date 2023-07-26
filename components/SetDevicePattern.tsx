import { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, View, Button } from "react-native";

import { auth } from "../config/firebase";
import { API_ENDPOINT, Pattern, Device } from "../config/api";

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

export default function SetDevicePattern(prop: {
  patterns: Pattern[];
  devices: Device[];
}) {
  const [message, setMessage] = useState("");

  const [currentPattern, setCurrentPattern] = useState<Pattern | undefined>();
  const [currentDevice, setCurrentDevice] = useState<Device | undefined>();

  async function setDevicePattern() {
    try {
      setMessage("loading");

      const idToken = await auth.currentUser?.getIdToken();

      if (!idToken) {
        setMessage("not logged in");
        return;
      }

      if (!currentDevice || !currentPattern) {
        setMessage("not selected");
        return;
      }

      const res = await fetch(API_ENDPOINT + "/user/device_pattern", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: idToken,
        },
        body: JSON.stringify({
          device_id: currentDevice.id.toString(),
          pattern_id: currentPattern.id.toString(),
        }),
      });

      if(res.status == 200){
        setMessage("success")
      } else {
        setMessage("wrong response")
        console.log(await res.text())
      }
    } catch (e) {
      console.log(e);
      setMessage("failed");
    }
  }

  return (
    <View style={styles.box}>
      <Text>apply pattern to device</Text>
      <Text>select device</Text>
      {prop.devices.map((d) => (
        <View key={d.id.toString()}>
          <Text>{d.id.toString()}</Text>
          <Button onPress={() => setCurrentDevice(d)} title="select" />
        </View>
      ))}
      <Text>select pattern</Text>
      {prop.patterns.map((p) => (
        <View key={p.id.toString()}>
          <Text>{p.id.toString()}</Text>
          <Button onPress={() => setCurrentPattern(p)} title="select" />
        </View>
      ))}
      <Text>currently selected pattern: {currentPattern?.id.toString()}</Text>
      <Text>currently selected device: {currentDevice?.id.toString()}</Text>

      <Button onPress={setDevicePattern} title={"apply pattern"} />
      <Text> {message} </Text>
    </View>
  );
}
