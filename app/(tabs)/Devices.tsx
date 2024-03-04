import { StatusBar } from "expo-status-bar";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Link, router, Stack } from "expo-router";

interface Device {
  id: number;
  name: string;
}

const dummyDeviceData: { devices: Device[] } = {
  devices: [
    { id: 1, name: "Ethans Pi" },
    { id: 2, name: "Adriens Pi" },
    { id: 3, name: "Erins Pi" },
  ],
};

const Devices = () => {
  const devices = dummyDeviceData.devices;
  const deviceNames: string[] = dummyDeviceData.devices.map(
    (device) => device.name
  );

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "Devices",
          headerStyle: {
            backgroundColor: "#74B3CE",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "400",
          },
        }}
      />
      {deviceNames.map((device) => (
        <Pressable
          key={device}
          style={styles.deviceBlock}
          onPress={() =>
            router.push({
              pathname: "/device/[id]",
              params: { device },
            })
          }
        >
          <Text style={styles.deviceText}>{device}</Text>
        </Pressable>
      ))}
      <Pressable
        onPress={() => router.push("/pairing")}
        style={styles.addDeviceBlock}
      >
        <Text style={styles.addDeviceText}>Add Device</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  deviceBlock: {
    backgroundColor: "#A7AFB2",
    padding: 10,
    marginVertical: 5,
    borderRadius: 3,
    width: 200,
  },
  deviceText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    justifyContent: "center",
  },
  addDeviceBlock: {
    backgroundColor: "#B8B8B8",
    padding: 8,
    marginVertical: 2,
    marginTop: 5,
    borderRadius: 3,
    width: "100%",
    maxWidth: 150,
  },
  addDeviceText: {
    color: "white",
    fontSize: 12,
    textAlign: "center",
  },
});

export default Devices;
