import {
  Button,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { Camera, CameraType } from "expo-camera";
import React, { useState } from "react";

export default function App() {
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [type, setType] = useState(CameraType.front);

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  if (!permission) {
    return <Text> no permission </Text>;
  }

  if (!permission.granted) {
    return (
      <Button onPress={() => requestPermission()} title="ask grant"></Button>
    );
  }

  return (
    <View style={styles.container}>
      <Text> pre camera </Text>
      <Camera style={styles.camera} type={type}></Camera>
      <Text> post camera </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  camera: {
    flex: 1,
  },
});
