import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { faPaperPlane, faUserFriends } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

const MessageInput = ({ input, setInput, handleSendInput }) => {
  const [selectedMode, setSelectedMode] = useState('chat');

  const inputModes = [
    { id: 'FunChat', label: 'Fun Chat', icon: faUserFriends },
    { id: 'Math', label: 'Math', icon: faUserFriends },
    { id: 'Writing', label: 'Writing', icon: faUserFriends },
    { id: 'Translate', label: 'Translate', icon: faUserFriends },
    { id: 'notes', label: 'Notes', icon: faUserFriends },
  ];

  return (
    <View className="flex w-full items-center justify-center">
      <ScrollView horizontal showsHorizontalScrollIndicator={false} className="w-full mb-2">
        <View className="flex-row px-4 items-center justify-center py-2 gap-4 w-full">
          {inputModes.map((mode) => (
            <TouchableOpacity
              key={mode.id}
              onPress={() => setSelectedMode(mode.id)}
              className="px-4 py-3 border min-w-28 flex-row items-center gap-4 border-secondary-custom-gray rounded-md"
            >
              <FontAwesomeIcon icon={mode.icon} size={16} color="white" />

              <Text className=" text-white font-bold">{mode.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <View className="bg-secondary-custom-black w-[90%] rounded-2xl">
        <View className="flex-row px-4 py-3 ">
          <TextInput
            className="flex-1 bg-secondary-custom-black max-h-24 items-center text-white px-4 py-1 mr-2 text-xl"
            placeholder="Type a message..."
            placeholderTextColor="#666"
            onChangeText={setInput}
            value={input}
            multiline
            maxLength={500}
            autoCapitalize="none"
            autoCorrect={true}
          />
          <View className="justify-end items-end p-2">
            {input.trim() && (
              <TouchableOpacity onPress={handleSendInput} className="opacity-100">
                <FontAwesomeIcon icon={faPaperPlane} size={24} color="white" />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

export default MessageInput;
