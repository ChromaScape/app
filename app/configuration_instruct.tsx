import { View, Text, StyleSheet, Pressable } from "react-native";
import { router, Stack } from "expo-router";
import React from "react";
import { useState} from "react";

const Configuration = () => {
  const [selectedValue, setSelectedValue] = useState("seconds");

  return (
    <View style={styles.container}>
        <Stack.Screen
        options={{
          title: 'Configuration',
          headerStyle: {
            backgroundColor: '#74B3CE',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: '400', 
          },
        }}
      />
      <Text style={styles.instructions}>
        Please choose a new angle and take a new video
      </Text>
      <Pressable onPress ={() => router.push ("/configuration_video")} style={styles.continueBlock}>
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

export default Configuration;
