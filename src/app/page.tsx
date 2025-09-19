import PrepForm from '@/components/prep-form';
import { Stethoscope, Lightbulb, UserCheck, FileText, Twitter, Linkedin, Facebook } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow flex flex-col items-center justify-center p-4 sm:p-8 md:p-12 lg:p-24">
        <div className="w-full max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block bg-primary/10 p-4 rounded-full mb-4">
              <Stethoscope className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">PrepRx</h1>
            <p className="text-lg text-foreground/80 mt-2 max-w-2xl mx-auto">
              Your personal assistant to prepare for a productive doctor's visit.
            </p>
          </div>

          <div className="bg-card border rounded-lg p-6 md:p-8 mb-12 shadow-sm">
            <h2 className="text-2xl font-bold font-headline text-center mb-6">How it Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="flex flex-col items-center">
                <div className="bg-primary/10 p-3 rounded-full mb-3">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-1">1. Fill in Details</h3>
                <p className="text-sm text-foreground/70">Answer a few simple questions about your health.</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-primary/10 p-3 rounded-full mb-3">
                  <Lightbulb className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-1">2. Get AI Summary</h3>
                <p className="text-sm text-foreground/70">Our AI organizes your notes into a clear, structured summary.</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-primary/10 p-3 rounded-full mb-3">
                  <UserCheck className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-1">3. Be Prepared</h3>
                <p className="text-sm text-foreground/70">Walk into your appointment feeling confident and prepared.</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground text-center mt-6">
              Fill out the details below to generate a clear summary for your appointment.
            </p>
          </div>

          <PrepForm />

          <div className="mt-12 text-center border-t pt-8">
            <h2 className="text-2xl font-bold font-headline mb-4">Why it Helps</h2>
            <p className="max-w-2xl mx-auto text-foreground/80">
              Organizing your thoughts before a doctor's visit can lead to better communication, a more accurate diagnosis, and a more effective treatment plan. PrepRx helps you structure your concerns and questions, ensuring you don't forget anything important.
            </p>
          </div>
        </div>
      </main>
      <footer className="bg-secondary text-secondary-foreground py-8">
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
