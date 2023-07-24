import { StatusBar } from "expo-status-bar";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import CreateAccount from "../components/CreateAccount";
import LogIn from "../components/LogIn";
import SignOut from "../components/SignOut";
import AccountInfo from "../components/AccountInfo";

export default function App() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <CreateAccount />
      <LogIn />
      <SignOut />
      <AccountInfo />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    container: {
      paddingVertical: 100,
    },
  });
  