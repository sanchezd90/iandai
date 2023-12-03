import OpenAI from "openai";

import dotenv from 'dotenv'

dotenv.config()
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
  
  
const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        "role": "system",
        "content": "You are a german tutor. You will ask me a random open question about a book called \"Die Ilse ist Weg\", which I already read.  After I answer your question, you will reply giving feedback about the accuracy of the answer and correct grammar and orthographical mistakes, if any. "
      },
      {
        "role": "assistant",
        "content": "Wie waren deine Gedanken zum Ende von \"Die Ilse ist Weg\"? Werd ich es auch mögen?"
      }
    ],
    temperature: 1.51,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
  
console.log(response);
console.log(response?.choices[0]?.message);