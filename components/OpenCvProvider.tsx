import React, {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";
import WebView, { WebViewMessageEvent } from "react-native-webview";
const source = require("../assets/opencv.html");

import { Text } from "react-native";

const dummyFunction = (..._: any) => {};
const asyncDummyFunction = async (..._: any) => {};

export interface MinMax {
  maxLoc: { x: number; y: number };
  minLoc: { x: number; y: number };
}

export interface DiffResult {
  num: number;
  stats: string;
  centroids: string;
  minmax: MinMax;
}

export type DiffCallback = (id: number, props: DiffResult) => void;
export type DrawCallback = (id: number, props: string) => void;
export interface OpenCVContextProps {
  isLoading: boolean;
  setDiffCallback: (callback: DiffCallback | undefined) => void;
  setDrawCallback: (callback: DrawCallback | undefined) => void;
  diff: (id: number, img1: string, img2: string) => void;
  draw: (
    id: number,
    im: string,
    pos: [number, number, number, number][]
  ) => void;
}

export const OpenCVContext = createContext<OpenCVContextProps>({
  isLoading: true,
  setDiffCallback: dummyFunction,
  setDrawCallback: dummyFunction,
  diff: dummyFunction,
  draw: dummyFunction,
});

export const OpenCVProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);

  const webviewRef = useRef<WebView>(null);

  const diffCallback = useRef<DiffCallback | undefined>(undefined);
  const setDiffCallback = useCallback((f: DiffCallback | undefined) => {
    diffCallback.current = f;
  }, []);

  const drawCallback = useRef<DrawCallback | undefined>(undefined);
  const setDrawCallback = useCallback((f: DrawCallback | undefined) => {
    drawCallback.current = f;
  }, []);

  const diff = useCallback((id: number, im1: string, im2: string) => {
    webviewRef.current?.injectJavaScript(
      `operateOnImages("im_diff", ${id}, [${JSON.stringify(
        im1
      )}, ${JSON.stringify(im2)}], (ims) => detectDiff(ims[0], ims[1]));`
    );
  }, []);

  const draw = useCallback(
    (id: number, im: string, pos: [number, number, number, number][]) => {
      webviewRef.current?.injectJavaScript(
        `operateOnImages("draw", ${id}, ["${im}"], (ims) => drawLightPositions(ims[0], ${JSON.stringify(
          pos
        )}));`
      );
    },
    []
  );

  const onMessage = useCallback(async (e: WebViewMessageEvent) => {
    const { type, id, data } = JSON.parse(e.nativeEvent.data);

    // console.log("msg recieved: ", { type, id });

    switch (type) {
      case "onload":
        setIsLoading(false);
        break;
      case "onImageLoad":
        // do nothing
        break;
      case "im_diff":
        if (diffCallback.current) {
          diffCallback.current(id, data);
        }
        break;
      case "draw":
        if (drawCallback.current) {
          drawCallback.current(id, data);
        }
        break;
      default:
        console.log("unknown message: ", type, data);
    }
  }, []);

  return (
    <OpenCVContext.Provider
      value={{ isLoading, setDiffCallback, setDrawCallback, diff, draw }}
    >
      {children}
      <WebView
        onMessage={onMessage}
        ref={webviewRef}
        originWhitelist={["*"]}
        containerStyle={{
          position: "absolute",
          width: 0,
          height: 0,
          top: 0,
          left: 0,
        }}
        javaScriptEnabled={true}
        source={source}
      />
    </OpenCVContext.Provider>
  );
};

export const useOpenCV = () => {
  return useContext(OpenCVContext);
};
