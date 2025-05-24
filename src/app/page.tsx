
"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';

export default function AlgerianLifePage() {
  const [hasMoney, setHasMoney] = useState(false);
  const [isAlgerian, setIsAlgerian] = useState(false);
  const [isLivingInAlgeria, setIsLivingInAlgeria] = useState(false);

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

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 selection:bg-primary/40 selection:text-primary-foreground bg-background text-foreground">
      <Card className="w-full max-w-md shadow-2xl bg-card text-card-foreground">
        <CardHeader className="text-center">
          <CardTitle>
            Algerian Life
          </CardTitle>
          <CardDescription>
            A choices simulator.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 pt-6 pb-10">
          <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 shadow-md hover:shadow-lg transition-shadow duration-300">
            <Label htmlFor="money-switch" className="font-medium">
              Has Money
            </Label>
            <Switch
              id="money-switch"
              checked={hasMoney}
              onCheckedChange={handleHasMoneyChange}
              aria-label="Toggle Has Money status"
              className="data-[state=checked]:bg-primary data-[state=unchecked]:bg-input"
            />
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 shadow-md hover:shadow-lg transition-shadow duration-300">
            <Label htmlFor="algerian-switch" className="font-medium">
              Algerian
            </Label>
            <Switch
              id="algerian-switch"
              checked={isAlgerian}
              onCheckedChange={handleIsAlgerianChange}
              aria-label="Toggle Algerian status"
              className="data-[state=checked]:bg-primary data-[state=unchecked]:bg-input"
            />
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 shadow-md hover:shadow-lg transition-shadow duration-300">
            <Label htmlFor="living-switch" className="font-medium">
              Living in Algeria
            </Label>
            <Switch
              id="living-switch"
              checked={isLivingInAlgeria}
              onCheckedChange={handleIsLivingInAlgeriaChange}
              aria-label="Toggle Living in Algeria status"
              className="data-[state=checked]:bg-primary data-[state=unchecked]:bg-input"
            />
          </div>
        </CardContent>
        <CardFooter className="flex-col items-center pt-2 pb-6">
          <Link href="/about" passHref>
            <span className="text-sm text-primary hover:underline cursor-pointer">
              What is this?
            </span>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
