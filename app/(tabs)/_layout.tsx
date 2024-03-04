import { Tabs } from "expo-router";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          height: 60,
        },
      }}
    >
      <Tabs.Screen
        name="Patterns"
        options={{
          tabBarIcon: () => (
            <FontAwesome name="lightbulb-o" size={26} color={"#777B7E"} />
          ),
        }}
      />
      <Tabs.Screen
        name="Devices"
        options={{
          tabBarIcon: () => (
            <FontAwesome name="th-large" size={24} color={"#777B7E"} />
          ),
        }}
      />
      <Tabs.Screen
        name="Settings"
        options={{
          tabBarIcon: () => (
            <FontAwesome name="gear" size={26} color={"#777B7E"} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
