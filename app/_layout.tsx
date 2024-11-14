import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { Stack, SplashScreen } from "expo-router";
import { useFonts } from "expo-font";
import "../global.css";
import GlobalProvider from "@/context/GlobalProvider";
import { KeyboardProvider } from "react-native-keyboard-controller";

const RootLayout = () => {
  return (
    <KeyboardProvider>
      <GlobalProvider>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </GlobalProvider>
    </KeyboardProvider>
  );
};

export default RootLayout;
