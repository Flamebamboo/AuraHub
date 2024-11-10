import { View, Text } from "react-native";
import React, { useEffect } from "react";
import "../global.css";
import { Stack, SplashScreen } from "expo-router";
import { useFonts } from "expo-font";

const RootLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
};

export default RootLayout;
