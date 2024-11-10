import { Tabs } from "expo-router";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons/faHouse";
import { faUser } from "@fortawesome/free-solid-svg-icons/faUser";
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
        name="index"
        options={{
          title: "",
          tabBarIcon: ({ color, focused }) => (
            <FontAwesomeIcon
              icon={faHouse}
              color={color}
              size={24}
              style={{ marginTop: 30 }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: "",
          tabBarIcon: ({ color, focused }) => (
            <FontAwesomeIcon
              icon={faUser}
              color={color}
              size={24}
              style={{ marginTop: 30 }}
            />
          ),
        }}
      />
    </Tabs>
  );
}
