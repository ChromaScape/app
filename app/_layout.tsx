import { Stack } from "expo-router";
import React from "react";
import { UserProvider } from "../components/UserProvider";

const RootLayout = () => {
  return (
    <UserProvider>
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
    </UserProvider>
  );
};

export default RootLayout;
