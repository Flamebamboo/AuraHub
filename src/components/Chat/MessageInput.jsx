import { View, Text, TextInput } from 'react-native';
import React from 'react';

const MessageInput = (setText) => {
  const handleChangeText = (text) => {
    setText(text);
  };
  return (
    <View className="flex w-full items-center justify-center">
      <View className="bg-secondary-custom-black w-[90%] rounded-2xl">
        <View className="flex-row px-4 py-3">
          <TextInput
            className="flex-1 bg-secondary-custom-black text-white px-4 py-2 mr-2 text-2xl"
            placeholder="Type a message..."
            placeholderTextColor="#666"
            onChangeText={handleChangeText}
            multiline
            maxLength={500}
            autoCapitalize="none"
            autoCorrect={true}
          />
        </View>
      </View>
    </View>
  );
};

export default MessageInput;
