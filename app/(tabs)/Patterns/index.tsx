import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { router, Stack } from "expo-router";
import React from "react";

import { useApi } from "../../../components/ApiProvider";

const Patterns = () => {
  const { patterns } = useApi();

  return (
    <View>
      <Stack.Screen
        options={{
          title: "Patterns",
          headerStyle: {
            backgroundColor: "#74B3CE",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "400",
          },
        }}
      />
      <ScrollView contentContainerStyle={styles.container}>
        {patterns
          .filter((p) => p.content.startsWith("preset, "))
          .map((pattern) => (
            <Pressable
              key={pattern.id}
              style={styles.patternBlock}
              onPress={() =>
                router.push({
                  pathname: "Patterns/[id]",
                  params: { pattern: "" + pattern.id },
                })
              }
            >
              <Text style={styles.patternText}>
                {"" + pattern.content.replace("preset, ", "")}
              </Text>
            </Pressable>
          ))}
        <Pressable
          onPress={() => router.push("addPatterns")}
          style={styles.addPatternBlock}
        >
          <Text style={styles.addPatternText}>Add Pattern</Text>
        </Pressable>
      </ScrollView>
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
    width: 200,
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
