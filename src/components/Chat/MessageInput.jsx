import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

const MessageInput = ({ input, setInput, handleSendInput }) => {
  return (
    <View className="flex w-full items-center justify-center">
      <View className="bg-secondary-custom-black w-[90%] rounded-2xl">
        <View className="flex-row px-4 py-3">
          <TextInput
            className="flex-1 bg-secondary-custom-black text-white px-4 py-2 mr-2 text-2xl"
            placeholder="Type a message..."
            placeholderTextColor="#666"
            onChangeText={setInput}
            value={input}
            multiline
            maxLength={500}
            autoCapitalize="none"
            autoCorrect={true}
          />
          <TouchableOpacity onPress={handleSendInput}>
            <Text>Send</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default MessageInput;
