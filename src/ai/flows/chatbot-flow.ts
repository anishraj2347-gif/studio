'use server';
/**
 * @fileOverview A simple chatbot flow for the PrepRx app.
 *
 * - chat - A function that handles the chatbot conversation.
 * - ChatInput - The input type for the chat function.
 * - ChatOutput - The return type for the chat function.
 */

import {ai} from '@/ai/genkit';
import {generate} from 'genkit';
import {z} from 'genkit';

const ChatInputSchema = z.object({
  history: z.array(
    z.object({
      role: z.enum(['user', 'model']),
      content: z.array(z.object({text: z.string()})),
    })
  ),
  message: z.string(),
});
export type ChatInput = z.infer<typeof ChatInputSchema>;

const ChatOutputSchema = z.object({
  message: z.string(),
});
export type ChatOutput = z.infer<typeof ChatOutputSchema>;

export async function chat(input: ChatInput): Promise<ChatOutput> {
  return chatFlow(input);
}

const chatFlow = ai.defineFlow(
  {
    name: 'chatFlow',
    inputSchema: ChatInputSchema,
    outputSchema: ChatOutputSchema,
  },
  async input => {
    const model = ai.getModel('googleai/gemini-2.5-flash');
    const response = await generate({
      model,
      system:
        "You are a friendly and helpful AI assistant with a background in healthcare. You are part of the PrepRx app. Your purpose is to assist users with questions about preparing for their doctor's appointments, understanding medical terminology in a simple way, and navigating the app. You must never provide medical advice, diagnoses, or treatment plans. If a user asks for medical advice, you should gently decline and advise them to consult with their healthcare provider.",
      history: input.history,
      prompt: input.message,
    });

    return {
      message: response.text,
    };
  }
);
