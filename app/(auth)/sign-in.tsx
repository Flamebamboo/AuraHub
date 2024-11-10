import { View, Text, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import FormField from "@/components/FormField";

type FormState = {
  email: string;
  password: string;
};
const Signin = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  return (
    <SafeAreaView className="bg-black h-full">
      <ScrollView>
        <View className="w-full flex justify-center h-full px-4 my-6">
          <Text className="text-3xl text-white font-bold mt-4">
            Log In to StudyHub
          </Text>

          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyle="mt-7"
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyle="mt-7"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Signin;
