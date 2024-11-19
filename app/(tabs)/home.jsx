import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { getCurrentUser, signOut } from "@/lib/appwrite";

import { router } from "expo-router";
import { useGlobalContext } from "@/context/GlobalProvider";
import { AuthTest } from "@/components/AuthTest";

//acap@acap.com
//123123123
import { StatsCard } from "@/components/StatsCard";
const Home = () => {
  const { user, setUser, setIsLogged } = useGlobalContext();
  const [selectedDay, setSelectedDay] = useState(new Date().getDay()); // Wednesday selected by default
  const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "good morning";
    if (hour < 18) return "good afternoon";
    return "good night";
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#1a1b1e" }}>
      <ScrollView style={{ flex: 1 }}>
        <View style={{ padding: 24, gap: 24 }}>
          {/* Header */}
          <View>
            <Text style={{ color: "#a0a0a0", fontSize: 18 }}>
              {getGreeting()},
            </Text>
            <Text style={{ color: "white", fontSize: 24, fontWeight: "bold" }}>
              {user ? user.username : "User"}
            </Text>
          </View>

          {/* Today's Stats */}
          <StatsCard />
          {/* Day Selector */}
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            {days.map((day, index) => (
              <TouchableOpacity
                key={day}
                onPress={() => setSelectedDay(index)}
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 9999,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor:
                    selectedDay === index ? "#3b82f6" : "#25262b",
                }}
              >
                <Text
                  style={{ color: selectedDay === index ? "white" : "#a0a0a0" }}
                >
                  {day}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Library Timer Card */}
          <TouchableOpacity
            style={{
              backgroundColor: "#3b82f6",
              padding: 16,
              borderRadius: 16,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 8,
                marginBottom: 16,
              }}
            >
              <View
                style={{
                  width: 8,
                  height: 8,
                  backgroundColor: "#4ade80",
                  borderRadius: 9999,
                }}
              />
              <View
                style={{
                  width: 24,
                  height: 24,
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                  borderRadius: 9999,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={{ color: "white", fontSize: 12 }}>⏰</Text>
              </View>
              <View
                style={{
                  width: 24,
                  height: 24,
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                  borderRadius: 9999,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={{ color: "white", fontSize: 12 }}>🌍</Text>
              </View>
            </View>
            <Text
              style={{
                color: "white",
                fontSize: 20,
                fontWeight: "bold",
                marginBottom: 8,
              }}
            >
              Library timer
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ color: "rgba(255, 255, 255, 0.8)" }}>
                Study live with 2,730 others
              </Text>
              <Text style={{ fontSize: 24 }}>▶️</Text>
            </View>
          </TouchableOpacity>

          {/* Start Working Button */}
          <TouchableOpacity
            style={{
              backgroundColor: "#ff9666",
              padding: 16,
              borderRadius: 16,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View>
              <Text
                style={{ color: "#1a1b1e", fontSize: 20, fontWeight: "bold" }}
              >
                Start working
              </Text>
              <Text style={{ color: "rgba(26, 27, 30, 0.7)" }}>
                stopwatch or timeblock timer
              </Text>
            </View>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
            >
              <View
                style={{
                  width: 32,
                  height: 32,
                  backgroundColor: "rgba(0, 0, 0, 0.1)",
                  borderRadius: 9999,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text>⏱️</Text>
              </View>
              <View
                style={{
                  width: 32,
                  height: 32,
                  backgroundColor: "rgba(0, 0, 0, 0.1)",
                  borderRadius: 9999,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text>🌙</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View className="flex-1"></View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
