import React, { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRef } from 'react';
import { useGlobalContext } from '@/context/GlobalProvider';

import { LibraryTimer } from '@/components/LibraryTimer';
import { StartFocus } from '@/components/StartFocus';
import { DaySelector } from '@/components/DaySelector';

import { CreateSession } from '@/components/CreateSession';
import { StatsCard } from '@/components/StatsCard';

const Home = () => {
  const { user } = useGlobalContext();

  const handleOpenPress = () => {
    bottomSheetRef.current?.expand();
  };

  const bottomSheetRef = useRef(null);

  const getGreeting = () => {
    const hour = new Date().getHours();
    can;
    if (hour < 12) return 'good morning';
    if (hour < 18) return 'good afternoon';
    return 'good night';
  };

  return (
    <SafeAreaView className="flex-1 bg-black">
      <ScrollView className="flex-1">
        <View className="p-5 gap-7">
          {/* Header */}
          <View className="mb-6">
            <Text className="font-PixelifySans text-[#aeaeae] text-xl">
              {getGreeting()},
            </Text>
            <Text className="text-white font-bold text-3xl font-PixelifySans">
              {user ? user.username : 'User'}
            </Text>
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
              <StartFocus onOpenPress={handleOpenPress} />
            </View>
          </View>
          <View className="h-60" />
        </View>
        <CreateSession bottomSheetRef={bottomSheetRef} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
