import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation} from "@react-navigation/native";

interface Device {
  id: number;
  name: string;
}

const dummyDeviceData: { devices: Device[] } = {
  devices: [
    { id: 1, name: "Ethans Pi" },
    { id: 2, name: "Adriens Pi" },
    { id: 3, name: "Erins Pi" },
  ],
};

const Devices: React.FC = () => {
  const devices = dummyDeviceData.devices;
  const navigation = useNavigation();
  
  const handleDevicePress = (device: Device) => {
  };
  
  const handleAddDevicePress = () => {
    navigation.navigate("PairingPage");
  };

  return (
    <View style={styles.container}>
      {devices.map((device) => (
        <TouchableOpacity
          key={device.id}
          style={styles.deviceBlock}
          onPress={() => handleDevicePress(device)}
        >
          <Text style={styles.deviceText}>{device.name}</Text>
        </TouchableOpacity>
      ))}
      
      <TouchableOpacity
        style={styles.addDeviceBlock}
        onPress={handleAddDevicePress}
      >
        <Text style={styles.addDeviceText}>Add Device</Text>
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
  deviceBlock: {
    backgroundColor: "#A7AFB2",
    padding: 10,
    marginVertical: 5,
    borderRadius: 3,
    width: 200
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
  