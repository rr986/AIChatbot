import { Configuration, OpenAIApi } from 'openai';
import { retrieveDocuments } from '../../utils/retrieve';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  const { messages } = req.body;

  const userMessage = messages[messages.length - 1].content;

  const relevantDocs = retrieveDocuments(userMessage);
  const context = relevantDocs.map(doc => doc.content).join("\n\n");

  const modelInput = `Context: ${context}\n\nUser: ${userMessage}`;

  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [
      { role: 'system', content: 'You are a helpful assistant.' },
      { role: 'user', content: modelInput },
    ],
  });

  res.status(200).json({ response: response.data.choices[0].message.content });
}
