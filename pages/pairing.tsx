import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const Pairing: React.FC = () => {
  const handleContinuePress = () => {
  };

  return (
    <View style={styles.container}>
      <Text style={styles.instructions}>
        1. Press button on Raspberry Pi to start pairing.
      </Text>
      <Text style={styles.instructions}>
        2. After pressing continue, the camera will be opened.
      </Text>
      <Text style={styles.instructions}>
        3. Point the camera at lights.
      </Text>
      <TouchableOpacity
        style={styles.continueBlock}
        onPress={handleContinuePress}
      >
        <Text style={styles.continueText}>Continue</Text>
      </TouchableOpacity>
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