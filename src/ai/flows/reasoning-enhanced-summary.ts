'use server';

/**
 * @fileOverview A flow to generate a reasoning-enhanced summary of patient information for doctor's appointments.
 *
 * - generateEnhancedSummary - A function that generates the enhanced summary.
 * - EnhancedSummaryInput - The input type for the generateEnhancedSummary function.
 * - EnhancedSummaryOutput - The return type for the generateEnhancedSummary function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const EnhancedSummaryInputSchema = z.object({
  symptoms: z
    .string()
    .describe('The patient’s symptoms, described in free text.'),
  medications: z
    .string()
    .describe('The patient’s current medications and dosages.'),
  medicalHistory: z
    .string()
    .describe('The patient’s past medical history and allergies.'),
  questions: z.string().describe('The patient’s questions for the doctor.'),
});
export type EnhancedSummaryInput = z.infer<typeof EnhancedSummaryInputSchema>;

const EnhancedSummaryOutputSchema = z.object({
  enhancedSummary: z
    .string()
    .describe(
      'An AI-generated summary of the patient information, structured using the STAR method (Situation, Task, Action, Result) to describe symptoms and provide a more insightful overview for the doctor.'
    ),
});
export type EnhancedSummaryOutput = z.infer<typeof EnhancedSummaryOutputSchema>;

export async function generateEnhancedSummary(
  input: EnhancedSummaryInput
): Promise<EnhancedSummaryOutput> {
  return reasoningEnhancedSummaryFlow(input);
}

const reasoningEnhancedSummaryPrompt = ai.definePrompt({
  name: 'reasoningEnhancedSummaryPrompt',
  input: {schema: EnhancedSummaryInputSchema},
  output: {schema: EnhancedSummaryOutputSchema},
  prompt: `You are an AI assistant that helps patients prepare for their doctor's appointments by generating an insightful and structured summary of their medical information.

  The generated summary should be structured using the STAR method (Situation, Task, Action, Result) to describe symptoms, medications, medical history, and questions.

  Symptoms: {{{symptoms}}}
  Medications: {{{medications}}}
  Medical History: {{{medicalHistory}}}
  Questions: {{{questions}}}

  Enhanced Summary:`,
});

const reasoningEnhancedSummaryFlow = ai.defineFlow(
  {
    name: 'reasoningEnhancedSummaryFlow',
    inputSchema: EnhancedSummaryInputSchema,
    outputSchema: EnhancedSummaryOutputSchema,
  },
  async input => {
    const {output} = await reasoningEnhancedSummaryPrompt(input);
    return output!;
  }
);
