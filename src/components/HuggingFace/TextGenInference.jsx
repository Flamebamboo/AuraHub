import { View, Text, TouchableOpacity, TextInput, ScrollView, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

const TextGenInference = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  async function query(input) {
    try {
      const response = await fetch('https://api-inference.huggingface.co/models/microsoft/Phi-3-mini-4k-instruct', {
        headers: {
          Authorization: 'Bearer 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',
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({ inputs: input }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      // For debugging
      console.log('API Response:', data);
      return data[0].generated_text;
    } catch (error) {
      console.error('Error during fetch:', error);
      throw error;
    }
  }

  const handleSend = async () => {
    if (!input.trim()) return; // input is emty

    setIsLoading(true);
    setError(null);

    try {
      const userMessage = { id: Date.now(), text: input, sender: 'user' };
      setMessages((prev) => [...prev, userMessage]);
      setInput('');

      const response = await query(input);
      const botMessage = { id: Date.now() + 1, text: response, sender: 'bot' };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.messageList}>
        {messages.map((message) => (
          <View
            key={message.id}
            style={[styles.messageBubble, message.sender === 'user' ? styles.userMessage : styles.botMessage]}
          >
            <Text style={styles.messageText}>{message.text}</Text>
          </View>
        ))}
        {isLoading && <Text style={styles.loading}>Thinking...</Text>}
        {error && <Text style={styles.error}>{error}</Text>}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Type a message..."
          multiline
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend} disabled={isLoading}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  messageList: {
    flex: 1,
    padding: 16,
  },
  messageBubble: {
    padding: 12,
    borderRadius: 16,
    marginBottom: 8,
    maxWidth: '80%',
  },
  userMessage: {
    backgroundColor: '#007AFF',
    alignSelf: 'flex-end',
  },
  botMessage: {
    backgroundColor: '#E9ECEF',
    alignSelf: 'flex-start',
  },
  messageText: {
    color: '#000',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E9ECEF',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#E9ECEF',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
  },
  sendButton: {
    backgroundColor: '#007AFF',
    borderRadius: 20,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  sendButtonText: {
    color: '#fff',
  },
  loading: {
    fontStyle: 'italic',
    color: '#666',
    alignSelf: 'center',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    margin: 8,
  },
});

export default TextGenInference;
