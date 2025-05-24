
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

type Language = 'en' | 'ar';

const translations = {
  en: {
    hasMoney: "Has Money",
    algerian: "Algerian",
    livingInAlgeria: "Living in Algeria",
    yaKelHaram: "Illegal Money",
    toggleTo: "العربية",
    pageTitle: "Algerian Life",
    pageDescription: "A choices simulator.",
    whatIsThis: "What is this?",
    resetExperience: "Reset",
  },
  ar: {
    hasMoney: "عندو العط",
    algerian: "جزايري",
    livingInAlgeria: "عايش في الدزاير",
    yaKelHaram: "ياكل الحرام",
    toggleTo: "English",
    pageTitle: "Algerian Life", // Title remains in English as requested
    pageDescription: "A choices simulator.", // Description remains in English
    whatIsThis: "ما هذا؟",
    resetExperience: "إعادة ضبط",
  }
};

export default function AlgerianLifePage() {
  const [hasMoney, setHasMoney] = useState(false);
  const [isAlgerian, setIsAlgerian] = useState(false);
  const [isLivingInAlgeria, setIsLivingInAlgeria] = useState(false);
  const [yaKelHaram, setYaKelHaram] = useState(false);
  const [language, setLanguage] = useState<Language>('en');
  const [attemptCounter, setAttemptCounter] = useState(0);

  const handleHasMoneyChange = (checked: boolean) => {
    const previousHasMoney = hasMoney;
    setHasMoney(checked);

    if (checked && isAlgerian && isLivingInAlgeria) { // If this action would make all 3 true
        if (!previousHasMoney) { // And it was 'hasMoney' that was just turned ON
            setAttemptCounter(prev => prev + 1);
        }
        setIsAlgerian(false); // Resolve conflict: turn 'isAlgerian' OFF
    }
  };

  const handleIsAlgerianChange = (checked: boolean) => {
    const previousIsAlgerian = isAlgerian;
    setIsAlgerian(checked);

    if (checked && hasMoney && isLivingInAlgeria) { // If this action would make all 3 true
        if (!previousIsAlgerian) { // And it was 'isAlgerian' that was just turned ON
            setAttemptCounter(prev => prev + 1);
        }
        setIsLivingInAlgeria(false); // Resolve conflict: turn 'isLivingInAlgeria' OFF
    }
  };

  const handleIsLivingInAlgeriaChange = (checked: boolean) => {
    const previousIsLivingInAlgeria = isLivingInAlgeria;
    setIsLivingInAlgeria(checked);

    if (checked && hasMoney && isAlgerian) { // If this action would make all 3 true
        if (!previousIsLivingInAlgeria) { // And it was 'isLivingInAlgeria' that was just turned ON
            setAttemptCounter(prev => prev + 1);
        }
        setHasMoney(false); // Resolve conflict: turn 'hasMoney' OFF
    }
  };

  const handleYaKelHaramChange = (checked: boolean) => {
    setYaKelHaram(checked);
    if (checked) {
      setHasMoney(true);
      setIsAlgerian(true);
      setIsLivingInAlgeria(true);
    } else {
      // If "Illegal Money" is turned off, "Has Money" turns on.
      // isAlgerian and isLivingInAlgeria turn off to go back to the 3-switch system.
      setHasMoney(true);
      setIsAlgerian(false);
      setIsLivingInAlgeria(false);
    }
  };

  const resetExperience = () => {
    setHasMoney(false);
    setIsAlgerian(false);
    setIsLivingInAlgeria(false);
    setYaKelHaram(false);
    setAttemptCounter(0);
  };

  const toggleLanguage = () => {
    setLanguage(prevLang => prevLang === 'en' ? 'ar' : 'en');
  };

  const currentTranslations = translations[language];
  const showExtraSwitch = attemptCounter >= 5;
  const mainSwitchesDisabled = showExtraSwitch && yaKelHaram;

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 selection:bg-primary/40 selection:text-primary-foreground bg-background text-foreground">
      <Card className="w-full max-w-md shadow-2xl bg-card text-card-foreground">
        <CardHeader className="pb-4 relative text-center">
          <div className={`absolute top-4 ${language === 'ar' ? 'left-4' : 'right-4'}`}>
            <Button variant="ghost" size="sm" onClick={toggleLanguage} aria-label={`Switch to ${currentTranslations.toggleTo}`}>
              {currentTranslations.toggleTo}
            </Button>
          </div>
          <CardTitle className="text-2xl font-semibold tracking-tight pt-2">
            {currentTranslations.pageTitle}
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            {currentTranslations.pageDescription}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 pt-6 pb-10" dir={language === 'ar' ? 'rtl' : 'ltr'}>
          <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 shadow-md hover:shadow-lg transition-shadow duration-300">
            <Label htmlFor="money-switch" className="font-medium text-base" dir={language === 'ar' ? 'rtl' : 'ltr'}>
              {currentTranslations.hasMoney}
            </Label>
            <Switch
              id="money-switch"
              checked={hasMoney}
              onCheckedChange={handleHasMoneyChange}
              aria-label={currentTranslations.hasMoney}
              className="data-[state=checked]:bg-primary data-[state=unchecked]:bg-input"
              disabled={mainSwitchesDisabled}
            />
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 shadow-md hover:shadow-lg transition-shadow duration-300">
            <Label htmlFor="algerian-switch" className="font-medium text-base" dir={language === 'ar' ? 'rtl' : 'ltr'}>
              {currentTranslations.algerian}
            </Label>
            <Switch
              id="algerian-switch"
              checked={isAlgerian}
              onCheckedChange={handleIsAlgerianChange}
              aria-label={currentTranslations.algerian}
              className="data-[state=checked]:bg-primary data-[state=unchecked]:bg-input"
              disabled={mainSwitchesDisabled}
            />
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 shadow-md hover:shadow-lg transition-shadow duration-300">
            <Label htmlFor="living-switch" className="font-medium text-base" dir={language === 'ar' ? 'rtl' : 'ltr'}>
              {currentTranslations.livingInAlgeria}
            </Label>
            <Switch
              id="living-switch"
              checked={isLivingInAlgeria}
              onCheckedChange={handleIsLivingInAlgeriaChange}
              aria-label={currentTranslations.livingInAlgeria}
              className="data-[state=checked]:bg-primary data-[state=unchecked]:bg-input"
              disabled={mainSwitchesDisabled}
            />
          </div>

          {showExtraSwitch && (
            <div className="flex items-center justify-between p-3 rounded-lg bg-destructive/20 border border-destructive/50 shadow-md hover:shadow-lg transition-shadow duration-300 mt-4">
              <Label htmlFor="haram-switch" className="font-medium text-base text-destructive" dir={language === 'ar' ? 'rtl' : 'ltr'}>
                {currentTranslations.yaKelHaram}
              </Label>
              <Switch
                id="haram-switch"
                checked={yaKelHaram}
                onCheckedChange={handleYaKelHaramChange}
                aria-label={currentTranslations.yaKelHaram}
                className="data-[state=checked]:bg-destructive data-[state=unchecked]:bg-input"
              />
            </div>
          )}
        </CardContent>
        <CardFooter className="flex-col items-center pt-2 pb-6 space-y-3">
          {showExtraSwitch && (
            <Button variant="outline" onClick={resetExperience} className="w-full sm:w-auto">
              {currentTranslations.resetExperience}
            </Button>
          )}
          <Link href={`/about?lang=${language}`} passHref>
            <span className="text-sm text-primary hover:underline cursor-pointer">
              {currentTranslations.whatIsThis}
            </span>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
