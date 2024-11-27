// components/StartFocus.jsx
import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';

export const StartFocus = ({ onOpenPress }) => {
  return (
    <TouchableOpacity
      className="bg-gray-800 p-4 w-full rounded-2xl h-36 flex-row justify-between items-center"
      onPress={onOpenPress}
    >
      <View>
        <Text className="text-[#fff] text-xl font-bold">Start working</Text>
        <Text className="text-[#1fff]/70">stopwatch or timeblock timer</Text>
      </View>
    </TouchableOpacity>
  );
};
