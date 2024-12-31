import React, { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRef } from 'react';
import { useGlobalContext } from '@/context/GlobalProvider';

import { StartFocus } from '@/components/StartFocus';

import { useCallback } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { CreateSessionModal } from '@/components/BottomSheet/CreateSessionModal';

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

            <View className="mb-6">
              <StartFocus onOpenPress={handlePresentModalPress} />
            </View>
            <CreateSessionModal bottomSheetModalRef={createSessionModalRef} />
          </View>
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default Home;
