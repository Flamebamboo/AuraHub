//root _layout jsx
import { View } from 'react-native';
import React, { useEffect, useCallback, useState } from 'react';
import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import '../../global.css';
import GlobalProvider from '../context/GlobalProvider';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import * as SplashScreen from 'expo-splash-screen';

//update from expo sdk 52 using expo splash screen package refered from this doc https://docs.expo.dev/versions/latest/sdk/splash-screen/#configuration
// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

// Set the animation options. This is optional.
SplashScreen.setOptions({
  duration: 1000,
  fade: true,
});

const RootLayout = () => {
  const [appIsReady, setAppIsReady] = useState(false);
  const [fontsLoaded] = useFonts({
    ReadexPro: require('assets/fonts/ReadexPro.ttf'),
    PixelifySans: require('assets/fonts/PixelifySans.ttf'),
    BhalooBold: require('assets/fonts/Bhaloo Bold.ttf'),
  });

  useEffect(() => {
    async function prepare() {
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(() => {
    if (appIsReady && fontsLoaded) {
      SplashScreen.hide();
    }
  }, [appIsReady, fontsLoaded]);

  if (!appIsReady || !fontsLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
        <SafeAreaProvider>
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
        </SafeAreaProvider>
      </View>
    </GestureHandlerRootView>
  );
};

export default RootLayout;
