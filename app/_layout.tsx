import { Slot, Stack } from "expo-router";
import React from "react";
import { UserProvider } from "../components/UserProvider";
import { ApiProvider } from "../components/ApiProvider";
import { OpenCVProvider } from "../components/OpenCvProvider";

const RootLayout = () => {
  // return (
  //   <UserProvider>
  //     <ApiProvider>
  //       <Slot />
  //     </ApiProvider>
  //   </UserProvider>
  // );
  return (
    <OpenCVProvider>
      <UserProvider>
        <ApiProvider>
          <Stack>
            <Stack.Screen
              name="(tabs)"
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="index"
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="login"
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="signup"
              options={{
                headerShown: false,
              }}
            />
          </Stack>
        </ApiProvider>
      </UserProvider>
    </OpenCVProvider>
  );
};

export default RootLayout;
