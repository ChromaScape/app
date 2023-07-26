import { StatusBar } from "expo-status-bar";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useState } from "react";

import CreateAccount from "../components/CreateAccount";
import LogIn from "../components/LogIn";
import SignOut from "../components/SignOut";
import AccountInfo from "../components/AccountInfo";
import ViewPatterns from "../components/ViewPatterns";
import CreatePattern from "../components/CreatePattern";
import ViewDevices from "../components/ViewDevices";
import SetDevicePattern from "../components/SetDevicePattern";
import { Pattern, Device } from "../config/api";

export default function App() {
  const [patterns, setPatterns] = useState<Pattern[]>([]);
  const [devices, setDevices] = useState<Device[]>([]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <CreateAccount />
      <LogIn />
      <SignOut />
      <AccountInfo />
      <CreatePattern />
      <ViewPatterns onPatternChange={setPatterns} />
      <ViewDevices onDeviceChange={setDevices} />
      <SetDevicePattern patterns={patterns} devices={devices} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    container: {
      paddingVertical: 100,
    },
  });
  