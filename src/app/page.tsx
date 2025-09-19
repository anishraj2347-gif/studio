import Link from 'next/link';
import Image from 'next/image';
import { Stethoscope, ArrowRight, CircleCheckBig, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';


export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg text-primary">
            <Stethoscope className="w-6 h-6" />
            <span>PrepRx</span>
          </Link>
          <nav className="hidden md:flex gap-6 items-center">
            <Link href="#features" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              Features
            </Link>
            <Link href="#testimonials" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              Testimonials
            </Link>
            <Link href="#about" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              About
            </Link>
          </nav>
          <Link href="/prepare">
            <Button>
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 bg-gradient-to-b from-primary/5 to-transparent">
          <div className="container grid md:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col items-start text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-headline text-primary tracking-tight">
                Walk into your doctor's office, fully prepared.
              </h1>
              <p className="mt-6 text-lg md:text-xl text-foreground/80 max-w-2xl">
                PrepRx helps you organize your health concerns into a clear, structured summary, designed with medical expertise to ensure you have the most productive conversation with your doctor.
              </p>
              <Link href="/prepare">
                <Button size="lg" className="mt-8">
                  Start Preparing Now
                  <ArrowRight className="ml-2" />
                </Button>
              </Link>
            </div>
            <div className="relative h-80 md:h-full w-full">
              <Image
                src="https://picsum.photos/seed/doctor-consult/800/600"
                alt="Doctor consulting with a patient"
                fill
                className="object-cover rounded-2xl shadow-xl"
                data-ai-hint="doctor patient consultation"
              />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 md:py-24 bg-background scroll-mt-20">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold font-headline">Better Visits Start with Better Preparation</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Our tool is crafted to address the common pitfalls of a rushed doctor's visit, ensuring every minute counts.
              </p>
            </div>
            <div className="mt-16 grid md:grid-cols-3 gap-8">
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <div className="bg-primary/10 text-primary p-3 rounded-full w-fit mb-4">
                    <Stethoscope className="w-8 h-8" />
                  </div>
                  <CardTitle>Designed with Doctors</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  The summary format is structured based on what doctors find most helpful, using methods like STAR to present your symptoms clearly and concisely.
                </CardContent>
              </Card>
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <div className="bg-accent/10 text-accent p-3 rounded-full w-fit mb-4">
                    <CircleCheckBig className="w-8 h-8" />
                  </div>
                  <CardTitle>Comprehensive & Clear</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  Cover all your bases—from symptoms and medications to your specific questions. Our AI helps refine your notes into a professional, easy-to-read document.
                </CardContent>
              </Card>
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <div className="bg-primary/10 text-primary p-3 rounded-full w-fit mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-shield-half"
                    >
                      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
                      <path d="M12 22V2" />
                    </svg>
                  </div>
                  <CardTitle>Private and Secure</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  Your privacy is paramount. We don't require a login and your information is not stored after you leave. Prepare with peace of mind.
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-20 md:py-24 bg-muted/50 scroll-mt-20">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold font-headline">Loved by Patients and Appreciated by Doctors</h2>
            </div>
            <div className="mt-12 grid lg:grid-cols-2 gap-8">
              <Card className="bg-background">
                <CardContent className="p-8">
                  <Quote className="w-8 h-8 text-primary mb-4" />
                  <p className="text-lg italic text-foreground/90">
                    "This is exactly what I need. I always felt like my doctor was rushing, but with my PrepRx summary, our conversation was focused and I finally got the answers I needed."
                  </p>
                  <div className="flex items-center mt-6">
                    <Avatar className="h-12 w-12 mr-4">
                      <AvatarImage
                        src="https://picsum.photos/seed/jane/100/100"
                        alt="Jane D."
                        data-ai-hint="woman portrait"
                      />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">Jane D.</p>
                      <p className="text-sm text-muted-foreground">Patient</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-background">
                <CardContent className="p-8">
                  <Quote className="w-8 h-8 text-primary mb-4" />
                  <p className="text-lg italic text-foreground/90">
                    "A patient brought in one of these summaries and it was a breath of fresh air. It was clear, organized, and saved us valuable time. I wish more of my patients used this."
                  </p>
                  <div className="flex items-center mt-6">
                    <Avatar className="h-12 w-12 mr-4">
                      <AvatarImage
                        src="https://picsum.photos/seed/doc-smith/100/100"
                        alt="Dr. Smith"
                        data-ai-hint="man portrait professional"
                      />
                      <AvatarFallback>DS</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">Dr. Amanda Smith</p>
                      <p className="text-sm text-muted-foreground">General Practitioner</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 md:py-24 bg-background scroll-mt-20">
          <div className="container grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold font-headline text-primary">From a simple idea to a powerful tool.</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                PrepRx was born from a common experience: the frustration of leaving a doctor's appointment feeling unheard. We believe that better healthcare outcomes start with better communication. Our mission is to empower patients to take an active role in their health by providing a simple, effective tool for appointment preparation.
              </p>
            </div>
            <div className="relative h-80 w-full">
               <Image
                src="https://picsum.photos/seed/medical-team/800/600"
                alt="Diverse team of medical professionals"
                fill
                className="object-cover rounded-2xl shadow-xl"
                data-ai-hint="medical team professional"
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 md:py-32 bg-primary/5">
          <div className="container text-center">
            <h2 className="text-3xl md:text-4xl font-bold font-headline">Ready for a more confident doctor's visit?</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Take the first step towards a more productive conversation with your healthcare provider. It’s free, secure, and takes only a few minutes.
            </p>
            <Link href="/prepare">
                <Button size="lg" className="mt-8">
                    Create Your Free Summary
                    <ArrowRight className="ml-2" />
                </Button>
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-background border-t">
        <div className="container py-8 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} PrepRx. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0 items-center">
            <Link href="/" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="/" className="hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
