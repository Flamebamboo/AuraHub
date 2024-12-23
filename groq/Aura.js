import Groq from 'groq-sdk';
import { GROQ_API_KEY } from '@env';

const groq = new Groq({ apiKey: GROQ_API_KEY });

export async function chatAura(userInput) {
  console.log('User input:', userInput);
  try {
    const chatCompletion = await getGroqChatBot(userInput);
    // Return the completion content returned by the LLM or a default message if empty
    return chatCompletion.choices[0]?.message?.content || 'No response from AI';
  } catch (error) {
    console.error('Error in chatAura:', error);
    return 'Error communicating with AI';
  }
}

export async function getGroqChatBot(userInput) {
  try {
    const response = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'You are Aura AI, Tutor',
        },
        {
          role: 'user',
          content: userInput,
        },
      ],
      model: 'llama3-8b-8192',
    });
    // Debugging: Log the response to ensure it's being received correctly
    console.log('Groq API response:', response);
    return response;
  } catch (error) {
    console.error('Error in getGroqChatBot:', error);
    throw error;
  }
}
