import { StatusBar } from "expo-status-bar";
import { Link, router, Stack, useGlobalSearchParams } from "expo-router";
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
import { API_ENDPOINT, Device } from "../../../../config/api";
import { manipulateAsync, SaveFormat } from "expo-image-manipulator";
import { auth } from "../../../../config/firebase";

type CameraState = "ready" | "capture" | "verify" | "calculating" | "submit";
type DisplayPos = [number, number, number, number];

let pos: DisplayPos[] = [];
let imUri: string[] = [];

let currentAngle = 0;
let loggedPositions: [DisplayPos[], DisplayPos[]] = [[], []];
let loggedIms: [string, string] = ["", ""];

const ledCount = 50; //todo
const scaleFactor = 0.25;
const delayMs = 250;
let imgComplete = 0;

const Pairing_video = () => {
  const { setDiffCallback, setDrawCallback, diff, draw } = useOpenCV();
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const cameraRef = useRef<Camera | null>(null);
  const searchParams = useGlobalSearchParams();
  const device = searchParams.id;

  const [imgsrc, setImgsrc] = useState("");
  const [type, setType] = useState(CameraType.back);
  const [displayState, setDisplayState] = useState<CameraState>("ready");
  const [triangulatedPos, setTriangulatedPos] = useState("");

  const stateRef = useRef<CameraState>();
  stateRef.current = displayState;

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  function handleImageDiff(
    id: number,
    { minmax, stats, centroids }: DiffResult
  ) {
    let goodStats = new Uint32Array(
      new Uint8Array(stats.split(",").map(Number)).buffer
    );
    let goodCentroid = new Float64Array(
      new Uint8Array(centroids.split(",").map(Number)).buffer
    );

    let newPositions = [];
    for (let i = 5; i < goodStats.length; i += 5) {
      // console.log(stats);
      //todo its [1,2,3], not [[2,3], [1]]
      newPositions.push([
        // 0, 0,
        goodStats[i],
        goodStats[i + 1],
        // 100, 100,
        goodStats[i + 2],
        goodStats[i + 3],
        goodStats[i + 4],

        // goodCentroid[0],
        // goodCentroid[1],
        // 0,
        // 0,
      ]);
    }

    let maxValue = 0;
    let maxItem = [0, 0, 0, 0, 0];
    for (const pos of newPositions) {
      if (pos[4] > maxValue) {
        maxValue = pos[4];
        maxItem = pos;
      }
    }

    if (newPositions.length == 0) {
      pos[id] = [minmax.maxLoc.x, minmax.maxLoc.y, 0, 0];
    } else if (
      minmax.maxLoc.x > maxItem[0] &&
      minmax.maxLoc.x < maxItem[0] + maxItem[2] &&
      minmax.maxLoc.y > maxItem[1] &&
      minmax.maxLoc.y < maxItem[1] + maxItem[3]
    ) {
      pos[id] = [minmax.maxLoc.x, minmax.maxLoc.y, 0, 0];
    } else {
      pos[id] = [maxItem[0], maxItem[1], maxItem[2], maxItem[3]];
    }

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
    let retrys = [0];
    const pic = await cameraRef?.current
      ?.takePictureAsync({
        // isImageMirror: true,
        skipProcessing: true,
        // base64: true,
        imageType: ImageType.png,
        onPictureSaved: async (pic) => {
          //scale image
          let res = await manipulateAsync(
            pic.uri,
            [{ resize: { width: pic.height * scaleFactor } }],
            {
              base64: true,
              format: SaveFormat.PNG,
            }
          );
          if (res?.base64) {
            let base64 = "data:image/png;base64," + res.base64;
            if (id == -1) {
              imUri.push(base64);
            } else {
              imUri[id] = base64;
            }

            // log image for use in reconstrution if its the first one
            if (id == 0) {
              console.log(pic.uri);
              loggedIms[currentAngle] = res.uri;
            }

            // instant compare
            if (id >= 1) {
              diff(id - 1, imUri[0], base64);
            }
          } else {
            throw new Error("couldnt take pic");
          }
        },
      })
      .catch(async (e) => {
        retrys[0] += 1;
        if (retrys[0] > 3) {
          console.error("retried too many times");
          return;
        }

        console.log(
          "error taking pic: ",
          { e },
          " | retrying after 10ms | retries already: ",
          retrys[0]
        );
        await new Promise((r) => setTimeout(r, 10));
        return await takePic(id);
      });
  }

  function timeToDelayUntil(time: number) {
    return time - Date.now();
  }

  function takeNpics(n: number, delay: number) {
    setDisplayState("capture");
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

  async function sendPos(pos: [number, number, number][] | string) {
    try {
      const idToken = await auth.currentUser?.getIdToken();

      if (typeof pos == "string") {
        pos = JSON.parse(pos);
      }

      if (!idToken) {
        console.error("not logged in");
        return;
      }

      if (!device || typeof device != "string") {
        console.log({ device });
        console.error("invalid device");
        return;
      }
      const res = await fetch(API_ENDPOINT + "/user/device_layout", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: idToken,
        },
        body: JSON.stringify({
          device_id: device,
          layout: pos,
        }),
      });

      console.log("recv: ", await res.text());
    } catch (e) {
      console.error("error sending layout: ", e);
    }
    router.navigate(`Devices/${device}`);
  }

  useEffect(() => {
    setDisplayState("ready");
    pos = [];
    imUri = [];
    currentAngle = 0;
    loggedPositions = [[], []];
    loggedIms = ["", ""];

    setDiffCallback(handleImageDiff);
    setDrawCallback((id: number, src: string) => {
      console.log("draw recv");
      setImgsrc(src);
      setDisplayState("verify");
    });
  }, []);

  if (typeof device != "string") {
    return <Text> no device selected </Text>;
  }

  if (!permission) {
    return <Text> no permission </Text>;
  }

  if (!permission.granted) {
    return (
      <Button onPress={() => requestPermission()} title="ask grant"></Button>
    );
  }

  const readyButtons = (
    <>
      <Pressable style={styles.captureBlock} onPress={toggleCameraType}>
        <Text style={styles.captureText}>Toggle Camera</Text>
      </Pressable>
      <Pressable
        style={styles.captureBlock}
        onPress={() => takeNpics(ledCount, delayMs)}
      >
        <Text style={styles.captureText}>Capture Frames</Text>
      </Pressable>
    </>
  );

  const captureButtons = (
    <>
      <Pressable style={styles.captureBlock} disabled={true}>
        <Text style={styles.captureText}>Capturing...</Text>
      </Pressable>
    </>
  );

  const verifyButtons = (
    <>
      <Pressable
        style={styles.captureBlock}
        onPress={() => {
          loggedPositions[currentAngle] = [];
          loggedIms[currentAngle] = "";
          pos = [];
          imUri = [];
          setDisplayState("ready");
        }}
      >
        <Text style={styles.captureText}>No, retry</Text>
      </Pressable>

      <Pressable
        style={styles.captureBlock}
        onPress={() => {
          const pos2d: [number, number, number][] = pos.map(([x, y]) => [
            x,
            y,
            0,
          ]);

          console.log({ pos2d });

          sendPos(pos2d);
        }}
      >
        <Text style={styles.captureText}>Yes</Text>
        <Text style={styles.captureText}>(2D scan)</Text>
      </Pressable>
      <Pressable
        style={styles.captureBlock}
        onPress={() => {
          if (currentAngle == 0) {
            loggedPositions = [pos, []];
            pos = [];
            imUri = [];
            currentAngle = 1;
            setDisplayState("ready");
          } else {
            // console.log("sneding");
            loggedPositions = [loggedPositions[0], pos];

            let sendPositions = new Array(ledCount);
            for (let i = 0; i < ledCount; i++) {
              sendPositions[i] = [
                loggedPositions[0][i].slice(0, 2).map((i) => i * scaleFactor),
                loggedPositions[1][i].slice(0, 2).map((i) => i * scaleFactor),
              ];
            }

            let formdata = new FormData();
            formdata.append("img1", {
              uri: loggedIms[0],
              name: "img1.jpg",
              type: "image/jpeg",
            });
            formdata.append("img2", {
              uri: loggedIms[1],
              name: "img2.jpg",
              type: "image/jpeg",
            });

            formdata.append("matches", JSON.stringify(sendPositions));
            setDisplayState("calculating");
            fetch(
              "https://us-east1-chromascape.cloudfunctions.net/python-http-function",
              {
                method: "post",
                headers: {
                  "Content-Type": "multipart/form-data",
                },
                body: formdata,
              }
            )
              .then(async (res) => {
                console.log("statis: ", res.status);
                const text = await res.text();
                setTriangulatedPos(text);
                setDisplayState("submit");
                console.log(text);
              })
              .catch((err) => {
                console.log("fetch err: ", err);
              });
          }
        }}
      >
        <Text style={styles.captureText}>Yes</Text>
        <Text style={styles.captureText}>(3D scan)</Text>
      </Pressable>
    </>
  );

  const submitButtons = (
    <>
      <Link href={`Devices/${device}`} style={styles.captureBlock}>
        <Text style={styles.captureText}>No</Text>
      </Link>
      <Pressable
        style={styles.captureBlock}
        onPress={() => sendPos(triangulatedPos)}
      >
        <Text style={styles.captureText}>Yes</Text>
      </Pressable>
    </>
  );

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
      {displayState == "verify" || displayState == "calculating" ? (
        <Image source={{ uri: imgsrc }} style={styles.camera}></Image>
      ) : displayState == "submit" ? (
        <Text style={styles.camera}>
          {`These are the calculated positions of the lights. There is no visualization yet :'( \n"${triangulatedPos}"`}
        </Text>
      ) : (
        <Camera
          ref={cameraRef}
          style={styles.camera}
          type={type}
          // whiteBalance={WhiteBalance.shadow}
        ></Camera>
      )}
      <Text>
        {displayState == "ready" &&
          currentAngle == 0 &&
          "Find an angle where all LEDs are visible and hold the camera still while capturing"}
        {displayState == "ready" &&
          currentAngle == 1 &&
          "Find a separate angle where all LEDs are visible"}
        {displayState == "capture" &&
          "Please hold the camera still while the lights are still flashing"}
        {displayState == "verify" && "Are the detected positions accurate?"}
        {displayState == "calculating" &&
          "Please wait a moment, calculating 3D pos"}
        {displayState == "submit" && "Is the triangulation ok to submit?"}
      </Text>
      <View style={styles.captureContainer}>
        {displayState == "ready" && readyButtons}
        {(displayState == "capture" || displayState == "calculating") &&
          captureButtons}
        {displayState == "verify" && verifyButtons}
        {displayState == "submit" && submitButtons}
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
