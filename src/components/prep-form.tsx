"use client";

import { useState } from 'react';
import type { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  HeartPulse,
  Pill,
  FileText,
  HelpCircle,
  Loader2,
  Download,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import jsPDF from 'jspdf';

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
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { generateEnhancedSummary } from '@/ai/flows/reasoning-enhanced-summary';

const formSchema = z.object({
  symptoms: z.string().min(1, 'Please describe your symptoms.'),
  medications: z.string().min(1, 'Please list your current medications.'),
  medicalHistory: z.string().min(1, 'Please provide your relevant medical history.'),
  questions: z.string().min(1, 'Please list any questions for your doctor.'),
});

type FormValues = z.infer<typeof formSchema>;

type Step = 'form' | 'loading' | 'summary';

export default function PrepForm() {
  const [step, setStep] = useState<Step>('form');
  const [formData, setFormData] = useState<FormValues | null>(null);
  const [enhancedSummary, setEnhancedSummary] = useState<string>('');
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

  async function onSubmit(values: FormValues) {
    setStep('loading');
    setFormData(values);
    try {
      const result = await generateEnhancedSummary(values);
      setEnhancedSummary(result.enhancedSummary);
      setStep('summary');
    } catch (error) {
      console.error('AI summary generation failed:', error);
      toast({
        title: 'Error',
        description: 'Failed to generate AI summary. Please try again.',
        variant: 'destructive',
      });
      setStep('form');
    }
  }

  const handleDownloadPdf = () => {
    if (!formData) return;

    const doc = new jsPDF();
    const pageHeight = doc.internal.pageSize.height || doc.internal.pageSize.getHeight();
    const pageWidth = doc.internal.pageSize.width || doc.internal.pageSize.getWidth();
    let y = 20;
    const margin = 15;
    const maxWidth = pageWidth - margin * 2;
    
    const addText = (text: string, isTitle = false) => {
        if (y > pageHeight - 30) {
            doc.addPage();
            y = 20;
        }
        doc.setFont('Helvetica', isTitle ? 'bold' : 'normal');
        doc.setFontSize(isTitle ? 14 : 11);
        const lines = doc.splitTextToSize(text, maxWidth);
        doc.text(lines, margin, y);
        y += (lines.length * 7) + (isTitle ? 5 : 2);
    };

    doc.setFontSize(22);
    doc.setFont('Helvetica', 'bold');
    doc.text('PrepRx: Doctor\'s Appointment Summary', pageWidth / 2, 15, { align: 'center' });
    y = 30;

    addText('Patient-Provided Information', true);
    addText('Symptoms:\n' + formData.symptoms);
    addText('Current Medications:\n' + formData.medications);
    addText('Medical History & Allergies:\n' + formData.medicalHistory);
    addText('Questions for the Doctor:\n' + formData.questions);

    y+= 5;
    if (y > pageHeight - 30) { doc.addPage(); y = 20; }
    doc.line(margin, y, pageWidth - margin, y);
    y+=10;

    addText('AI-Enhanced Summary', true);
    addText(enhancedSummary);
    
    y += 10;
    if (y > pageHeight - 20) {
        doc.addPage();
        y = 20;
    }
    doc.setFontSize(8);
    doc.setFont('Helvetica', 'italic');
    doc.text('Disclaimer: This tool does not provide medical advice. It is for preparation purposes only.', pageWidth/2, y, { align: 'center' });

    doc.save(`PrepRx_Summary_${new Date().toISOString().split('T')[0]}.pdf`);
  };

  const handleStartOver = () => {
    form.reset();
    setStep('form');
    setFormData(null);
    setEnhancedSummary('');
  };

  if (step === 'loading') {
    return (
      <Card className="shadow-lg transition-all duration-300 animate-in fade-in">
        <CardContent className="p-10 flex flex-col items-center justify-center text-center gap-4 min-h-[400px]">
          <Loader2 className="w-12 h-12 text-primary animate-spin" />
          <h2 className="text-2xl font-semibold text-primary">Generating Your Summary...</h2>
          <p className="text-foreground/70">
            Our AI is structuring your notes. This might take a moment.
          </p>
        </CardContent>
      </Card>
    );
  }

  if (step === 'summary' && formData) {
    const renderWithLineBreaks = (text: string) => (
      <div className="whitespace-pre-wrap text-foreground/80">{text}</div>
    );
    return (
      <Card className="shadow-lg transition-all duration-300 animate-in fade-in">
        <CardHeader>
          <CardTitle className="text-3xl text-primary font-headline">Your Appointment Summary</CardTitle>
          <CardDescription>
            Here is your structured summary. You can download it as a PDF to take with you.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4 rounded-lg border bg-background/50 p-4">
            <h3 className="font-semibold text-lg">Your Notes</h3>
            <div className="text-sm space-y-3">
                <div><strong className="text-foreground">Symptoms:</strong>{renderWithLineBreaks(formData.symptoms)}</div>
                <div><strong className="text-foreground">Medications:</strong>{renderWithLineBreaks(formData.medications)}</div>
                <div><strong className="text-foreground">Medical History:</strong>{renderWithLineBreaks(formData.medicalHistory)}</div>
                <div><strong className="text-foreground">Questions:</strong>{renderWithLineBreaks(formData.questions)}</div>
            </div>
          </div>

          <div className="space-y-4 rounded-lg border border-accent/50 bg-accent/10 p-4">
            <h3 className="font-semibold text-lg text-accent flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              AI-Enhanced Summary
            </h3>
            <div className="text-sm text-foreground/90 whitespace-pre-wrap">
              {enhancedSummary}
            </div>
          </div>
          <p className="text-xs text-center text-muted-foreground italic">
            Disclaimer: This tool does not provide medical advice. It is for preparation purposes only.
          </p>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row justify-center gap-4">
          <Button onClick={handleDownloadPdf}><Download />Download PDF</Button>
          <Button variant="outline" onClick={handleStartOver}><RotateCcw />Start Over</Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="shadow-lg transition-all duration-300 animate-in fade-in">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle className="text-2xl font-headline">Tell us how you're feeling</CardTitle>
            <CardDescription>
              The more details you provide, the better your summary will be.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="symptoms"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2 text-base"><HeartPulse className="text-primary" /> Symptoms</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g., Sharp pain in my left knee, occurs after walking for 10 minutes. Started 2 weeks ago..."
                      rows={4}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="medications"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2 text-base"><Pill className="text-primary" /> Current Medications</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g., Metformin 500mg, twice a day. Aspirin 81mg, once a day."
                      rows={3}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="medicalHistory"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2 text-base"><FileText className="text-primary" /> Medical History & Allergies</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g., Diagnosed with Type 2 Diabetes in 2015. Allergic to Penicillin."
                      rows={3}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="questions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2 text-base"><HelpCircle className="text-primary" /> Questions for the Doctor</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g., What are the side effects of my new medication? Are there any lifestyle changes I should make?"
                      rows={3}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90" size="lg">
              Generate Summary
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
