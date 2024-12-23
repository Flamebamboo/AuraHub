import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import CustomButton from '@/components/CustomButton';

import { router } from 'expo-router';

const index = () => {
  return (
    <SafeAreaView className="bg-primary-custom-lightpink h-full">
      <ScrollView
        contentContainerStyle={{
          height: '100%',
        }}
      >
        <View className="w-full flex justify-center items-center h-full pt-8 px-4">
          <Text className="align-top font-bold text-7xl text-white mt-10 font-ReadexProBold">Aura Hub</Text>
          <Text className="text-white text-2x font-PixelifySans">+ aura everytime you study or work</Text>

          <StatusBar style="auto" />
          <View className="flex-1 justify-end pb-10">
            <View className="mb-10">
              <CustomButton
                label="DEV MODE"
                variant="outline"
                fontSize={20}
                leftIcon="sign-in"
                onPress={() => router.replace('/(chat)/aura-chat')}
              />
            </View>
            <CustomButton
              label="Get Started"
              variant="solid"
              fontSize={20}
              leftIcon="sign-in"
              onPress={() => router.push('/(auth)/sign-up')}
            />
            <CustomButton
              fontSize={16}
              label="I ALREADY HAVE AN ACCOUNT"
              rightIcon="chevron-right"
              variant="transparent"
              onPress={() => router.push('/(auth)/sign-in')}
            />
          </View>
        </View>
        <StatusBar style="light" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default index;
