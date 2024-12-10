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
import FocusContextProvider from '@/context/FocusContextProvider';
import PomodoroContextProvider from '@/context/PomodoroContextProvider';

// Prevent splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [fontsLoaded] = useFonts({
    ReadexProBold: require('assets/fonts/ReadexPro.ttf'),
    PixelifySans: require('assets/fonts/PixelifySans.ttf'),
    Bhaloo: require('assets/fonts/Bhaloo.ttf'),
    BhalooBold: require('assets/fonts/BhalooBold.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded) {
      // Hide splash screen once fonts are loaded
      SplashScreen.hideAsync();
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
            <FocusContextProvider>
              <PomodoroContextProvider>
                <GlobalProvider>
                  <Stack>
                    <Stack.Screen name="index" options={{ headerShown: false }} />
                    <Stack.Screen name="(auth)" options={{ headerShown: false }} />
                    <Stack.Screen name="(chat)" options={{ headerShown: false }} />
                    <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                    <Stack.Screen name="(focus)" options={{ headerShown: false }} />
                  </Stack>
                </GlobalProvider>
              </PomodoroContextProvider>
            </FocusContextProvider>
          </KeyboardProvider>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
};

export default RootLayout;
