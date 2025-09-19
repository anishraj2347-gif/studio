import PrepForm from '@/components/prep-form';
import { Stethoscope, Lightbulb, UserCheck, FileText, Twitter, Linkedin, Facebook, Star } from 'lucide-react';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent } from '@/components/ui/card';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <main className="flex-grow flex flex-col items-center justify-center p-4 sm:p-8 md:p-12 lg:p-24">
        <div className="w-full max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="inline-block bg-primary/10 p-4 rounded-full mb-4">
              <Stethoscope className="w-12 h-12 text-primary" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold font-headline text-primary tracking-tight">PrepRx</h1>
            <p className="text-lg md:text-xl text-foreground/80 mt-4 max-w-2xl mx-auto">
              Transform your anxiety into confidence. Your personal assistant for a productive and stress-free doctor's visit.
            </p>
          </div>

          {/* How It Works & Form Section */}
          <div className="bg-card border rounded-2xl p-6 md:p-10 mb-16 shadow-lg">
            <h2 className="text-3xl font-bold font-headline text-center mb-8">Get Your Personalized Summary</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center mb-8">
              <div className="flex flex-col items-center">
                <div className="bg-primary/10 p-4 rounded-full mb-4 ring-8 ring-primary/5">
                  <FileText className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">1. Fill in Details</h3>
                <p className="text-sm text-foreground/70">Answer a few simple questions about your symptoms, medications, and history.</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-primary/10 p-4 rounded-full mb-4 ring-8 ring-primary/5">
                  <Lightbulb className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">2. Get AI Summary</h3>
                <p className="text-sm text-foreground/70">Our AI organizes your notes into a clear, structured summary for your doctor.</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-primary/10 p-4 rounded-full mb-4 ring-8 ring-primary/5">
                  <UserCheck className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">3. Be Prepared</h3>
                <p className="text-sm text-foreground/70">Walk into your appointment feeling confident, prepared, and ready to talk.</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground text-center mt-8 mb-6">
              Fill out the details below to generate a clear, structured summary for your appointment.
            </p>
            <PrepForm />
          </div>
          
          {/* Testimonials Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold font-headline text-center mb-8">What Users Are Saying</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Avatar className="h-12 w-12 mr-4">
                      <AvatarImage src="https://picsum.photos/seed/1/100/100" alt="Sarah J." data-ai-hint="woman portrait" />
                      <AvatarFallback>SJ</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">Sarah J.</p>
                      <div className="flex text-yellow-500">
                        <Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" />
                      </div>
                    </div>
                  </div>
                  <p className="text-foreground/80 italic">"I used to get so flustered at the doctor's office and forget half my questions. PrepRx organized everything perfectly. My doctor was impressed!"</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Avatar className="h-12 w-12 mr-4">
                      <AvatarImage src="https://picsum.photos/seed/2/100/100" alt="Mark T." data-ai-hint="man portrait" />
                      <AvatarFallback>MT</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">Mark T.</p>
                       <div className="flex text-yellow-500">
                        <Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" />
                      </div>
                    </div>
                  </div>
                  <p className="text-foreground/80 italic">"A game-changer for managing my chronic condition appointments. Having a structured summary makes communication with my specialist so much more effective."</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold font-headline text-center mb-8">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Is my health information secure?</AccordionTrigger>
                <AccordionContent>
                  Absolutely. We prioritize your privacy. Your data is processed securely and is not stored after you close the session. We do not ask for any personally identifiable information.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Can this replace advice from a doctor?</AccordionTrigger>
                <AccordionContent>
                  No. PrepRx is a preparation tool and does not provide medical advice. It is designed to help you communicate more effectively with your healthcare provider, not to replace their expertise.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Do I have to answer all the questions?</AccordionTrigger>
                <AccordionContent>
                  For the best results, we recommend filling out each section. The more detailed your input, the more comprehensive and helpful your AI-generated summary will be.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>Can I edit the summary after it's generated?</AccordionTrigger>
                <AccordionContent>
                  Currently, the summary is generated as a final document for clarity. However, you can always go back and adjust your inputs to generate a new summary if you forgot to add something.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </main>
      <footer className="bg-secondary text-secondary-foreground py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center gap-6 mb-4">
            <Link href="#" className="hover:text-primary transition-colors">About Us</Link>
            <Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-primary transition-colors">Contact</Link>
          </div>
          <div className="flex justify-center gap-4 mb-4">
            <Link href="#" aria-label="Twitter">
                <Twitter className="h-6 w-6 text-foreground/70 hover:text-primary transition-colors" />
            </Link>
            <Link href="#" aria-label="Facebook">
                <Facebook className="h-6 w-6 text-foreground/70 hover:text-primary transition-colors" />
            </Link>
            <Link href="#" aria-label="LinkedIn">
                <Linkedin className="h-6 w-6 text-foreground/70 hover:text-primary transition-colors" />
            </Link>
          </div>
          <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} PrepRx. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}
