

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAi = new GoogleGenerativeAI("AIzaSyBw4xtZODG6az9c9SUSfkq3IlTQ52YlT_Y");

const model = genAi.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 0.7,     
  topP: 0.8,
  topK: 20,
  maxOutputTokens: 1024,
  responseMimeType: "text/plain",
};

const ChatSession = model.startChat({
  generationConfig,
  history: [],
});

export default ChatSession;
