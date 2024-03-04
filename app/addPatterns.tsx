import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";

const addPattern = () => {
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "Add Patterns",
          headerStyle: {
            backgroundColor: "#74B3CE",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "400",
          },
        }}
      />
      <Pressable style={styles.optionsBlock}>
        <View style={styles.optionBlockContainer}>
          <Text style={styles.optionsText}>Upload 2D Video</Text>
          <FontAwesome
            name="chevron-right"
            size={15}
            color="#777B7E"
            style={styles.icon1}
          />
        </View>
      </Pressable>
      <Pressable style={styles.optionsBlock}>
        <View style={styles.optionBlockContainer}>
          <Text style={styles.optionsText}>File Upload (Shader Code)</Text>
          <FontAwesome
            name="chevron-right"
            size={15}
            color="#777B7E"
            style={styles.icon2}
          />
        </View>
      </Pressable>
      <Pressable style={styles.optionsBlock}>
        <View style={styles.optionBlockContainer}>
          <Text style={styles.optionsText}>Server URL upload</Text>
          <FontAwesome
            name="chevron-right"
            size={15}
            color="#777B7E"
            style={styles.icon3}
          />
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
  },
  icon1: {
    marginLeft: 256,
    marginTop: 4,
  },
  icon2: {
    marginLeft: 190,
    marginTop: 4,
  },
  icon3: {
    marginLeft: 242,
    marginTop: 4,
  },
  optionBlockContainer: {
    flexDirection: "row",
  },
  optionsBlock: {
    borderBottomWidth: 0.75,
    width: "100%",
    borderBottomColor: "#A7AFB2",
    padding: 15,
  },
  optionsText: {
    color: "#666",
    textAlign: "left",
    fontSize: 14,
  },
  text: {
    color: "white",
  },
});

export default addPattern;
