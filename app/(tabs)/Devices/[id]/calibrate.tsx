import { View, Text, StyleSheet, Pressable } from "react-native";
import { Link, router, Stack, useGlobalSearchParams } from "expo-router";
import React from "react";

const Pairing = () => {
  const searchParams = useGlobalSearchParams();
  const device = searchParams.id;
  console.log({ searchParams });

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "Calibrate",
          headerStyle: {
            backgroundColor: "#74B3CE",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "400",
          },
        }}
      />
      <Text style={styles.instructions}>
        1. Press button on Raspberry Pi to start pairing.
      </Text>
      <Text style={styles.instructions}>
        2. After pressing continue, the camera will be opened.
      </Text>
      <Text style={styles.instructions}>3. Point the camera at lights.</Text>
      <Link
        href={`Devices/${device}/calibration_video`}
        style={styles.continueBlock}
      >
        <Text style={styles.continueText}>Continue</Text>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  instructions: {
    fontSize: 12,
    textAlign: "center",
    marginBottom: 20,
    color: "#666",
  },
  continueBlock: {
    backgroundColor: "#B8B8B8",
    padding: 8,
    marginVertical: 2,
    marginTop: 5,
    borderRadius: 3,
    width: "100%",
    maxWidth: 150,
  },
  continueText: {
    color: "white",
    fontSize: 12,
    textAlign: "center",
  },
});

export default Pairing;
