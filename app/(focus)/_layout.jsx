import { Stack } from 'expo-router';
import React from 'react';

const focusLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="focus-timer" options={{ headerShown: false }} />
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
};

export default focusLayout;
