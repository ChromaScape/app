import { Stack } from "expo-router";
import React from "react";
import { UserProvider } from "../components/UserProvider";
import { ApiProvider } from "../components/ApiProvider";

const RootLayout = () => {
  return (
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
  );
};

export default RootLayout;
