import {View, Pressable, StyleSheet, Text, } from "react-native";
import React from "react";
import { signOut} from "firebase/auth";
import { Link, router, Stack } from "expo-router";
import { auth } from "../../config/firebase";

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
    <View style={styles.container}>
        <Stack.Screen
        options={{
          title: 'Settings',
          headerStyle: {
            backgroundColor: '#74B3CE',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: '400',
          },
        }}
      />
      <Pressable style={styles.logoutBlock}>
          <Text style={styles.logoutText}>Log out</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  logoutBlock: {
    backgroundColor: "#A7AFB2",
    padding: 10,
    width: '60%',
    marginVertical: 5,
    borderRadius: 30,
  },
  logoutText: {
    color: "white",
    fontSize: 16,
    textAlign: "center", 
    justifyContent: "center",
  },
});