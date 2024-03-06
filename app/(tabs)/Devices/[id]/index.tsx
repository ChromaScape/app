import { Link, useGlobalSearchParams, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  Modal,
  Button,
  TextInput,
} from "react-native";
import { router, Stack } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import { useApi } from "../../../../components/ApiProvider";
import { Picker } from "@react-native-picker/picker";
import { sendPatternRequest } from "../../../../config/backend";

const DeviceP = () => {
  const searchParams = useGlobalSearchParams();
  const [isModalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState("");
  const { patterns } = useApi();
  const [selectedPattern, setSelectedPattern] = useState("");

  const device = searchParams.id;

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  if (typeof device != "string") {
    console.log("unknown devide: ", { searchParams });
    return (
      <View>
        <Text> error, unknown device </Text>
      </View>
    );
  }

  let availablePatterns = patterns.filter((p) =>
    p.content.startsWith("preset, ")
  );

  return (
    <View>
      <Stack.Screen
        options={{
          title: device,
          headerStyle: {
            backgroundColor: "#74B3CE",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "400",
          },
        }}
      />
      <Pressable onPress={toggleModal} style={styles.optionsBlock}>
        <View style={styles.optionBlockContainer}>
          <Text style={styles.optionsText}>Change device name</Text>
          <FontAwesome
            name="chevron-right"
            size={15}
            color="#777B7E"
            style={styles.icon1}
          />
        </View>
      </Pressable>
      <View style={styles.optionsBlock}>
        <Link
          href={`Devices/${device}/calibrate`}
          style={styles.optionBlockContainer}
        >
          <Text style={styles.optionsText}>Calibrate</Text>
        </Link>
      </View>

      <Picker
        selectedValue={selectedPattern}
        // style={styles.picker}
        // itemStyle={styles.pickerItem}
        onValueChange={(itemValue) => setSelectedPattern(itemValue)}
      >
        {availablePatterns.map((pattern) => (
          <Picker.Item
            key={pattern.id}
            label={pattern.content.replace("preset, ", "")}
            value={pattern.id}
          />
        ))}
      </Picker>
      <Button
        title="Select Pattern"
        onPress={() => {
          sendPatternRequest(device, selectedPattern);
        }}
      />
      {/* 
      <Link
        href={`Devices/${device}/configuration`}
        style={styles.optionsBlock}
      >
        <View style={styles.optionBlockContainer}>
          <Text style={styles.optionsText}>Change LED configuration</Text>
          <FontAwesome
            name="chevron-right"
            size={15}
            color="#777B7E"
            style={styles.icon3}
          />
        </View>
      </Link>
      <Link href="/todo" style={styles.optionsBlock}>
        <View style={styles.optionBlockContainer}>
          <Text style={styles.deleteText}>Delete</Text>
        </View>
      </Link> */}

      <Modal
        animationType="none"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => {
          setModalVisible(!isModalVisible);
        }}
      >
        <View style={styles.modal}>
          <View style={styles.modalContent}>
            <TextInput
              placeholder="New name..."
              onChangeText={(text) => setName(text)}
              value={name}
            />
            <View style={styles.buttonContainer}>
              <Button title="Apply" onPress={toggleModal} color="#A7AFB2" />
              <View style={styles.buttonMargin} />
              <Button title="Close" onPress={toggleModal} color="#A7AFB2" />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingLeft: 16,
  },
  icon1: {
    marginLeft: 230,
    marginTop: 4,
  },
  icon2: {
    marginLeft: 214,
    marginTop: 4,
  },
  icon3: {
    marginLeft: 194,
    marginTop: 4,
  },
  icon4: {
    marginLeft: 228,
    marginTop: 4,
  },
  icon5: {
    marginLeft: 330,
    marginTop: 4,
  },
  toggleSwitch: {
    marginRight: 360,
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
  deleteText: {
    color: "#C51E34",
    textAlign: "left",
    fontSize: 14,
  },
  optionBlockContainer: {
    flexDirection: "row",
  },
  buttonContainer: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 15,
    alignItems: "center",
    width: "80%",
  },
  buttonMargin: {
    width: 10,
  },
  input: {
    height: 40,
    borderColor: "#A7AFB2",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    fontSize: 18,
    width: 130,
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

export default DeviceP;
