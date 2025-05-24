
"use client";

import type { Metadata } from 'next';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// export const metadata: Metadata = { // Metadata should be static or generated on server
//   title: 'About Algerian Life Sim',
//   description: 'Information about the Algerian Life sim and its developer.',
// };

type Language = 'en' | 'ar';

const aboutTranslations = {
  en: {
    title: 'About Algerian Life Sim',
    backToHome: "Back to home",
    intro: "Algerian Life Sim is an artistic way to explain how life in Algeria is m9awda.",
    developedBy: "Developed by",
    developerName: "Mohammed Amin Djellab",
    supportTitle: "Support My Work",
    supportMessage: "If you enjoy Algerian Life Simulator and would like to support my journey in the game development industry, any contribution would be greatly appreciated and help me continue to learn and create.",
    supportVia: "You can send support via:",
    binanceUID: "Binance: Using my UID:",
    mexcUID: "MEXC: Using my UID:",
    contactTitle: "Contact",
    contactMessage: "You can contact me via email at:",
  },
  ar: {
    title: 'حول محاكي الحياة الجزائرية',
    backToHome: "العودة إلى الرئيسية",
    intro: "محاكي الحياة الجزائرية هو طريقة فنية لشرح كيف أن الحياة في الجزائر مقودة.",
    developedBy: "تم التطوير بواسطة",
    developerName: "محمد أمين جلاب",
    supportTitle: "ادعم عملي",
    supportMessage: "إذا استمتعت بمحاكي الحياة الجزائرية وترغب في دعم رحلتي في صناعة تطوير الألعاب، فإن أي مساهمة ستكون موضع تقدير كبير وستساعدني على مواصلة التعلم والإنشاء.",
    supportVia: "يمكنك إرسال الدعم عبر:",
    binanceUID: "باينانس: باستخدام UID الخاص بي:",
    mexcUID: "MEXC: باستخدام UID الخاص بي:",
    contactTitle: "اتصل بي",
    contactMessage: "يمكنك التواصل معي عبر البريد الإلكتروني:",
  }
};


export default function AboutPage() {
  const searchParams = useSearchParams();
  const langQuery = searchParams.get('lang');
  const currentLang: Language = (langQuery === 'ar' || langQuery === 'en') ? langQuery : 'en'; // Default to 'en' if no valid lang
  const t = aboutTranslations[currentLang];

  // It's better to set metadata in a parent layout or dynamically if needed,
  // but for a client component, you might use `useEffect` to set document.title if essential.
  // useEffect(() => {
  //   document.title = t.title;
  // }, [t.title]);


  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 selection:bg-primary/40 selection:text-primary-foreground bg-background text-foreground" dir={currentLang === 'ar' ? 'rtl' : 'ltr'}>
      <Card className="w-full max-w-2xl shadow-2xl bg-card text-card-foreground">
        <CardHeader className="pb-4 relative">
          <Link href={`/?lang=${currentLang}`} className={`absolute top-4 ${currentLang === 'ar' ? 'right-4' : 'left-4'} text-primary hover:text-primary/80 transition-colors`} aria-label={t.backToHome}>
            <ArrowLeft size={28} className={currentLang === 'ar' ? 'transform scale-x-[-1]' : ''}/>
          </Link>
          <CardTitle className="text-center text-2xl font-semibold tracking-tight pt-2">
            {t.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 pt-6 pb-10">
          <div className="text-center">
            <p className="text-base leading-relaxed">
              {t.intro}
            </p>
            <p className="text-sm text-muted-foreground mt-4">{t.developedBy}</p>
            <p className="font-semibold text-lg">{t.developerName}</p>
          </div>

          <div className="space-y-2 text-center">
            <h2 className="text-xl font-semibold text-primary">{t.supportTitle}</h2>
            <p className="text-base leading-relaxed">
              {t.supportMessage}
            </p>
            <p className="text-base">{t.supportVia}</p>
            <ul className="list-none space-y-1 text-base">
              <li>
                {t.binanceUID} <span className="font-mono text-primary text-sm">91561758</span>
              </li>
              <li>
                {t.mexcUID} <span className="font-mono text-primary text-sm">72844962</span>
              </li>
            </ul>
          </div>

          <div className="space-y-2 text-center">
            <h2 className="text-xl font-semibold text-primary">{t.contactTitle}</h2>
            <p className="text-base leading-relaxed">
              {t.contactMessage} <a href="mailto:its.amin.djellab@gmail.com" className="text-primary hover:underline">its.amin.djellab@gmail.com</a>
            </p>
          </div>
          
          <div className={`mt-8 text-xs text-muted-foreground opacity-60 ${currentLang === 'ar' ? 'text-left' : 'text-right'}`}>
            <p>D-2646</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
