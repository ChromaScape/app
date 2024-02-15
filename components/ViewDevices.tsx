import { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, View, Button } from "react-native";

import { auth } from "../config/firebase";
import { API_ENDPOINT, Device } from "../config/api";

import styles from "../styles";

export default function ViewDevices(prop: {
  onDeviceChange: (d: Device[]) => void;
}) {
  const [message, setMessage] = useState("");
  const [devices, setDevices] = useState<Device[]>([]);

  useEffect(() => {
    refreshDevices();
  }, []);

  async function refreshDevices() {
    try {
      setMessage("loading");

      const idToken = await auth.currentUser?.getIdToken();

      if (!idToken) {
        setMessage("not logged in");
        return;
      }

      const res = await fetch(API_ENDPOINT + "/user/devices", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: idToken,
        },
      });

      const devicesList = (await res.json()) as Device[];
      // console.log(devicesList);

      if (!devicesList.length) {
        setMessage("no devices");
      } else {
        setMessage("");
      }

      setDevices(devicesList);
      prop.onDeviceChange(devicesList);
    } catch (e) {
      // console.log(e);
      setMessage("failed");
    }
  }

  return (
    <View style={styles.box}>
      <Text>devices</Text>
      <Button onPress={refreshDevices} title="refresh" />
      {devices.map((d) => (
        <View key={d.id.toString()}>
          <Text>id: {d.id.toString()}</Text>
          <Text>pattern: {d.patternId?.toString()}</Text>
        </View>
      ))}
      <Text> {message} </Text>
    </View>
  );
}
