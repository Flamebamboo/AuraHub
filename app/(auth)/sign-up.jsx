import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import FormField from "@/components/FormField";
import Button from "@/components/Button";

import { useRouter } from "expo-router";
import { useUser } from "@/context/userContext";

const SignUp = () => {
  const router = useRouter();
  const user = useUser();

  const [isSubmitting, setSubmitting] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async () => {
    if (username === "" || email === "" || password === "") {
      Alert.alert("Please enter your username, email and password");
    }
    setSubmitting(true);

    try {
      const result = await user.register(email, password, username);

      router.replace("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="h-full bg-primary-custom-blue">
      <ScrollView>
        <View className="pt-10">
          <Text className="pt-10 font-bold text-7xl text-white underline decoration-red-500 text-center mb-3">
            StudyHub
          </Text>
          <Text className="mb-32 text-center text-white text-xl font-semibold">
            Create Account
          </Text>
        </View>
        <View className="min-h-[85vh]">
          <FormField
            title="Username"
            value={username}
            placeholder="Enter your username"
            handleChangeText={setUsername}
          />
          <FormField
            title="Email"
            value={email}
            placeholder="Enter your email"
            handleChangeText={setEmail}
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            value={password}
            placeholder="Enter your password"
            handleChangeText={setPassword}
            iconName="lock-closed-outline"
            secureTextEntry
          />
          <Button theme="SignIn" label="Sign Up" onPress={submit}></Button>
          <View className="flex-row justify-center mt-8">
            <Text className="text-white">Already have an account? </Text>
            <TouchableOpacity onPress={() => router.replace("/sign-in")}>
              <Text className="text-red-500">Sign in</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
