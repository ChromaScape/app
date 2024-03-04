import { StatusBar } from "expo-status-bar";
import { Link, router, Stack } from "expo-router";
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Pressable,
} from "react-native";

import { Camera, CameraType, WhiteBalance } from "expo-camera";
import { Image } from "expo-image";
import { useRef, useState } from "react";
import React from "react";
import CameraGl from "../components/CameraGl";

const configuration_video = () => {
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
    <View style={styles.container}>
          <Stack.Screen
        options={{
          title: 'Configuration',
          headerStyle: {
            backgroundColor: '#74B3CE',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: '400', 
          },
        }}
      />
      <Camera
        ref={cameraRef}
        style={styles.camera}
        type={type}
        // whiteBalance={WhiteBalance.shadow}
      ></Camera>
      <View style={styles.captureContainer}>
      <Pressable style={styles.captureBlock} onPress={toggleCameraType}>
          <Text style={styles.captureText}>Toggle Camera</Text>
        </Pressable>
        <Pressable style={styles.captureBlock} onPress={togglePic}>
          <Text style={styles.captureText}>Capture Frames</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  captureContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: 'row',
  },
  camera: {
    // flex: 1,
    height: 600,
    borderRadius: 5,
  },
  image: {
    flex: 1,
    backgroundColor: "#0553",
  },
  captureBlock: {
    backgroundColor: "#A7AFB2",
    width:"50%",
    maxWidth: 180,
    padding: 50,
    marginHorizontal: 10,
    borderRadius: 8, 
  },
  captureText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
});
function useEffect(arg0: () => () => void, arg1: never[]) {
  throw new Error("Function not implemented.");
}

export default configuration_video;
