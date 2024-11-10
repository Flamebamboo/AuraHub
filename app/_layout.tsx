import { View, Text } from "react-native";
import React, { useEffect } from "react";

import { Stack, SplashScreen } from "expo-router";
import { useFonts } from "expo-font";
import "../global.css";
const RootLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
    </Stack>
  );
};

export default RootLayout;
