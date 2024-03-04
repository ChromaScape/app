import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { router, Stack } from "expo-router";
import { useApi } from "../../components/ApiProvider";

const Devices = () => {
  const { devices } = useApi();

  return (
    <View>
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
      <ScrollView contentContainerStyle={styles.container}>
        {devices.map((device) => (
          <Pressable
            key={device.id}
            style={styles.deviceBlock}
            onPress={() =>
              router.push({
                pathname: "/device/[id]",
                params: { device: "" + device.id },
              })
            }
          >
            <Text style={styles.deviceText}>{"" + device.id}</Text>
          </Pressable>
        ))}
        <Pressable
          onPress={() => router.push("/pairing")}
          style={styles.addDeviceBlock}
        >
          <Text style={styles.addDeviceText}>Add Device</Text>
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
