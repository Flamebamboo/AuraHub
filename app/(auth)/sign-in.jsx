import { View, Text, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import FormField from "@/components/FormField";
import Button from "@/components/Button";

const Signin = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  return (
    <SafeAreaView className="h-full bg-primary-custom-blue">
      <ScrollView>
        <View className="min-h-[85vh]">
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Signin;
