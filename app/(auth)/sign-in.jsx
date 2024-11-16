import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";
import { getCurrentUser, signIn, signOut } from "@/lib/appwrite";

import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { AuthTest } from "@/components/AuthTest";
import { useGlobalContext } from "@/context/GlobalProvider";

const SignIn = () => {
  const { setUser, setIsLogged } = useGlobalContext();
  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleSignOut = async () => {
    await signOut();
    setUser(null);
    setIsLogged(false);
    console.log("User signed out.");
    router.replace("/(auth)/sign-in");
  };
  const customUser = async () => {
    await signIn("acap@acap.com", "123123123");
    router.replace("/home");
  };
  const submit = async () => {
    if (form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all fields");
    }

    setSubmitting(true);

    try {
      await signIn(form.email, form.password);
      const result = await getCurrentUser();
      setUser(result);
      setIsLogged(true);

      Alert.alert("Success", "User signed in successfully");
      router.replace("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <SafeAreaView className="flex-1 bg-[#1A91FF]">
      <KeyboardAwareScrollView
        bottomOffset={62}
        contentContainerStyle={styles.scrollViewContent}
      >
        <View className="px-5">
          <Text className="text-7xl font-bold text-white text-center mb-3 underline decoration-[#EF4444]">
            StudyHub
          </Text>
          <Text className="mb-32 text-center text-white text-xl font-semibold">
            Log in to your account
          </Text>
          <FormField
            title="Enter your email or username"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            placeholder="username or email"
            keyboardType="email-address"
          />
          <FormField
            title="Enter your password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            placeholder="password"
            secureTextEntry
          />
          <TouchableOpacity
            className="self-end mb-6 mr-6"
            onPress={() => console.log("Forgot password pressed")}
          >
            <Text className="text-[#EF4444] font-bold">Forgot password?</Text>
          </TouchableOpacity>
          <CustomButton
            theme="outline"
            label={isSubmitting ? "Signing in..." : "Sign In"}
            onPress={submit}
            disabled={isSubmitting}
          />

          <View className="flex-row justify-center mt-8">
            <Text className="text-white">Don't have an account? </Text>
            <TouchableOpacity onPress={() => router.replace("/sign-up")}>
              <Text className="text-[#EF4444]">Sign up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SignIn;
