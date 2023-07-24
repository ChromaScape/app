import { StyleSheet, Button } from "react-native";

import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";

const styles = StyleSheet.create({
  input: {
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: 200,
  },
  box: {
    borderWidth: 1,
    padding: 10,
  },
});

export default function SignOut() {

  async function performSignOut() {
    return signOut(auth).then(() => {
        // Sign-out successful.
      }).catch((error) => {
        // An error happened.
      });
  }

  return (
      <Button onPress={performSignOut} title="Sign Out" />
  );
}
