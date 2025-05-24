
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'; // Removed CardDescription as it's not used here.

export const metadata: Metadata = {
  title: 'About Algerian Life',
  description: 'Information about the Algerian Life simulator and its developer.',
};

// Minimal translations for this page, can be expanded later if needed
const aboutTranslations = {
  en: {
    title: "About Algerian Life",
    backToHome: "Back to home",
    developedBy: "Developed by Amin Djellab",
    supportTitle: "Support My Work",
    supportMessage: "If you enjoy Algerian Life Simulator and would like to support my journey in the game development industry, any contribution would be greatly appreciated and help me continue to learn and create.",
    supportVia: "You can send support via:",
    binance: "Binance:",
    binanceDetail: "Using my UID:",
    mexc: "MEXC:",
    mexcDetail: "Using my UID:",
    contactTitle: "Contact",
    contactMessage: "You can contact me via email at:",
  },
  ar: {
    title: "حول حياة جزائرية",
    backToHome: "العودة للرئيسية",
    developedBy: "تم التطوير بواسطة أمين جلاب",
    supportTitle: "ادعم عملي",
    supportMessage: "إذا كنت تستمتع بمحاكي الحياة الجزائرية وترغب في دعم رحلتي في صناعة تطوير الألعاب، فإن أي مساهمة ستكون موضع تقدير كبير وستساعدني على مواصلة التعلم والابتكار.",
    supportVia: "يمكنك إرسال الدعم عبر:",
    binance: "بينانس:",
    binanceDetail: "باستخدام UID الخاص بي:",
    mexc: "MEXC:",
    mexcDetail: "باستخدام UID الخاص بي:",
    contactTitle: "اتصل بي",
    contactMessage: "يمكنك الاتصال بي عبر البريد الإلكتروني:",
  }
};

// Simple way to get language preference, defaults to 'ar'
// In a real app, this might come from a global context or localStorage
// For now, keeping it simple as it's not actively switchable on this page without more setup.
const preferredLang: 'en' | 'ar' = 'ar'; // Default to Arabic as per request for main page
const T = aboutTranslations[preferredLang];


export default function AboutPage() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 selection:bg-primary/40 selection:text-primary-foreground bg-background text-foreground font-pixel" dir={preferredLang === 'ar' ? 'rtl' : 'ltr'}>
      <Card className="w-full max-w-2xl shadow-2xl bg-card/80 backdrop-blur-sm border-border/50">
        <CardHeader className="pb-4 relative">
          <Link href="/" className={`absolute top-4 ${preferredLang === 'ar' ? 'right-4' : 'left-4'} text-primary hover:text-primary/80 transition-colors`} aria-label={T.backToHome}>
            <ArrowLeft size={28} className={preferredLang === 'ar' ? 'transform scale-x-[-1]' : ''} />
          </Link>
          <CardTitle className="text-center text-2xl font-bold tracking-tight pt-2">
            {T.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 pt-6 pb-10 text-base leading-relaxed"> {/* Adjusted text size for pixel font */}
          <div className="text-center">
            <p className="font-semibold text-lg">{T.developedBy}</p>
          </div>
          
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-primary">{T.supportTitle}</h2>
            <p>
              {T.supportMessage}
            </p>
            <p>{T.supportVia}</p>
            <ul className={`list-disc list-inside space-y-1 ${preferredLang === 'ar' ? 'pr-4' : 'pl-4'}`}>
              <li>
                <strong>{T.binance}</strong> {T.binanceDetail} <span className="font-mono text-primary text-sm">91561758</span>
              </li>
              <li>
                <strong>{T.mexc}</strong> {T.mexcDetail} <span className="font-mono text-primary text-sm">72844962</span>
              </li>
            </ul>
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-primary">{T.contactTitle}</h2>
            <p>
              {T.contactMessage} <a href="mailto:its.amin.djellab@gmail.com" className="text-primary hover:underline">its.amin.djellab@gmail.com</a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
