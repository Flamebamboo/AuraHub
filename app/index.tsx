import { View, Text, Touchable } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import Button from "@/components/Button";
import { SafeAreaView } from "react-native-safe-area-context";
const index = () => {
  return (
    <View className="flex-1 items-center justify-center bg-black">
      <Text className="align-top font-bold text-7xl text-white underline decoration-red-600">
        StudyHub
      </Text>
      <StatusBar style="light" />
      {/* <Button label="Sign In" onPress={() => {}} /> */}
    </View>
  );
};

export default index;
