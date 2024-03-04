import { View, Text, StyleSheet, Pressable } from "react-native";
import { router, Stack } from "expo-router";
import React from "react";

const Pairing = () => {
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "Pairing",
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
      <Pressable
        onPress={() => router.push("/pairing_video")}
        style={styles.continueBlock}
      >
        <Text style={styles.continueText}>Continue</Text>
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
