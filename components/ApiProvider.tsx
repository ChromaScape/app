import { useState, useEffect, createContext, useContext } from "react";

import { auth } from "../config/firebase";
import { API_ENDPOINT, Device, Pattern } from "../config/api";

import React from "react";
import { useUser } from "../components/UserProvider";

export interface UserContextProps {
  initialLoadPattern: boolean;
  initialLoadDevice: boolean;
  patterns: Pattern[];
  devices: Device[];
  requestPatternRefresh: () => Promise<void>;
  requestDeviceRefresh: () => Promise<void>;
}

export const ApiContext = createContext<UserContextProps>({
  initialLoadDevice: true,
  initialLoadPattern: true,
  patterns: [],
  devices: [],
  requestDeviceRefresh: async (..._) => {},
  requestPatternRefresh: async (..._) => {},
});

export function ApiProvider({ children }: { children: React.ReactNode }) {
  const [initialLoadDevice, setInitialLoadDevice] = useState(true);
  const [initialLoadPattern, setInitialLoadPattern] = useState(true);
  const [patterns, setPatterns] = useState<Pattern[]>([]);
  const [devices, setDevices] = useState<Device[]>([]);

  const { idToken } = useUser();

  const requestDeviceRefresh = async () => {
    try {
      const idToken = await auth.currentUser?.getIdToken();

      if (!idToken) {
        console.log("attempted to get device without id token");
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
      setDevices(devicesList);
    } catch (e) {
      // console.log(e);
      console.log("failed to fetch devices: ", JSON.stringify(e));
    }
  };

  const requestPatternRefresh = async () => {
    try {
      const idToken = await auth.currentUser?.getIdToken();

      if (!idToken) {
        console.log("attempted to get patterns without id token");
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
      setPatterns(patternsList);
    } catch (e) {
      // console.log(e);
      console.log("failed to fetch patterns: ", JSON.stringify(e));
    }
  };

  useEffect(() => {
    if (idToken) {
      requestDeviceRefresh().then(() => setInitialLoadDevice(false));
      requestPatternRefresh().then(() => setInitialLoadPattern(false));
    } else {
      setInitialLoadDevice(true);
      setInitialLoadPattern(true);
      setPatterns([]);
      setDevices([]);
    }
  }, [idToken]);

  return (
    <ApiContext.Provider
      value={{
        initialLoadDevice,
        initialLoadPattern,
        patterns,
        devices,
        requestDeviceRefresh,
        requestPatternRefresh,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
}

export const useApi = () => {
  return useContext(ApiContext);
};
