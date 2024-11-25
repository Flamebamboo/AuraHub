// components/StartFocus.jsx
import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { router } from 'expo-router';

export const StartFocus = () => {
  return (
    <TouchableOpacity
      className="bg-gray-800 p-4 w-full rounded-2xl h-36 flex-row justify-between items-center"
      onPress={() => router.push('/(focus)/focus-timer')}
    >
      <View>
        <Text className="text-[#fff] text-xl font-bold">Start working</Text>
        <Text className="text-[#1fff]/70">stopwatch or timeblock timer</Text>
      </View>
    </TouchableOpacity>
  );
};
