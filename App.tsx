import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import StartPage from "./pages/start";
import DevicesPage from "./pages/devices";
import PairingPage from "./pages/pairing";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="StartPage" 
        component={StartPage} 
        options={{ headerShown: false }}/>
        <Stack.Screen name="DevicesPage" 
        component={DevicesPage} 
        options={{ 
          title: "Devices",
        headerStyle: {
          backgroundColor: "#74B3CE",
        },
        headerTintColor: "white",}}
        />
        <Stack.Screen name="PairingPage" 
        component={PairingPage} 
        options={{ 
          title: "Pairing",
        headerStyle: {
          backgroundColor: "#74B3CE",
        },
        headerTintColor: "white",}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
