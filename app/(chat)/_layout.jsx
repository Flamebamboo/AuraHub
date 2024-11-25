import React from 'react';
import { Stack } from 'expo-router';

const newLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="chat" options={{ headerShown: false }} />
    </Stack>
  );
};

export default newLayout;
