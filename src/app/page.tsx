
"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { HelpCircle, Languages } from 'lucide-react';

const translations = {
  en: {
    title: "Algerian Life",
    description: "A choices simulator.",
    hasMoney: "Has Money",
    isAlgerian: "Algerian",
    isLivingInAlgeria: "Living in Algeria",
    languageToggle: "العربية",
    about: "About",
    backToHome: "Back to home"
  },
  ar: {
    title: "حياة جزائرية",
    description: "محاكي خيارات.",
    hasMoney: "عندو دراهم",
    isAlgerian: "جزايري",
    isLivingInAlgeria: "عايش في الدزاير",
    languageToggle: "English",
    about: "حول",
    backToHome: "العودة للرئيسية"
  }
};

export default function AlgerianLifePage() {
  const [hasMoney, setHasMoney] = useState(false);
  const [isAlgerian, setIsAlgerian] = useState(false);
  const [isLivingInAlgeria, setIsLivingInAlgeria] = useState(false);
  const [language, setLanguage] = useState<'en' | 'ar'>('ar'); // Default to Arabic

  const currentTranslations = translations[language];

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

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 selection:bg-primary/40 selection:text-primary-foreground relative font-pixel">
      <div className="absolute top-6 left-6 flex gap-4 items-center">
        <Link href="/about" className="text-primary hover:text-primary/80 transition-colors" aria-label={currentTranslations.about}>
          <HelpCircle size={28} />
        </Link>
      </div>
      <Button
        variant="outline"
        size="icon"
        onClick={toggleLanguage}
        className="absolute top-6 right-6 text-primary hover:text-primary/80 transition-colors border-primary hover:bg-primary/10"
        aria-label={`Switch to ${language === 'en' ? 'Arabic' : 'English'}`}
      >
        <Languages size={20} />
      </Button>
      
      <Card className="w-full max-w-lg shadow-2xl bg-card/80 backdrop-blur-sm border-border/50" dir={language === 'ar' ? 'rtl' : 'ltr'}>
        <CardHeader className="pb-4 text-center">
          <div className="mx-auto mb-3">
            <Image 
              src="https://placehold.co/40x40.png" 
              alt="Algerian Life Logo" 
              width={40} 
              height={40}
              data-ai-hint="pixel algerian heart flag"
              className="rounded-sm"
            />
          </div>
          <CardTitle className="text-3xl font-extrabold tracking-tight">
            {currentTranslations.title}
          </CardTitle>
          <CardDescription className="text-muted-foreground text-base pt-1">
            {currentTranslations.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8 pt-6 pb-10">
          <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 shadow-md hover:shadow-lg transition-shadow duration-300">
            <Label htmlFor="money-switch" className="text-lg font-medium">
              {currentTranslations.hasMoney}
            </Label>
            <Switch
              id="money-switch"
              checked={hasMoney}
              onCheckedChange={handleHasMoneyChange}
              aria-label={`Toggle ${currentTranslations.hasMoney} status`}
              className="data-[state=checked]:bg-primary data-[state=unchecked]:bg-muted"
            />
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 shadow-md hover:shadow-lg transition-shadow duration-300">
            <Label htmlFor="algerian-switch" className="text-lg font-medium">
              {currentTranslations.isAlgerian}
            </Label>
            <Switch
              id="algerian-switch"
              checked={isAlgerian}
              onCheckedChange={handleIsAlgerianChange}
              aria-label={`Toggle ${currentTranslations.isAlgerian} status`}
              className="data-[state=checked]:bg-primary data-[state=unchecked]:bg-muted"
            />
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 shadow-md hover:shadow-lg transition-shadow duration-300">
            <Label htmlFor="living-switch" className="text-lg font-medium">
              {currentTranslations.isLivingInAlgeria}
            </Label>
            <Switch
              id="living-switch"
              checked={isLivingInAlgeria}
              onCheckedChange={handleIsLivingInAlgeriaChange}
              aria-label={`Toggle ${currentTranslations.isLivingInAlgeria} status`}
              className="data-[state=checked]:bg-primary data-[state=unchecked]:bg-muted"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
