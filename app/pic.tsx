import { StatusBar } from "expo-status-bar";
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { Camera, CameraType, WhiteBalance } from "expo-camera";
import { Image } from "expo-image";
import { useRef, useState } from "react";
import React from "react";
import CameraGl from "../components/CameraGl";

export default function App() {
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [type, setType] = useState(CameraType.front);
  const cameraRef = useRef<Camera | null>(null);

  const [isPic, setIsPic] = useState(false);
  const [picInterval, setPicInterval] = useState<NodeJS.Timer | null>(null);

  const [imUri, setImUri] = useState("");

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  async function togglePic() {
    // const pic = await cameraRef?.current?.takePictureAsync();

    // console.log("taken");

    if (picInterval) {
      clearInterval(picInterval);
      setPicInterval(null);
    } else {
      const newInterval = setInterval(async () => {
        console.log("pre");
        const pic = await cameraRef?.current?.takePictureAsync({
          // isImageMirror: true,
          skipProcessing: true,
          onPictureSaved: (pic) => {
            console.log("post");

            if (pic?.uri) {
              setImUri(pic.uri);
            }
          },
        });
      }, 100); // 100ms is 10fps

      setPicInterval(newInterval);
    }
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
    <ScrollView style={styles.container}>
      <Text> refresh </Text>
      <Button title="take pic" onPress={togglePic}></Button>
      <Text> {picInterval ? "taking" : "not taking"}</Text>
      <Button title="toggle" onPress={toggleCameraType} />
      <Camera
        ref={cameraRef}
        style={styles.camera}
        type={type}
        // whiteBalance={WhiteBalance.shadow}
      ></Camera>
      <Image style={styles.image} source={imUri} contentFit="contain" />
      <Text> how</Text>
      <CameraGl />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
  },
  camera: {
    // flex: 1,
    height: 200,
  },
  image: {
    flex: 1,
    height: 200,
    backgroundColor: "#0553",
  },
});
function useEffect(arg0: () => () => void, arg1: never[]) {
  throw new Error("Function not implemented.");
}
