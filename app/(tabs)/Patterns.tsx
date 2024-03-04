import { StatusBar } from "expo-status-bar";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import { Link, router, Stack } from "expo-router";
import React from "react";

interface Device {
  id: number;
  name: string;
}

const dummyDeviceData: { devices: Device[] } = {
  devices: [
    { id: 1, name: "pattern 1" },
    { id: 2, name: "pattern 2" },
    { id: 3, name: "pattern 3" },
  ],
};

const Patterns = () => {
  const devices = dummyDeviceData.devices;
  const deviceNames: string[] = dummyDeviceData.devices.map(device => device.name);

  return (
    <View style={styles.container}>
        <Stack.Screen
        options={{
          title: 'Patterns',
          headerStyle: {
            backgroundColor: '#74B3CE',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: '400',
          },
        }}
      />
      {deviceNames.map((device) => (
        <Pressable
          key={device}
          style={styles.patternBlock}
          onPress={() => router.push({
            pathname: "/pattern/[id]",
            params: {device},
          })
        }
        >
          <Text style={styles.patternText}>{device}</Text>
        </Pressable>
      ))}
      <Pressable onPress ={() => router.push ("/addPatterns")} style={styles.addPatternBlock}>
        <Text style={styles.addPatternText}>Add Pattern</Text>
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
  patternBlock: {
    backgroundColor: "#A7AFB2",
    padding: 10,
    marginVertical: 5,
    borderRadius: 3,
    width: 200
  },
  patternText: {
    color: "white",
    fontSize: 16,
    textAlign: "center", 
    justifyContent: "center",
  },
  addPatternBlock: {
    backgroundColor: "#B8B8B8",
    padding: 8,
    marginVertical: 2,
    marginTop: 5,
    borderRadius: 3,
    width: "100%",
    maxWidth: 150,
  },
  addPatternText: {
    color: "white",
    fontSize: 12,
    textAlign: "center",
  },
});

export default Patterns;