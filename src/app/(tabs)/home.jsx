import React, { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRef, useState } from 'react';
import { useGlobalContext } from '@/context/GlobalProvider';
import { TimerArt } from '@/components/TimerArt/TimerArt';
import { StartFocus } from '@/components/StartFocus';
import useTimerVariant from '@/store/timerVariantStore';
import { useCallback } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { CreateSessionModal } from '@/components/BottomSheet/CreateSessionModal';
import { router } from 'expo-router';
const Home = () => {
  const { user } = useGlobalContext();
  const currentVariant = useTimerVariant((state) => state.variant);
  const createSessionModalRef = useRef(null);

  const handlePresentModalPress = useCallback(() => {
    createSessionModalRef.current?.present();
  }, []);
  const getGreeting = () => {
    const hour = new Date().getHours();

    if (hour < 12) return 'good morning';
    if (hour < 18) return 'good afternoon';
    return 'good night';
  };

  const [bgColor, setBgColor] = useState('#000');
  const handleBg = (color) => {
    setBgColor(color);
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView className="flex-1" style={{ backgroundColor: bgColor }}>
        <View className="p-5 gap-7 flex-1 ">
          {/* Header */}
          <View className="mb-6">
            <Text className="font-PixelifySans text-[#aeaeae] text-xl">{getGreeting()},</Text>
            <Text className="text-white font-bold text-3xl font-PixelifySans">{user ? user.username : 'User'}</Text>
          </View>

          <View className="mb-6 justify-center items-center flex-1">
            <TouchableOpacity onPress={() => router.push('/(shop)/focus-design')}>
              <TimerArt onColorChange={handleBg}></TimerArt>
            </TouchableOpacity>
            <TouchableOpacity
              className="w-1/2 mt-24 px-4 py-6 bg-white rounded-2xl shadow-lg flex items-center justify-center"
              onPress={handlePresentModalPress}
            >
              <Text className="text-black font-semibold text-lg">Start</Text>
            </TouchableOpacity>
          </View>
          <CreateSessionModal bottomSheetModalRef={createSessionModalRef} />
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default Home;
