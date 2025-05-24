
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'About Algerian Life',
  description: 'Information about the Algerian Life simulator and its developer.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 selection:bg-primary/40 selection:text-primary-foreground bg-background text-foreground">
      <Card className="w-full max-w-2xl shadow-2xl bg-card/80 backdrop-blur-sm border-border/50">
        <CardHeader className="pb-4 relative">
          <Link href="/" className="absolute top-4 left-4 text-primary hover:text-primary/80 transition-colors" aria-label="Back to home">
            <ArrowLeft size={28} />
          </Link>
          <CardTitle className="text-center text-3xl font-bold tracking-tight pt-2">
            About Algerian Life
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 pt-6 pb-10 text-lg leading-relaxed">
          <div className="text-center">
            <p className="font-semibold text-xl">Developed by Amin Djellab</p>
          </div>
          
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold text-primary">Support My Work</h2>
            <p>
              If you enjoy Algerian Life Simulator and would like to support my journey in the 
              game development industry, any contribution would be greatly appreciated and 
              help me continue to learn and create.
            </p>
            <p>You can send support via:</p>
            <ul className="list-disc list-inside space-y-1 pl-4">
              <li>
                <strong>Binance:</strong> Using my UID: <span className="font-mono text-primary">91561758</span>
              </li>
              <li>
                <strong>MEXC:</strong> Using my UID: <span className="font-mono text-primary">72844962</span>
              </li>
            </ul>
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-semibold text-primary">Contact</h2>
            <p>
              You can contact me via email at: <a href="mailto:its.amin.djellab@gmail.com" className="text-primary hover:underline">its.amin.djellab@gmail.com</a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
