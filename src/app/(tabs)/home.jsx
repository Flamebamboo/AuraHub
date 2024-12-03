import React, { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRef } from 'react';
import { useGlobalContext } from '@/context/GlobalProvider';

import { LibraryTimer } from '@/components/LibraryTimer';
import { StartFocus } from '@/components/StartFocus';
import { DaySelector } from '@/components/DaySelector';

import { StatsCard } from '@/components/StatsCard';

import { useState } from 'react';

import { useCallback } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { CreateSessionModal } from '@/components/CreateSessionModal';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

const Home = () => {
  const { user } = useGlobalContext();

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

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView className="flex-1 bg-[#141414]">
        <ScrollView className="flex-1">
          <View className="p-5 gap-7">
            {/* Header */}
            <View className="mb-6">
              <Text className="font-PixelifySans text-[#aeaeae] text-xl">{getGreeting()},</Text>
              <Text className="text-white font-bold text-3xl font-PixelifySans">{user ? user.username : 'User'}</Text>
            </View>

            <View className="space-y-6">
              <View className="mb-6">
                <StatsCard />
              </View>
              <View className="mb-20">
                <DaySelector />
              </View>
              <View className="mb-6">
                <LibraryTimer />
              </View>
              <View className="mb-6">
                <StartFocus onOpenPress={handlePresentModalPress} />
              </View>
              <CreateSessionModal bottomSheetModalRef={createSessionModalRef} />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default Home;
