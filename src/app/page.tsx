
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
    oneInAThousand: "You are one in a thousand",
    toggleTo: "الدارجة",
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
    oneInAThousand: "نتا واحد في الالف",
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
  const [language, setLanguage] = useState<Language>('en');
  const [attemptCounter, setAttemptCounter] = useState(0);
  const [yaKelHaram, setYaKelHaram] = useState(false);
  const [showYaKelHaramSwitch, setShowYaKelHaramSwitch] = useState(false);
  const [oneInAThousand, setOneInAThousand] = useState(false);
  const [showOneInAThousandSwitch, setShowOneInAThousandSwitch] = useState(false);

  const currentTranslations = translations[language];

  const handleMainSwitchToggle = (
    switchName: 'hasMoney' | 'isAlgerian' | 'isLivingInAlgeria'
  ) => {
    if (yaKelHaram || oneInAThousand) {
      // If super switches are active, main switches operate independently
      if (switchName === 'hasMoney') setHasMoney(!hasMoney);
      if (switchName === 'isAlgerian') setIsAlgerian(!isAlgerian);
      if (switchName === 'isLivingInAlgeria') setIsLivingInAlgeria(!isLivingInAlgeria);
      return;
    }

    let newHasMoney = hasMoney;
    let newIsAlgerian = isAlgerian;
    let newIsLivingInAlgeria = isLivingInAlgeria;
    let justTurnedOn = false;

    // Determine the new state of the toggled switch
    if (switchName === 'hasMoney') {
      newHasMoney = !hasMoney;
      justTurnedOn = newHasMoney;
    } else if (switchName === 'isAlgerian') {
      newIsAlgerian = !isAlgerian;
      justTurnedOn = newIsAlgerian;
    } else if (switchName === 'isLivingInAlgeria') {
      newIsLivingInAlgeria = !isLivingInAlgeria;
      justTurnedOn = newIsLivingInAlgeria;
    }
    
    const currentlyOnCount = (newHasMoney ? 1:0) + (newIsAlgerian ? 1:0) + (newIsLivingInAlgeria ? 1:0);

    if (justTurnedOn && currentlyOnCount === 3) { // Trying to turn on the 3rd switch
      const newAttemptCounter = attemptCounter + 1;
      setAttemptCounter(newAttemptCounter);

      if (newAttemptCounter >= 5) {
        setShowYaKelHaramSwitch(true);
        setYaKelHaram(true); // Automatically turn on Illegal Money
        setHasMoney(true);
        setIsAlgerian(true);
        setIsLivingInAlgeria(true);
      } else {
        // Enforce 2-of-3 rule by turning one off
        if (switchName === 'hasMoney') setIsAlgerian(false);
        else if (switchName === 'isAlgerian') setIsLivingInAlgeria(false);
        else if (switchName === 'isLivingInAlgeria') setHasMoney(false);
        
        // Apply the toggled switch's new state
        if (switchName === 'hasMoney') setHasMoney(newHasMoney);
        if (switchName === 'isAlgerian') setIsAlgerian(newIsAlgerian);
        if (switchName === 'isLivingInAlgeria') setIsLivingInAlgeria(newIsLivingInAlgeria);
      }
    } else {
      // Apply the new state directly if not triggering the 3-on scenario or if turning a switch off
      setHasMoney(newHasMoney);
      setIsAlgerian(newIsAlgerian);
      setIsLivingInAlgeria(newIsLivingInAlgeria);
    }
  };


  const handleYaKelHaramChange = (checked: boolean) => {
    setYaKelHaram(checked);
    if (checked) {
      setHasMoney(true);
      setIsAlgerian(true);
      setIsLivingInAlgeria(true);
    } else {
      // Turning OFF Illegal Money
      if (showYaKelHaramSwitch && !showOneInAThousandSwitch) {
        setShowOneInAThousandSwitch(true);
        setOneInAThousand(false); 
      }
      if (!oneInAThousand) { 
        setHasMoney(true); 
        setIsAlgerian(false);
        setIsLivingInAlgeria(false);
      } else { 
        setHasMoney(true);
        setIsAlgerian(true);
        setIsLivingInAlgeria(true);
      }
    }
  };

  const handleOneInAThousandChange = (checked: boolean) => {
    setOneInAThousand(checked);
    if (checked) { 
      if (!yaKelHaram) setYaKelHaram(true); 
      setHasMoney(true);
      setIsAlgerian(true);
      setIsLivingInAlgeria(true);
    } else { 
      if (!yaKelHaram) { 
        setHasMoney(true);
        setIsAlgerian(false);
        setIsLivingInAlgeria(false);
      } else { 
        setHasMoney(true);
        setIsAlgerian(true);
        setIsLivingInAlgeria(true);
      }
    }
  };

  const resetExperience = () => {
    setHasMoney(false);
    setIsAlgerian(false);
    setIsLivingInAlgeria(false);
    setYaKelHaram(false);
    setOneInAThousand(false);
    setAttemptCounter(0);
    setShowYaKelHaramSwitch(false);
    setShowOneInAThousandSwitch(false);
  };

  const toggleLanguage = () => {
    setLanguage(prevLang => prevLang === 'en' ? 'ar' : 'en');
  };
  
  const canAllThreeBeOn = yaKelHaram || oneInAThousand;

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 selection:bg-primary/40 selection:text-primary-foreground bg-background text-foreground">
      <Card className="w-full max-w-lg shadow-2xl bg-card text-card-foreground">
        <CardHeader className="pb-4 relative text-center">
          <div className={`absolute top-4 ${language === 'ar' ? 'left-4' : 'right-4'}`}>
            <Button variant="ghost" size="sm" onClick={toggleLanguage} aria-label={`Switch to ${currentTranslations.toggleTo}`} className="text-sm">
              {currentTranslations.toggleTo}
            </Button>
          </div>
          <CardTitle className="text-3xl font-semibold tracking-tight pt-2">
            {translations.en.pageTitle} {/* Title always in English */}
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            {translations.en.pageDescription} {/* Description always in English */}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 pt-6 pb-10" dir={language === 'ar' ? 'rtl' : 'ltr'}>
          <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 shadow-md hover:shadow-lg transition-shadow duration-300">
            <Label htmlFor="money-switch" className="font-medium text-lg" dir={language === 'ar' ? 'rtl' : 'ltr'}>
              {currentTranslations.hasMoney}
            </Label>
            <Switch
              id="money-switch"
              checked={hasMoney}
              onCheckedChange={() => handleMainSwitchToggle('hasMoney')}
              disabled={canAllThreeBeOn}
              aria-label={currentTranslations.hasMoney}
              className="data-[state=checked]:bg-primary data-[state=unchecked]:bg-input"
            />
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 shadow-md hover:shadow-lg transition-shadow duration-300">
            <Label htmlFor="algerian-switch" className="font-medium text-lg" dir={language === 'ar' ? 'rtl' : 'ltr'}>
              {currentTranslations.algerian}
            </Label>
            <Switch
              id="algerian-switch"
              checked={isAlgerian}
              onCheckedChange={() => handleMainSwitchToggle('isAlgerian')}
              disabled={canAllThreeBeOn}
              aria-label={currentTranslations.algerian}
              className="data-[state=checked]:bg-primary data-[state=unchecked]:bg-input"
            />
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 shadow-md hover:shadow-lg transition-shadow duration-300">
            <Label htmlFor="living-switch" className="font-medium text-lg" dir={language === 'ar' ? 'rtl' : 'ltr'}>
              {currentTranslations.livingInAlgeria}
            </Label>
            <Switch
              id="living-switch"
              checked={isLivingInAlgeria}
              onCheckedChange={() => handleMainSwitchToggle('isLivingInAlgeria')}
              disabled={canAllThreeBeOn}
              aria-label={currentTranslations.livingInAlgeria}
              className="data-[state=checked]:bg-primary data-[state=unchecked]:bg-input"
            />
          </div>

          {showYaKelHaramSwitch && (
            <div className="flex items-center justify-between p-3 rounded-lg bg-destructive/20 border border-destructive/50 shadow-lg shadow-red-500/40 hover:shadow-xl hover:shadow-red-600/50 transition-all duration-300 mt-4">
              <Label htmlFor="haram-switch" className="font-medium text-lg text-destructive dark:text-red-400" dir={language === 'ar' ? 'rtl' : 'ltr'}>
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

          {showOneInAThousandSwitch && (
            <div className="flex items-center justify-between p-3 rounded-lg bg-green-500/10 border border-green-600 shadow-lg shadow-green-500/30 hover:shadow-xl hover:shadow-green-600/50 transition-all duration-300 mt-4">
              <Label htmlFor="one-in-thousand-switch" className="font-medium text-lg text-green-700 dark:text-green-400" dir={language === 'ar' ? 'rtl' : 'ltr'}>
                {currentTranslations.oneInAThousand}
              </Label>
              <Switch
                id="one-in-thousand-switch"
                checked={oneInAThousand}
                onCheckedChange={handleOneInAThousandChange}
                aria-label={currentTranslations.oneInAThousand}
                className="data-[state=checked]:bg-green-600 data-[state=unchecked]:bg-input"
              />
            </div>
          )}
        </CardContent>
        <CardFooter className="flex-col items-center pt-2 pb-6 space-y-3">
          {showYaKelHaramSwitch && (
            <Button variant="outline" size="sm" onClick={resetExperience} className="w-full sm:w-auto text-sm">
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

    