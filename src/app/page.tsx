
"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button'; // Import Button

type Language = 'en' | 'ar';

const translations = {
  en: {
    hasMoney: "Has Money",
    algerian: "Algerian",
    livingInAlgeria: "Living in Algeria",
    toggleTo: "العربية",
    pageTitle: "Algerian Life",
    pageDescription: "A choices simulator.",
    whatIsThis: "What is this?",
  },
  ar: {
    hasMoney: "عندو العط",
    algerian: "جزايري",
    livingInAlgeria: "عايش في الدزاير",
    toggleTo: "English",
    pageTitle: "Algerian Life", // Stays English as requested
    pageDescription: "A choices simulator.", // Stays English as requested
    whatIsThis: "ما هذا؟", // Optional: translate this as well for consistency if desired
  }
};

export default function AlgerianLifePage() {
  const [hasMoney, setHasMoney] = useState(false);
  const [isAlgerian, setIsAlgerian] = useState(false);
  const [isLivingInAlgeria, setIsLivingInAlgeria] = useState(false);
  const [language, setLanguage] = useState<Language>('en');

  const handleHasMoneyChange = (checked: boolean) => {
    setHasMoney(checked);
    if (checked && isAlgerian && isLivingInAlgeria) {
      setIsAlgerian(false);
    }
  };

  const handleIsAlgerianChange = (checked: boolean) => {
    setIsAlgerian(checked);
    if (checked && hasMoney && isLivingInAlgeria) {
      setIsLivingInAlgeria(false);
    }
  };

  const handleIsLivingInAlgeriaChange = (checked: boolean) => {
    setIsLivingInAlgeria(checked);
    if (checked && hasMoney && isAlgerian) {
      setHasMoney(false);
    }
  };

  const toggleLanguage = () => {
    setLanguage(prevLang => prevLang === 'en' ? 'ar' : 'en');
  };

  const currentTranslations = translations[language];

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 selection:bg-primary/40 selection:text-primary-foreground bg-background text-foreground">
      <Card className="w-full max-w-md shadow-2xl bg-card text-card-foreground">
        <CardHeader className="pb-4 relative text-center">
          <div className="absolute top-4 right-4">
            <Button variant="ghost" size="sm" onClick={toggleLanguage} aria-label={`Switch to ${currentTranslations.toggleTo}`}>
              {currentTranslations.toggleTo}
            </Button>
          </div>
          <CardTitle>
            {currentTranslations.pageTitle}
          </CardTitle>
          <CardDescription>
            {currentTranslations.pageDescription}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 pt-6 pb-10" dir={language === 'ar' ? 'rtl' : 'ltr'}>
          <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 shadow-md hover:shadow-lg transition-shadow duration-300">
            <Label htmlFor="money-switch" className="font-medium" dir={language === 'ar' ? 'rtl' : 'ltr'}>
              {currentTranslations.hasMoney}
            </Label>
            <Switch
              id="money-switch"
              checked={hasMoney}
              onCheckedChange={handleHasMoneyChange}
              aria-label={currentTranslations.hasMoney}
              className="data-[state=checked]:bg-primary data-[state=unchecked]:bg-input"
            />
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 shadow-md hover:shadow-lg transition-shadow duration-300">
            <Label htmlFor="algerian-switch" className="font-medium" dir={language === 'ar' ? 'rtl' : 'ltr'}>
              {currentTranslations.algerian}
            </Label>
            <Switch
              id="algerian-switch"
              checked={isAlgerian}
              onCheckedChange={handleIsAlgerianChange}
              aria-label={currentTranslations.algerian}
              className="data-[state=checked]:bg-primary data-[state=unchecked]:bg-input"
            />
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 shadow-md hover:shadow-lg transition-shadow duration-300">
            <Label htmlFor="living-switch" className="font-medium" dir={language === 'ar' ? 'rtl' : 'ltr'}>
              {currentTranslations.livingInAlgeria}
            </Label>
            <Switch
              id="living-switch"
              checked={isLivingInAlgeria}
              onCheckedChange={handleIsLivingInAlgeriaChange}
              aria-label={currentTranslations.livingInAlgeria}
              className="data-[state=checked]:bg-primary data-[state=unchecked]:bg-input"
            />
          </div>
        </CardContent>
        <CardFooter className="flex-col items-center pt-2 pb-6">
          <Link href="/about" passHref>
            <span className="text-sm text-primary hover:underline cursor-pointer">
              {currentTranslations.whatIsThis}
            </span>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
