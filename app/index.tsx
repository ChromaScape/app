import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
// import Home from "./pages/home";
import { Link } from "expo-router";

export default function App() {
  return (
    <View style={styles.container}>
      <Text> hi there </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});