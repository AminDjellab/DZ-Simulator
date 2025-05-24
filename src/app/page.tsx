
"use client";

import { useState } from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function AlgerianLifePage() {
  const [hasMoney, setHasMoney] = useState(false);
  const [isAlgerian, setIsAlgerian] = useState(false);
  const [isLivingInAlgeria, setIsLivingInAlgeria] = useState(false);

  const handleHasMoneyChange = (checked: boolean) => {
    setHasMoney(checked);
    if (checked && isAlgerian && isLivingInAlgeria) {
      // If turning HasMoney ON makes all three true, turn IsAlgerian OFF.
      setIsAlgerian(false);
    }
  };

  const handleIsAlgerianChange = (checked: boolean) => {
    setIsAlgerian(checked);
    if (checked && hasMoney && isLivingInAlgeria) {
      // If turning IsAlgerian ON makes all three true, turn LivingInAlgeria OFF.
      setIsLivingInAlgeria(false);
    }
  };

  const handleIsLivingInAlgeriaChange = (checked: boolean) => {
    setIsLivingInAlgeria(checked);
    // This is the primary joke:
    // If LivingInAlgeria is turned ON, and HasMoney and IsAlgerian were already ON,
    // then HasMoney turns OFF.
    if (checked && hasMoney && isAlgerian) {
      setHasMoney(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 selection:bg-primary/40 selection:text-primary-foreground">
      <Card className="w-full max-w-lg shadow-2xl bg-card/80 backdrop-blur-sm border-border/50">
        <CardHeader className="pb-4">
          <CardTitle className="text-center text-4xl font-extrabold tracking-tight">
            Algerian Life
          </CardTitle>
          <CardDescription className="text-center text-muted-foreground text-lg pt-1">
            A choices simulator.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-10 pt-6 pb-10">
          <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/50 shadow-md hover:shadow-lg transition-shadow duration-300">
            <Label htmlFor="money-switch" className="text-xl font-medium">
              Has Money
            </Label>
            <Switch
              id="money-switch"
              checked={hasMoney}
              onCheckedChange={handleHasMoneyChange}
              aria-label="Toggle Has Money status"
              className="data-[state=checked]:bg-primary data-[state=unchecked]:bg-muted"
            />
          </div>
          <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/50 shadow-md hover:shadow-lg transition-shadow duration-300">
            <Label htmlFor="algerian-switch" className="text-xl font-medium">
              Algerian
            </Label>
            <Switch
              id="algerian-switch"
              checked={isAlgerian}
              onCheckedChange={handleIsAlgerianChange}
              aria-label="Toggle Algerian status"
              className="data-[state=checked]:bg-primary data-[state=unchecked]:bg-muted"
            />
          </div>
          <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/50 shadow-md hover:shadow-lg transition-shadow duration-300">
            <Label htmlFor="living-switch" className="text-xl font-medium">
              Living in Algeria
            </Label>
            <Switch
              id="living-switch"
              checked={isLivingInAlgeria}
              onCheckedChange={handleIsLivingInAlgeriaChange}
              aria-label="Toggle Living in Algeria status"
              className="data-[state=checked]:bg-primary data-[state=unchecked]:bg-muted"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
