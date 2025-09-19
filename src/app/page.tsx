import PrepForm from '@/components/prep-form';
import { Stethoscope, Lightbulb, UserCheck, FileText, Twitter, Linkedin, Facebook, Star, HeartHandshake, Pill, ShieldCheck, MessageCircle, Clock } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChatBot } from '@/components/chat-bot';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <Link href="#" className="flex items-center gap-2 font-bold text-lg text-primary">
            <Stethoscope className="w-6 h-6" />
            <span>PrepRx</span>
          </Link>
          <nav className="ml-auto hidden md:flex gap-4 sm:gap-6">
            <Link
              href="#how-it-works"
              className="text-sm font-medium hover:underline underline-offset-4"
            >
              How It Works
            </Link>
            <Link
              href="#why-it-matters"
              className="text-sm font-medium hover:underline underline-offset-4"
            >
              Why It Matters
            </Link>
             <Link
              href="#testimonials"
              className="text-sm font-medium hover:underline underline-offset-4"
            >
              Testimonials
            </Link>
            <Link
              href="#faq"
              className="text-sm font-medium hover:underline underline-offset-4"
            >
              FAQ
            </Link>
            <Link href="#get-started">
              <Button size="sm">Get Started</Button>
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-grow flex flex-col items-center justify-center p-4 sm:p-8 md:p-12 lg:p-24">
        <div className="w-full max-w-5xl mx-auto">
          {/* Hero Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center text-center md:text-left mb-24">
            <div>
              <div className="inline-block bg-primary/10 p-4 rounded-full mb-4">
                <Stethoscope className="w-12 h-12 text-primary" />
              </div>
              <h1 className="text-5xl md:text-6xl font-bold font-headline text-primary tracking-tight">Prepare for Your Doctor Appointment with Confidence</h1>
              <p className="text-lg md:text-xl text-foreground/80 mt-4 max-w-3xl">
                Never forget symptoms, medications, or questions again during your consultation. Our simple web app helps you organize your health details clearly — so you and your doctor can focus on what matters most.
              </p>
              <Link href="#get-started">
                <Button size="lg" className="mt-8">
                  Get Started Now — It’s Free and Easy!
                </Button>
              </Link>
            </div>
            <div className="relative h-80 w-full rounded-2xl overflow-hidden shadow-2xl">
                 <Image 
                    src="https://picsum.photos/seed/doctor/800/600"
                    alt="Doctor and patient consultation"
                    fill
                    className="object-cover"
                    data-ai-hint="doctor patient"
                 />
            </div>
          </div>

          {/* How It Works Section */}
          <div id="how-it-works" className="bg-card border rounded-2xl p-6 md:p-10 mb-16 shadow-lg animate-in fade-in slide-in-from-bottom-10 duration-500 scroll-mt-20">
            <h2 className="text-3xl font-bold font-headline text-center mb-8">How Our Appointment Prep Tool Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center mb-8">
              <div className="flex flex-col items-center">
                <div className="bg-primary/10 p-4 rounded-full mb-4 ring-8 ring-primary/5">
                  <FileText className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Step 1: Enter Details</h3>
                <p className="text-sm text-foreground/70">Enter your symptoms, medications, medical history, and questions in an easy-to-use form.</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-primary/10 p-4 rounded-full mb-4 ring-8 ring-primary/5">
                  <Lightbulb className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Step 2: Generate Summary</h3>
                <p className="text-sm text-foreground/70">Generate a clean, printable summary of your health updates to take to your doctor.</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-primary/10 p-4 rounded-full mb-4 ring-8 ring-primary/5">
                  <UserCheck className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Step 3: Review Together</h3>
                <p className="text-sm text-foreground/70">Review together and ensure important details aren’t missed—making your appointment smoother and more productive.</p>
              </div>
            </div>
          </div>

           {/* Why It Matters Section */}
          <div id="why-it-matters" className="mb-16 animate-in fade-in slide-in-from-bottom-10 duration-700 scroll-mt-20">
            <h2 className="text-3xl font-bold font-headline text-center mb-8">Why Preparation Improves Your Care</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-center">
              <Card className="p-6 flex flex-col items-center">
                 <HeartHandshake className="w-10 h-10 text-primary mb-4" />
                 <h3 className="font-semibold mb-2">Capture Symptoms</h3>
                 <p className="text-sm text-muted-foreground">Capture important symptoms you may forget in the moment.</p>
              </Card>
              <Card className="p-6 flex flex-col items-center">
                 <Pill className="w-10 h-10 text-primary mb-4" />
                 <h3 className="font-semibold mb-2">Track Medications</h3>
                 <p className="text-sm text-muted-foreground">Keep track of medications and dosages accurately.</p>
              </Card>
              <Card className="p-6 flex flex-col items-center">
                 <MessageCircle className="w-10 h-10 text-primary mb-4" />
                 <h3 className="font-semibold mb-2">Clarify Questions</h3>
                 <p className="text-sm text-muted-foreground">Clarify your questions and concerns beforehand.</p>
              </Card>
              <Card className="p-6 flex flex-col items-center">
                 <ShieldCheck className="w-10 h-10 text-primary mb-4" />
                 <h3 className="font-semibold mb-2">Enhance Communication</h3>
                 <p className="text-sm text-muted-foreground">Enhance communication with your doctor for better diagnosis.</p>
              </Card>
              <Card className="p-6 flex flex-col items-center">
                 <Clock className="w-10 h-10 text-primary mb-4" />
                 <h3 className="font-semibold mb-2">Save Time & Reduce Anxiety</h3>
                 <p className="text-sm text-muted-foreground">Save time and reduce anxiety during appointments.</p>
              </Card>
              <Card className="p-6 bg-primary/10 flex flex-col items-center justify-center">
                 <p className="text-sm text-primary italic">"This tool was a lifesaver. I felt so much more in control during my last visit." - Jane D.</p>
              </Card>
            </div>
          </div>

          {/* Form Section */}
          <div id="get-started" className="bg-card border rounded-2xl p-6 md:p-10 mb-16 shadow-lg animate-in fade-in slide-in-from-bottom-10 duration-900 scroll-mt-20">
             <div className="text-center mb-8">
              <h2 className="text-3xl font-bold font-headline">Ready for Your Next Appointment?</h2>
              <p className="text-muted-foreground mt-2">Take control of your healthcare journey today with our free, no-login tool.</p>
            </div>
            <PrepForm />
          </div>
          
          {/* Testimonials Section */}
          <div id="testimonials" className="mb-16 animate-in fade-in slide-in-from-bottom-10 duration-1000 scroll-mt-20">
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
          <div id="faq" className="max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-10 duration-1000 scroll-mt-20">
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
                <AccordionTrigger>Is this service free to use?</AccordionTrigger>
                <AccordionContent>
                  Yes, our core features are completely free. We believe everyone should have access to tools that help them manage their health effectively.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>How long does it take to prepare a summary?</AccordionTrigger>
                <AccordionContent>
                  It only takes a few minutes to fill out the form. The AI-enhanced summary is generated almost instantly, saving you time and stress before your appointment.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </main>
      <footer className="bg-card border-t w-full">
        <div className="max-w-4xl mx-auto py-6 px-4 md:px-8 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} PrepRx. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0 items-center">
            <Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link>
            <div className="flex gap-2">
              <Link href="#" className="hover:text-primary transition-colors"><Twitter /></Link>
              <Link href="#" className="hover:text-primary transition-colors"><Linkedin /></Link>
              <Link href="#" className="hover:text-primary transition-colors"><Facebook /></Link>
            </div>
          </div>
        </div>
      </footer>
      <ChatBot />
    </div>
  );
}
