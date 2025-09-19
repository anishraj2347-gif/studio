import PrepForm from '@/components/prep-form';
import { Stethoscope } from 'lucide-react';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8 md:p-12 lg:p-24">
      <div className="w-full max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-block bg-primary/10 p-4 rounded-full mb-4">
             <Stethoscope className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">PrepRx</h1>
          <p className="text-lg text-foreground/80 mt-2 max-w-xl mx-auto">
            Your personal assistant to prepare for a productive doctor's visit.
            Fill out the details below to generate a clear summary for your appointment.
          </p>
        </div>
        <PrepForm />
      </div>
    </main>
  );
}
