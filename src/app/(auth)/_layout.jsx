import { Redirect, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useGlobalContext } from '@/context/GlobalProvider';
import { Loader } from '@/components/Loader';
import { SafeAreaProvider } from 'react-native-safe-area-context';
const AuthLayout = () => {
  const { loading, isLogged } = useGlobalContext();

  if (!loading && isLogged) return <Redirect href="/home" />;

  return (
    <SafeAreaProvider>
      <Stack>
        <Stack.Screen name="sign-in" options={{ headerShown: false }} />
        <Stack.Screen name="sign-up" options={{ headerShown: false }} />
      </Stack>
      <Loader isLoading={loading} />
      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaProvider>
  );
};

export default AuthLayout;
