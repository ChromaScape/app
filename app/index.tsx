import { Pressable, StyleSheet, Text, View } from "react-native";
import { Link, router } from "expo-router";
import React from "react";

const Homepage = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>ChromaScape</Text>
      <Pressable onPress={() => router.push("/login")} style={styles.button}>
        <Text style={styles.buttonText}>Get Started</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#74B3CE",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "white",
    fontSize: 24,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "white",
    padding: 6,
    borderRadius: 2,
  },
  buttonText: {
    color: "#74B3CE",
    fontSize: 10,
  },
});

export default Homepage;
