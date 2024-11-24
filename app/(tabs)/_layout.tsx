import { Tabs } from "expo-router";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons/faHouse";
import { faUser } from "@fortawesome/free-solid-svg-icons/faUser";

import { CustomSvg } from "../../components/CustomSvg";
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
            <CustomSvg
              style={{ marginTop: 30 }}
              height={32}
              width={32}
              fillColor={focused ? "#fff" : "transparent"}
              variant="homeIcon"
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
            <CustomSvg
              style={{ marginTop: 30 }}
              height={32}
              width={32}
              fillColor={focused ? "#fff" : "transparent"}
              variant="hubsIcon"
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
            <CustomSvg
              style={{ marginTop: 30 }}
              height={32}
              width={32}
              fillColor={focused ? "#fff" : "transparent"}
              variant="profileIcon"
            />
          ),
        }}
      />
    </Tabs>
  );
}
