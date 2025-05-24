"use client";

import { useState, useEffect } from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function AlgerianLifePage() {
  const [hasMoney, setHasMoney] = useState(false);
  const [isAlgerian, setIsAlgerian] = useState(false);
  const [isLivingInAlgeria, setIsLivingInAlgeria] = useState(false);

  // Rule 1: If 'Living in Algeria' and 'Has Money' are true, then 'Is Algerian' turns off.
  useEffect(() => {
    if (isLivingInAlgeria && hasMoney) {
      setIsAlgerian(false);
    }
  }, [isLivingInAlgeria, hasMoney]);

  // Rule 2: If 'Has Money' and 'Is Algerian' are true, then 'Living in Algeria' turns off.
  useEffect(() => {
    if (hasMoney && isAlgerian) {
      setIsLivingInAlgeria(false);
    }
  }, [hasMoney, isAlgerian]);

  // Rule 3: If 'Living in Algeria' and 'Is Algerian' are true, then 'Has Money' turns off.
  useEffect(() => {
    if (isLivingInAlgeria && isAlgerian) {
      setHasMoney(false);
    }
  }, [isLivingInAlgeria, isAlgerian]);

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
              Do you have money?
            </Label>
            <Switch
              id="money-switch"
              checked={hasMoney}
              onCheckedChange={setHasMoney}
              aria-label="Toggle money status"
              className="data-[state=checked]:bg-primary data-[state=unchecked]:bg-muted"
            />
          </div>
          <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/50 shadow-md hover:shadow-lg transition-shadow duration-300">
            <Label htmlFor="algerian-switch" className="text-xl font-medium">
              Are you Algerian?
            </Label>
            <Switch
              id="algerian-switch"
              checked={isAlgerian}
              onCheckedChange={setIsAlgerian}
              aria-label="Toggle Algerian status"
              className="data-[state=checked]:bg-primary data-[state=unchecked]:bg-muted"
            />
          </div>
          <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/50 shadow-md hover:shadow-lg transition-shadow duration-300">
            <Label htmlFor="living-switch" className="text-xl font-medium">
              Are you living in Algeria?
            </Label>
            <Switch
              id="living-switch"
              checked={isLivingInAlgeria}
              onCheckedChange={setIsLivingInAlgeria}
              aria-label="Toggle living in Algeria status"
              className="data-[state=checked]:bg-primary data-[state=unchecked]:bg-muted"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
