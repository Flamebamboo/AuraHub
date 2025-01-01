//root _layout jsx
import React, { useEffect } from 'react';
import { Stack, SplashScreen } from 'expo-router';
import { useFonts } from 'expo-font';
import '../../global.css';
import GlobalProvider from '../context/GlobalProvider';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

// Prevent splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();
const RootLayout = () => {
  const [fontsLoaded] = useFonts({
    ReadexPro: require('assets/fonts/ReadexPro.ttf'),
    PixelifySans: require('assets/fonts/PixelifySans.ttf'),
    BhalooBold: require('assets/fonts/Bhaloo Bold.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded) {
      console.log('Fonts loaded');
      SplashScreen.hideAsync();
    } else {
      console.log('Fonts not loaded yet');
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <BottomSheetModalProvider>
          <KeyboardProvider>
            <GlobalProvider>
              <Stack>
                <Stack.Screen name="index" options={{ headerShown: false }} />
                <Stack.Screen name="(auth)" options={{ headerShown: false }} />
                <Stack.Screen name="(shop)" options={{ headerShown: false }} />
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="(focus)" options={{ headerShown: false }} />
              </Stack>
            </GlobalProvider>
          </KeyboardProvider>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
};

export default RootLayout;
