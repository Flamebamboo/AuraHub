import { ChatGroq } from '@langchain/groq';
import { StateGraph, START, END, MessagesAnnotation, MemorySaver } from '@langchain/langgraph';
import { v4 as uuidv4 } from 'uuid';
import { ChatPromptTemplate } from '@langchain/core/prompts';

const config = { configurable: { thread_id: uuidv4() } };

const promptTemplate = ChatPromptTemplate.fromMessages([
  ['system', 'You talk like a pirate. Answer all questions to the best of your ability.'],
  ['placeholder', '{messages}'],
]);

// 1. Create the LLM
const llm = new ChatGroq({
  apiKey: process.env.GROQ_API_KEY,
  model: 'mixtral-8x7b-32768',
  temperature: 0, //the higher the temperature, the more creative the AI
});

// 2. Define the function that calls the model
const callModel = async (state) => {
  const prompt = await promptTemplate.invoke(state.messages);
  const response = await llm.invoke(prompt);
  return { messages: response };
};

// 3. Define a new graph with one node (the LLM call)

// StateGraph Think of it as a map that shows how to move from one step to the next in the conversation.
// Nodes: Each step or action in the process. For example, one node might be sending the user's message to the AI.
// Edges: The connections between steps.They show the order in which steps should be taken.

const workflow = new StateGraph(MessagesAnnotation)
  .addNode('model', callModel)
  .addEdge(START, 'model') // from start to model
  .addEdge('model', END); // from model to end

// 4. Provide an in-memory checkpointer
const memory = new MemorySaver();
const app = workflow.compile({ checkpointer: memory });

//MemorySaver is like a notebook that remembers what has been said during the conversation
//checkpointer is a mechanism that uses MemorySaver to save and retrive the coversation history, making the LLM (persistent memory)

const input = [
  {
    role: 'user',
    content: "Hi! I'm Bob.",
  },
];
const output = await app.invoke({ messages: input }, config);
// The output contains all messages in the state.
// This will long the last message in the conversation.
console.log(output.messages[output.messages.length - 1]);

// async function multiTurnExample() {
//   let state = { messages: [{ role: 'user', content: 'Hello AI!' }] };
//   state = await app(state);
//   console.log('AI response (turn 1):', state.messages);

//   state.messages.push({ role: 'user', content: 'What did I say earlier?' });
//   state = await app(state);
//   console.log('AI response (turn 2):', state.messages);
// }

// multiTurnExample().catch(console.error);
