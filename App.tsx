import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import CreateAccount from "./components/CreateAccount";
import LogIn from "./components/LogIn";
import SignOut from "./components/SignOut";
import AccountInfo from "./components/AccountInfo";

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
      <CreateAccount />
      <LogIn />
      <SignOut />
      <AccountInfo />
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
