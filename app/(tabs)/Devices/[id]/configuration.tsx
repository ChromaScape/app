import { View, Text, StyleSheet, Pressable } from "react-native";
import {
  Link,
  router,
  Stack,
  useGlobalSearchParams,
  useLocalSearchParams,
} from "expo-router";
import React from "react";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";

const Configuration = () => {
  const [selectedValue, setSelectedValue] = useState("seconds");
  const searchParams = useGlobalSearchParams();
  const device = searchParams.id;

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "Configuration",
          headerStyle: {
            backgroundColor: "#74B3CE",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "400",
          },
        }}
      />
      <Text style={styles.instructions}>Please select the number of LEDs</Text>
      <Picker
        selectedValue={selectedValue}
        style={styles.picker}
        itemStyle={styles.pickerItem}
        onValueChange={(itemValue) => setSelectedValue(itemValue)}
      >
        {Array.from({ length: 100 }, (_, index) => index + 1).map((number) => (
          <Picker.Item key={number} label={number.toString()} value={number} />
        ))}
      </Picker>
      <Link
        href={`Devices/${device}/configuration_video`}
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
  picker: {
    width: 150,
    height: 50,
  },
  pickerItem: {
    fontSize: 10,
    paddingVertical: 10,
  },
});

export default Configuration;
