// components/AuthTest.jsx
import React from "react";
import { View, Text, Button } from "react-native";
import { useGlobalContext } from "../context/GlobalProvider";
import { getCurrentUser } from "../lib/appwrite";

const AuthTest = () => {
  const { user, refreshUser } = useGlobalContext();

  const testAuth = async () => {
    console.log("Testing authentication...");
    try {
      const userData = await getCurrentUser();
      console.log("Direct getCurrentUser result:", userData);

      console.log("Current context user:", user);

      if (userData) {
        console.log("Authentication successful!");
        console.log("User data:", JSON.stringify(userData, null, 2));
      } else {
        console.log("No authenticated user found");
      }
    } catch (error) {
      console.error("Authentication test failed:", error);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Auth Status: {user ? "Logged In" : "Not Logged In"}</Text>
      <Text>Username: {user?.username || "N/A"}</Text>
      <Button title="Test Auth" onPress={testAuth} />
      <Button title="Refresh User" onPress={refreshUser} />
    </View>
  );
};

export default AuthTest;
