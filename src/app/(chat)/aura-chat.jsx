import { View, Text, TouchableOpacity, Platform } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import MessageInput from '@/components/Chat/MessageInput.jsx';
import HeaderInfo from '@/components/Chat/HeaderInfo.jsx';
import { chatAura } from 'groq/Aura.js';
import { ScrollView } from 'react-native-gesture-handler';
import { KeyboardAvoidingView, KeyboardAwareScrollView, KeyboardToolbar } from 'react-native-keyboard-controller';

const Chat = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const scrollViewRef = useRef();

  // Function to scroll to bottom
  const scrollToBottom = () => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendInput = async () => {
    if (!input.trim()) return;
    setIsLoading(true);
    setError(null);
    try {
      const userMessage = { id: Date.now(), text: input, sender: 'user' };
      setMessages((prev) => [...prev, userMessage]);
      setInput('');
      console.log('User input:', userMessage.text);

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
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <HeaderInfo />
        <ScrollView ref={scrollViewRef} contentContainerStyle={{ flexGrow: 1 }} className="flex-1">
          <View className="flex-1 pb-4">
            {messages.map((message) => (
              <View
                key={message.id}
                className={`flex-row px-4 py-2 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <View
                  className={`max-w-[80%] rounded-2xl ${
                    message.sender === 'user' ? 'bg-secondary-custom-gray' : 'bg-primary-custom-pink'
                  }`}
                >
                  <Text className="text-white px-4 py-2 text-lg">{message.text}</Text>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
        <MessageInput input={input} setInput={setInput} handleSendInput={handleSendInput} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Chat;
