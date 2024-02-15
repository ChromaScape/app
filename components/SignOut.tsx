import { Button, View } from "react-native";

import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";

import styles from "../styles";

export default function SignOut() {
  async function performSignOut() {
    return signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  }

  return (
    <View style={styles.box}>
      <Button onPress={performSignOut} title="Sign Out" />
    </View>
  );
}
