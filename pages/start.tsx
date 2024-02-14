import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";

type StartPageProps = {
  navigation: StackNavigationProp<any, "StartPage">;
};

const StartPage: React.FC<StartPageProps> = ({ navigation }) => {
  const handleButtonPress = () => {
    navigation.navigate("DevicesPage");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>ChromaScape</Text>
      <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
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

export default StartPage;
  