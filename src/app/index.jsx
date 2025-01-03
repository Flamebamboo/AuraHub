import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useGlobalContext } from '@/context/GlobalProvider';

export default function Index() {
  const { firstLaunch, isLogged, loading } = useGlobalContext();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (firstLaunch) {
        router.replace('/(onboarding)/onboarding');
      } else if (isLogged) {
        // If logged in, navigate to main app or home screen
        router.replace('/home');
      } else {
        // Not first launch, not logged in -> sign in screen
        router.replace('/(auth)/sign-in');
      }
    }
  }, [loading, firstLaunch, isLogged]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" />
    </View>
  );
}
