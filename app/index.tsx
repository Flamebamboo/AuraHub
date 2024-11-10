import { View, Text, SafeAreaView, ScrollView } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import Button from "@/components/Button";
import { FontAwesome } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { Redirect, router } from "expo-router";

const index = () => {
  const [fontsLoaded] = useFonts({
    PixelifySans: require("../assets/fonts/PixelifySans.ttf"),
  });
  return (
    <SafeAreaView className="bg-black h-full">
      <ScrollView
        contentContainerStyle={{
          height: "100%",
        }}
      >
        <View className="w-full flex justify-center items-center h-full px-4">
          <Text
            className="align-top font-bold text-7xl text-white underline decoration-red-500 mt-10"
            style={{ fontFamily: "PixelifySans" }}
          >
            StudyHub
          </Text>

          <StatusBar style="auto" />
          <View className="flex-1 justify-end mb-20">
            <Button
              label="CREATE AN ACCOUNT"
              theme="createAccount"
              onPress={() => router.push("/(auth)/sign-in")}
            />
            <Button
              label="I ALREADY HAVE AN ACCOUNT"
              theme="haveAccount"
              onPress={() => router.push("/(auth)/sign-in")}
            />
          </View>
        </View>
        <StatusBar style="light" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default index;
