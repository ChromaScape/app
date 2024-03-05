import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Modal,
  TextInput,
  Button,
} from "react-native";
import { useState } from "react";
import React from "react";
import { Stack } from "expo-router";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Picker } from "@react-native-picker/picker";
import { FontAwesome } from "@expo/vector-icons";

const schedulingInterface = () => {
  const [isToggled, setIsToggled] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedValue, setSelectedValue] = useState("seconds");
  const [inputText, setInputText] = useState("");

  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const handleDateConfirm = (date: Date) => {
    hideDatePicker();
    setSelectedDate(date);
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const toggleSwitch = () => {
    setIsToggled((previousState) => !previousState);
  };

  return (
    <View>
      <Stack.Screen
        options={{
          title: "Scheduling",
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
      <Pressable onPress={showDatePicker} style={styles.optionsBlock}>
        <View style={styles.optionBlockContainer}>
          <Text style={styles.optionsText}>Set Time</Text>
          <FontAwesome
            name="chevron-right"
            size={15}
            color="#777B7E"
            style={styles.icon2}
          />
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
              placeholder="Duration..."
              onChangeText={(text) => setInputText(text)}
              value={inputText}
            />
            <Picker
              selectedValue={selectedValue}
              style={styles.picker}
              itemStyle={styles.pickerItem}
              onValueChange={(itemValue) => setSelectedValue(itemValue)}
            >
              <Picker.Item label="Seconds" value="seconds" />
              <Picker.Item label="Minutes" value="minutes" />
              <Picker.Item label="Hours" value="hours" />
              <Picker.Item label="Days" value="days" />
            </Picker>
            <View style={styles.buttonContainer}>
              <Button title="Apply" onPress={toggleModal} color="#A7AFB2" />
              <View style={styles.buttonMargin} />
              <Button title="Close" onPress={toggleModal} color="#A7AFB2" />
            </View>
          </View>
        </View>
      </Modal>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="datetime"
        onConfirm={handleDateConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
  },
  icon1: {
    marginLeft: 220,
    marginTop: 4,
  },
  icon2: {
    marginLeft: 312,
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
  buttonMargin: {
    width: 10,
  },
  buttonContainer: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  picker: {
    width: 150,
    height: 50,
  },
  pickerItem: {
    fontSize: 10,
    paddingVertical: 10,
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
  inputBlock: {
    backgroundColor: "#A7AFB2",
    padding: 10,
    marginVertical: 5,
  },
  inputBlockTop: {
    backgroundColor: "#A7AFB2",
    padding: 10,
    marginVertical: 5,
    marginTop: 10,
  },
  changeInputText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    justifyContent: "center",
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

export default schedulingInterface;
