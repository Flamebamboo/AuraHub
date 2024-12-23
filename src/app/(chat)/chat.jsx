import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Make sure to install expo/vector-icons

import React from 'react';

// import TextGen from '@/components/HuggingFace/TextGen.jsx';
import { SafeAreaView } from 'react-native-safe-area-context';
import TextGenInference from '@/components/HuggingFace/TextGenInference.jsx';
import MessageInput from '@/components/Chat/MessageInput.jsx';
import HeaderInfo from '@/components/Chat/HeaderInfo.jsx';
const chat = () => {
  const [text, setText] = React.useState('');
  return (
    <SafeAreaView style={{ flex: 1 }} edges={['left', 'right', 'bottom']} className="bg-primary-custom-black">
      <HeaderInfo />
      <View className="flex-1">{/* Your messages content */}</View>
      <MessageInput />
    </SafeAreaView>
  );
};

export default chat;

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  debugRed: {
    borderWidth: 1,
    borderColor: 'red',
  },
  debugGreen: {
    borderWidth: 1,
    borderColor: 'green',
  },
  debugBlue: {
    borderWidth: 1,
    borderColor: 'blue',
  },
  debugYellow: {
    borderWidth: 1,
    borderColor: 'yellow',
  },
  debugPurple: {
    borderWidth: 1,
    borderColor: 'purple',
  },
});
