import { View, Text, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import MessageInput from '@/components/Chat/MessageInput.jsx';
import HeaderInfo from '@/components/Chat/HeaderInfo.jsx';
import { chatAura } from 'groq/Aura.js';
import { ScrollView } from 'react-native-gesture-handler';
const Chat = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSendInput = async () => {
    if (!input.trim()) return;
    setIsLoading(true);
    setError(null);
    try {
      const userMessage = { id: Date.now(), text: input, sender: 'user' };
      setMessages((prev) => [...prev, userMessage]);
      setInput('');
      console.log('User input:', userMessage.text);
      //ai response
      const auraResponse = await chatAura(userMessage.text);
      console.log('AI response:', auraResponse);
      const auraMessage = { id: Date.now() + 1, text: auraResponse, sender: 'aura' };
      setMessages((prev) => [...prev, auraMessage]);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['left', 'right', 'bottom']} className="bg-primary-custom-black">
      <ScrollView>
        <HeaderInfo />
        <View className="flex-1">
          {messages.map((message) => (
            <View
              key={message.id}
              className={`flex-row px-4 py-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <View
                className={`bg-secondary-custom-black w-[90%] rounded-2xl ${
                  message.sender === 'user' ? 'bg-primary-custom-black' : 'bg-primary-custom-pink'
                }`}
              >
                <Text className="text-white px-4 py-2 text-2xl">{message.text}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
      <MessageInput input={input} setInput={setInput} handleSendInput={handleSendInput} />
    </SafeAreaView>
  );
};

export default Chat;
