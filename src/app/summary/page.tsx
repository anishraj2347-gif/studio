
"use client";

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Printer, FilePlus2, Sparkles, AlertTriangle } from 'lucide-react';
import jsPDF from 'jspdf';

interface FormData {
  symptoms: string;
  medications: string;
  medicalHistory: string;
  questions: string;
}

export default function SummaryPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData | null>(null);
  const [enhancedSummary, setEnhancedSummary] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const summaryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const storedFormData = sessionStorage.getItem('prepRxFormData');
      const storedSummary = sessionStorage.getItem('prepRxEnhancedSummary');

      if (storedFormData && storedSummary) {
        setFormData(JSON.parse(storedFormData));
        setEnhancedSummary(storedSummary);
      } else {
        // If no data, redirect back to home to fill the form
        router.replace('/');
        return;
      }
    } catch (error) {
        console.error("Failed to parse summary data from session storage", error);
        router.replace('/');
        return;
    }
    setIsLoading(false);
  }, [router]);

  const handlePrint = () => {
    const doc = new jsPDF({
      orientation: 'p',
      unit: 'mm',
      format: 'a4',
    });

    // Simple text rendering with line breaks
    const addTextWithBreaks = (text: string, x: number, y: number, options: any) => {
        const lines = doc.splitTextToSize(text, options.maxWidth);
        doc.text(lines, x, y);
        return lines.length * 6; // Approximate line height
    };

    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(24);
    doc.setTextColor(41, 12, 94); // Primary color
    doc.text('PrepRx Summary', 15, 20);
    
    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(100, 116, 139); // Muted foreground
    doc.text("Your guide for a productive doctor's appointment.", 15, 28);
    
    let currentY = 40;

    if (formData) {
        doc.setFontSize(14);
        doc.setTextColor(31, 41, 55); // Dark gray
        doc.text("Your Notes", 15, currentY);
        doc.setLineWidth(0.5);
        doc.line(15, currentY + 2, 195, currentY + 2);
        currentY += 10;
        
        doc.setFontSize(10);
        
        doc.setFont('Helvetica', 'bold');
        doc.text("Symptoms:", 15, currentY);
        doc.setFont('Helvetica', 'normal');
        currentY += addTextWithBreaks(formData.symptoms, 15, currentY + 5, { maxWidth: 180 });
        currentY += 5;

        doc.setFont('Helvetica', 'bold');
        doc.text("Current Medications:", 15, currentY);
        doc.setFont('Helvetica', 'normal');
        currentY += addTextWithBreaks(formData.medications, 15, currentY + 5, { maxWidth: 180 });
        currentY += 5;

        doc.setFont('Helvetica', 'bold');
        doc.text("Medical History & Allergies:", 15, currentY);
        doc.setFont('Helvetica', 'normal');
        currentY += addTextWithBreaks(formData.medicalHistory, 15, currentY + 5, { maxWidth: 180 });
        currentY += 10;


        // Questions for the Doctor
        doc.setFontSize(14);
        doc.setTextColor(31, 41, 55);
        doc.text("Questions for the Doctor", 15, currentY);
        doc.line(15, currentY + 2, 195, currentY + 2);
        currentY += 10;
        
        doc.setFontSize(10);
        formData.questions.split('\n').filter(q => q.trim()).forEach(question => {
            doc.rect(15, currentY - 2, 4, 4); // Checkbox
            addTextWithBreaks(question, 22, currentY, { maxWidth: 173 });
            currentY += 8;
        });

        currentY += 10;
    }
    
    // AI Summary
    doc.setFillColor(245, 243, 255); // primary/10
    doc.rect(10, currentY - 5, 190, 5, 'F');
    doc.setFontSize(14);
    doc.setTextColor(88, 28, 135); // Accent color
    doc.text("AI-Enhanced Summary", 15, currentY);
    currentY += 10;

    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(51, 65, 85);
    addTextWithBreaks(enhancedSummary, 15, currentY, { maxWidth: 180 });
    
    doc.save('PrepRx_Summary.pdf');
  };

  const handleNewForm = () => {
    sessionStorage.removeItem('prepRxFormData');
    sessionStorage.removeItem('prepRxEnhancedSummary');
    router.push('/');
  };
  
  const renderWithLineBreaks = (text: string) => (
    <div className="whitespace-pre-wrap text-sm text-gray-700">{text}</div>
  );

  if (isLoading) {
      return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50">
            <p>Loading your summary...</p>
        </div>
      );
  }

  if (!formData) {
    return (
       <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50 p-4">
            <Card className="w-full max-w-xl text-center">
                <CardHeader>
                    <CardTitle className="flex items-center justify-center gap-2">
                        <AlertTriangle className="w-6 h-6 text-destructive" />
                        No Summary Data Found
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p>It looks like you haven't filled out the preparation form yet. Please go back to the homepage to get started.</p>
                </CardContent>
                <CardFooter>
                    <Button onClick={() => router.push('/')} className="w-full">Go to Homepage</Button>
                </CardFooter>
            </Card>
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 print:bg-white">
       <div className="fixed top-6 right-6 z-50 print:hidden flex gap-2">
            <Button onClick={handlePrint}>
                <Printer className="mr-2 h-4 w-4" />
                Print or Download PDF
            </Button>
            <Button onClick={handleNewForm} variant="outline">
                <FilePlus2 className="mr-2 h-4 w-4" />
                Start a New Form
            </Button>
        </div>

      {/* A4-sized container */}
      <div ref={summaryRef} className="mx-auto w-[210mm] min-h-[297mm] bg-white dark:bg-gray-800 shadow-lg p-16 print:shadow-none print:p-0">
          <header className="border-b-2 border-gray-200 pb-6 mb-10">
            <h1 className="text-4xl font-bold text-primary font-headline">PrepRx Summary</h1>
            <p className="text-md text-gray-500 mt-2">Your guide for a productive doctor's appointment.</p>
          </header>

          <main className="space-y-12">
            {/* Patient Notes Section */}
            <section>
              <h2 className="text-2xl font-semibold border-b pb-2 mb-4 text-gray-800 dark:text-gray-200">Your Notes</h2>
              <div className="space-y-6 text-base">
                <div>
                  <h3 className="font-bold text-gray-700 dark:text-gray-300">Symptoms:</h3>
                  {renderWithLineBreaks(formData.symptoms)}
                </div>
                <div>
                  <h3 className="font-bold text-gray-700 dark:text-gray-300">Current Medications:</h3>
                  {renderWithLineBreaks(formData.medications)}
                </div>
                <div>
                  <h3 className="font-bold text-gray-700 dark:text-gray-300">Medical History & Allergies:</h3>
                  {renderWithLineBreaks(formData.medicalHistory)}
                </div>
              </div>
            </section>

             {/* Questions Section */}
            <section>
                <h2 className="text-2xl font-semibold border-b pb-2 mb-4 text-gray-800 dark:text-gray-200">Questions for the Doctor</h2>
                <ul className="space-y-3">
                {formData.questions.split('\n').filter(q => q.trim()).map((question, index) => (
                    <li key={index} className="flex items-start">
                        <span className="inline-block w-5 h-5 border-2 border-gray-400 rounded-sm mr-4 mt-1 flex-shrink-0"></span>
                        <p className="text-gray-700 flex-1">{question}</p>
                    </li>
                ))}
                </ul>
            </section>

            {/* AI Summary Section */}
            <section className="bg-primary/10 p-8 rounded-lg border border-primary/20">
              <h2 className="text-2xl font-semibold pb-2 mb-4 text-accent flex items-center gap-2">
                <Sparkles className="w-6 h-6" />
                AI-Enhanced Summary
              </h2>
              <div className="text-base text-gray-800 dark:text-gray-300 whitespace-pre-wrap">
                {enhancedSummary}
              </div>
            </section>
          </main>
          
           <footer className="mt-20 pt-6 border-t text-center text-xs text-gray-500">
                <p>Disclaimer: This tool does not provide medical advice. It is for preparation purposes only.</p>
                <p>&copy; {new Date().getFullYear()} PrepRx. All rights reserved.</p>
            </footer>
      </div>
    </div>
  );
}
