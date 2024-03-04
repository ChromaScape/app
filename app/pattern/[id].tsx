import { useLocalSearchParams } from "expo-router";
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

const PatternP = () => {
  const { device } = useLocalSearchParams();
  const [isToggled, setIsToggled] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState("");

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const toggleSwitch = () => {
    setIsToggled((previousState) => !previousState);
  };

  if (typeof device != "string") {
    console.log("unknown devide");
    return (
      <View>
        <Text> error, unknown device </Text>
      </View>
    );
  }

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
          <Text style={styles.optionsText}>Change Pattern Name</Text>
          <FontAwesome
            name="chevron-right"
            size={15}
            color="#777B7E"
            style={styles.icon1}
          />
        </View>
      </Pressable>
      <Pressable
        onPress={() => router.push("/schedulingInterface")}
        style={styles.optionsBlock}
      >
        <View style={styles.optionBlockContainer}>
          <Text style={styles.optionsText}>Scheduling</Text>
          <FontAwesome
            name="chevron-right"
            size={15}
            color="#777B7E"
            style={styles.icon2}
          />
        </View>
      </Pressable>
      <Pressable
        onPress={() => router.push("/changeConfiguration")}
        style={styles.optionsBlock}
      >
        <View style={styles.optionBlockContainer}>
          <Text style={styles.optionsText}>Apply</Text>
        </View>
      </Pressable>
      <Pressable
        onPress={() => router.push("/changeLEDPatterns")}
        style={styles.optionsBlock}
      >
        <View style={styles.optionBlockContainer}>
          <Text style={styles.deleteText}>Delete</Text>
        </View>
      </Pressable>

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
              style={styles.input}
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
    marginLeft: 220,
    marginTop: 4,
  },
  icon2: {
    marginLeft: 294,
    marginTop: 4,
  },
  icon3: {
    marginLeft: 332,
    marginTop: 4,
  },
  icon4: {
    marginLeft: 326,
    marginTop: 4,
  },
  optionBlockContainer: {
    flexDirection: "row",
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
  buttonContainer: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-evenly",
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
});

export default PatternP;
