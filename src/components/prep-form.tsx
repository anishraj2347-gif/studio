
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  HeartPulse,
  Pill,
  FileText,
  HelpCircle,
  Loader2,
  ArrowLeft,
  ArrowRight,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { generateEnhancedSummary } from '@/ai/flows/reasoning-enhanced-summary';

const formSchema = z.object({
  symptoms: z.string().min(1, 'Please describe your symptoms.'),
  medications: z.string().min(1, 'Please list your current medications.'),
  medicalHistory: z.string().min(1, 'Please provide your relevant medical history.'),
  questions: z.string().min(1, 'Please list any questions for your doctor.'),
});

type FormValues = z.infer<typeof formSchema>;

type Step = 'form' | 'loading';

const formSteps = [
    { id: 'symptoms', label: 'Symptoms', icon: HeartPulse },
    { id: 'medications', label: 'Current Medications', icon: Pill },
    { id: 'medicalHistory', label: 'Medical History & Allergies', icon: FileText },
    { id: 'questions', label: 'Questions for the Doctor', icon: HelpCircle },
] as const;

export default function PrepForm() {
  const router = useRouter();
  const [appStep, setAppStep] = useState<Step>('form');
  const [currentStep, setCurrentStep] = useState(0);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      symptoms: '',
      medications: '',
      medicalHistory: '',
      questions: '',
    },
  });

  async function processNextStep() {
    const fieldName = formSteps[currentStep].id;
    const isValid = await form.trigger(fieldName);
    if (isValid) {
      if (currentStep < formSteps.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        await form.handleSubmit(onSubmit)();
      }
    }
  }

  function processPreviousStep() {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  }

  async function onSubmit(values: FormValues) {
    setAppStep('loading');
    try {
      const result = await generateEnhancedSummary(values);
      
      // Store data in session storage to pass to the summary page
      sessionStorage.setItem('prepRxFormData', JSON.stringify(values));
      sessionStorage.setItem('prepRxEnhancedSummary', result.enhancedSummary);

      // Navigate to the new summary page
      router.push('/summary');

    } catch (error) {
      console.error('AI summary generation failed:', error);
      toast({
        title: 'Error',
        description: 'Failed to generate AI summary. Please try again.',
        variant: 'destructive',
      });
      setAppStep('form');
    }
  }

  const progress = ((currentStep + 1) / formSteps.length) * 100;
  const currentFormStep = formSteps[currentStep];

  if (appStep === 'loading') {
    return (
      <Card className="shadow-lg transition-all duration-300 animate-in fade-in">
        <CardContent className="p-10 flex flex-col items-center justify-center text-center gap-4 min-h-[400px]">
          <Loader2 className="w-12 h-12 text-primary animate-spin" />
          <h2 className="text-2xl font-semibold text-primary">Generating Your Summary...</h2>
          <p className="text-foreground/70">
            Our AI is structuring your notes. This will just take a moment.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-lg transition-all duration-300 animate-in fade-in border">
      <Form {...form}>
        <form onSubmit={(e) => e.preventDefault()}>
          <CardHeader>
            <Progress value={progress} className="w-full mb-4" />
            <CardTitle className="text-2xl font-headline flex items-center gap-2">
              <currentFormStep.icon className="text-primary w-6 h-6" />
              {currentFormStep.label}
            </CardTitle>
            <CardDescription>
              {currentStep === 0 && "The more details you provide, the better your summary will be."}
              {currentStep > 0 && `Step ${currentStep + 1} of ${formSteps.length}`}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 min-h-[200px]">
            {currentStep === 0 && (
              <FormField
                control={form.control}
                name="symptoms"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., Sharp pain in my left knee, occurs after walking for 10 minutes. Started 2 weeks ago..."
                        rows={6}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            {currentStep === 1 && (
              <FormField
                control={form.control}
                name="medications"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., Metformin 500mg, twice a day. Aspirin 81mg, once a day."
                        rows={6}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            {currentStep === 2 && (
              <FormField
                control={form.control}
                name="medicalHistory"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., Diagnosed with Type 2 Diabetes in 2015. Allergic to Penicillin."
                        rows={6}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            {currentStep === 3 && (
              <FormField
                control={form.control}
                name="questions"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., What are the side effects of my new medication? Are there any lifestyle changes I should make?"
                        rows={6}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button type="button" variant="outline" onClick={processPreviousStep} disabled={currentStep === 0}>
              <ArrowLeft /> Back
            </Button>
            <Button type="button" onClick={processNextStep} className="bg-accent text-accent-foreground hover:bg-accent/90">
              {currentStep < formSteps.length - 1 ? 'Next' : 'Generate Summary'}
              <ArrowRight />
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
