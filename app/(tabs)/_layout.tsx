import { Tabs } from "expo-router";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons/faHouse";
import { faUser } from "@fortawesome/free-solid-svg-icons/faUser";

import { Image } from "react-native";
export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#fff",
        headerShadowVisible: false,
        tabBarStyle: {
          backgroundColor: "#000",
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <Image
              source={require("../../assets/icons/HomeIcon.png")}
              style={{ marginTop: 30 }}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="hubs"
        options={{
          title: "",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <Image
              source={require("../../assets/icons/HubsIcon.png")}
              style={{ marginTop: 30 }}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <Image
              source={require("../../assets/icons/ProfileIcon.png")}
              style={{ marginTop: 30 }}
            />
          ),
        }}
      />
    </Tabs>
  );
}
