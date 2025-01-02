import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import CustomButton from '@/components/Onboarding/CustomButton';
import { useRouter, useRootNavigationState } from 'expo-router';
import { useGlobalContext } from '../context/GlobalProvider';

const index = () => {
  const router = useRouter();
  const navState = useRootNavigationState();
  const { firstLaunch } = useGlobalContext();

  useEffect(() => {
    // Wait until the navigation state is ready
    if (!navState?.key) return;

    if (firstLaunch) {
      router.replace('/(onboarding)/onboarding');
    } else {
      router.replace('/(auth)/sign-in');
    }
  }, [firstLaunch, navState?.key]);

  return null; // No UI needed since navigation is handled here
};

export default index;
