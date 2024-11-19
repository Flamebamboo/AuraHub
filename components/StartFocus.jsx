// components/StartFocus.jsx
import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { router } from "expo-router";

export const StartFocus = () => {
  return (
    <TouchableOpacity
      className="bg-[#ff9666] p-4 rounded-2xl flex-row justify-between items-center"
      onPress={() => router.push("/timer")}
    >
      <View>
        <Text className="text-[#1a1b1e] text-xl font-bold">Start working</Text>
        <Text className="text-[#1a1b1e]/70">stopwatch or timeblock timer</Text>
      </View>

      <View className="flex-row items-center gap-2">
        <View className="w-8 h-8 bg-black/10 rounded-full items-center justify-center">
          <Text>⏱️</Text>
        </View>
        <View className="w-8 h-8 bg-black/10 rounded-full items-center justify-center">
          <Text>🌙</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
