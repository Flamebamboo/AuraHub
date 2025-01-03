import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const RootLayout = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack
        screenOptions={{
          // Change animation to vertical
          animation: 'fade', // or 'fade_from_bottom', 'none', 'slide_from_bottom'
          // You can also use these properties for more control:
          presentation: 'modal', // makes it slide up from bottom
          headerShown: false,
        }}
      >
        <Stack.Screen name="focus-timer" options={{ headerShown: false }} />
        <Stack.Screen name="pomodoro-timer" options={{ headerShown: false }} />
        <Stack.Screen name="enter-loading" options={{ headerShown: false }} />
        <Stack.Screen name="exit-loading" options={{ headerShown: false }} />
      </Stack>
      <StatusBar backgroundColor="#161622" style="light" />
    </GestureHandlerRootView>
  );
};

export default RootLayout;
