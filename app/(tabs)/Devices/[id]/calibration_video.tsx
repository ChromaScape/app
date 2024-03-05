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
  Image,
} from "react-native";

import { Camera, CameraType, ImageType } from "expo-camera";
import { useRef, useState, useEffect } from "react";
import React from "react";
import { DiffResult, useOpenCV } from "../../../../components/OpenCvProvider";
import { sendCalibrateRequest } from "../../../../config/backend";
import { Device } from "../../../../config/api";

let pos: [number, number, number, number][] = [];
let imUri: string[] = [];

type CameraState = "ready" | "capture" | "verify";

const ledCount = 20; //todo
let imgComplete = 0;
let state: CameraState = "ready";

const Pairing_video = () => {
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [type, setType] = useState(CameraType.back);
  const cameraRef = useRef<Camera | null>(null);

  const [imgsrc, setImgsrc] = useState("");
  const { setDiffCallback, setDrawCallback, diff, draw } = useOpenCV();

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  function handleImageDiff(id: number, { minmax }: DiffResult) {
    pos[id] = [minmax.maxLoc.x, minmax.maxLoc.y, 0, 0];
    console.log(id, " successfully diffed");
    if (imgComplete + 1 == ledCount) {
      console.log("drawing");
      draw(0, imUri[0], pos);
    } else {
      imgComplete += 1;
    }
  }

  async function takePic(id: number) {
    console.log("taking pic: ", id);
    const pic = await cameraRef?.current
      ?.takePictureAsync({
        // isImageMirror: true,
        skipProcessing: true,
        base64: true,
        imageType: ImageType.png,
        onPictureSaved: (pic) => {
          if (pic?.base64) {
            let base64 = "data:image/png;base64," + pic.base64;
            // console.log({ id, len: imUri.length });
            // setImUri([...imUri, base64]);

            if (id == -1) {
              imUri.push(base64);
            } else {
              imUri[id] = base64;
            }

            // instant compare
            if (id >= 1) {
              diff(id - 1, imUri[0], base64);
            }
          }
        },
      })
      .catch((e) => console.error("taking pic: ", e));
  }

  function timeToDelayUntil(time: number) {
    return time - Date.now();
  }

  function takeNpics(n: number, delay: number) {
    state = "capture";
    imgComplete = 0;

    let now = Date.now();
    let startTimeDelay = 2000;

    sendCalibrateRequest(
      "884782586024230913", //todo set to id
      n,
      now + startTimeDelay + delay / 2,
      delay,
      () => {}
    );

    imUri = [];
    pos = [];

    for (let i = 0; i < n + 1; i++) {
      setTimeout(() => {
        takePic(i);
      }, timeToDelayUntil(now + i * delay + startTimeDelay));
    }
  }

  useEffect(() => {
    state = "ready";
    pos = [];
    imUri = [];
    setDiffCallback(handleImageDiff);
    setDrawCallback((id: number, src: string) => {
      console.log("draw recv");
      if (state == "capture") {
        setImgsrc(src);
        state = "verify";
      }
    });
  }, []);

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
          title: "Calibration",
          headerStyle: {
            backgroundColor: "#74B3CE",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "400",
          },
        }}
      />
      {state == "verify" ? (
        <Image source={{ uri: imgsrc }} style={styles.camera}></Image>
      ) : (
        <Camera
          ref={cameraRef}
          style={styles.camera}
          type={type}
          // whiteBalance={WhiteBalance.shadow}
        ></Camera>
      )}
      <Text>
        {state == "ready" && ""}
        {state == "capture" && "Please hold the camera still"}
        {state == "verify" && "Are the detected positions accurate?"}
      </Text>
      <View style={styles.captureContainer}>
        {state == "ready" && (
          <Pressable style={styles.captureBlock} onPress={toggleCameraType}>
            <Text style={styles.captureText}>Toggle Camera</Text>
          </Pressable>
        )}
        {state == "ready" && (
          <Pressable
            style={styles.captureBlock}
            onPress={() => takeNpics(ledCount, 250)}
          >
            <Text style={styles.captureText}>Capture Frames</Text>
          </Pressable>
        )}
        {state == "capture" && (
          <Pressable style={styles.captureBlock} disabled={true}>
            <Text style={styles.captureText}>Capturing...</Text>
          </Pressable>
        )}
        {state == "verify" && (
          <Pressable
            style={styles.captureBlock}
            // onPress={} //todo
          >
            <Text style={styles.captureText}>No, retry</Text>
          </Pressable>
        )}
        {state == "verify" && (
          <Pressable
            style={styles.captureBlock}
            // onPress={} //todo
          >
            <Text style={styles.captureText}>Yes, take from a new angle</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  captureContainer: {
    // flex: 1,
    padding: "5%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  camera: {
    // flex: 1,
    flexGrow: 1,
    // height: "60%",
    borderRadius: 5,
  },
  image: {
    flex: 1,
    backgroundColor: "#0553",
  },
  captureBlock: {
    backgroundColor: "#A7AFB2",
    width: "50%",
    // maxWidth: 180,
    padding: "5%",
    marginHorizontal: 10,
    borderRadius: 8,
  },
  captureText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
});

export default Pairing_video;
