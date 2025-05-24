
"use client"; // Required to use useSearchParams

import type { Metadata } from 'next';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation'; // Import useSearchParams
import { ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Metadata can be defined for client components but might behave differently
// For dynamic titles based on lang, you'd typically handle it in the component itself or via Head component if needed.
// export const metadata: Metadata = {
// title: 'About Algerian Life', // This will be static
// description: 'Information about the Algerian Life simulator and its developer.',
// };

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

export default function AboutPage() {
  const searchParams = useSearchParams();
  const langParam = searchParams.get('lang');
  const currentLang: 'en' | 'ar' = langParam === 'en' || langParam === 'ar' ? langParam : 'ar'; // Default to 'ar'
  
  const T = aboutTranslations[currentLang];

  // Dynamically set document title if needed (though metadata is preferred for SEO)
  if (typeof document !== 'undefined') {
    document.title = T.title;
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 selection:bg-primary/40 selection:text-primary-foreground bg-background text-foreground font-pixel" dir={currentLang === 'ar' ? 'rtl' : 'ltr'}>
      <Card className="w-full max-w-2xl shadow-2xl bg-card/80 backdrop-blur-sm border-border/50">
        <CardHeader className="pb-4 relative">
          <Link href="/" className={`absolute top-4 ${currentLang === 'ar' ? 'right-4' : 'left-4'} text-primary hover:text-primary/80 transition-colors`} aria-label={T.backToHome}>
            <ArrowLeft size={28} className={currentLang === 'ar' ? 'transform scale-x-[-1]' : ''} />
          </Link>
          <CardTitle className="text-center text-lg font-bold tracking-tight pt-2">
            {T.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 pt-6 pb-10 text-xs leading-relaxed">
          <div className="text-center">
            <p className="font-semibold text-sm">{T.developedBy}</p> 
          </div>
          
          <div className="space-y-2">
            <h2 className="text-base font-semibold text-primary">{T.supportTitle}</h2>
            <p>
              {T.supportMessage}
            </p>
            <p>{T.supportVia}</p>
            <ul className={`list-disc list-inside space-y-1 ${currentLang === 'ar' ? 'pr-4' : 'pl-4'}`}>
              <li>
                <strong>{T.binance}</strong> {T.binanceDetail} <span className="font-mono text-primary text-xs">91561758</span>
              </li>
              <li>
                <strong>{T.mexc}</strong> {T.mexcDetail} <span className="font-mono text-primary text-xs">72844962</span>
              </li>
            </ul>
          </div>

          <div className="space-y-2">
            <h2 className="text-base font-semibold text-primary">{T.contactTitle}</h2>
            <p>
              {T.contactMessage} <a href="mailto:its.amin.djellab@gmail.com" className="text-primary hover:underline">its.amin.djellab@gmail.com</a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
