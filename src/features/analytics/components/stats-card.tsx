import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import React from 'react';

export type Statistic = {
  title: string;
  symbol?: React.ReactNode;
  icon?: React.ReactNode;
  description?: string;
  value: string | number;
};

export function StatisticsCard({
  title,
  symbol,
  icon,
  description,
  value,
}: Statistic) {
  return (
    <Card className="flex flex-col p-6">
      <CardHeader className="p-0">
        <CardTitle className="flex w-full flex-row items-center justify-between">
          {title}
          <div aria-label="icon" className="text-muted-foreground">
            {icon}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <data className="text-3xl font-bold" value={value}>
          {symbol}
          {value}
        </data>
      </CardContent>
      <CardFooter className="flex items-center p-0 text-sm text-muted-foreground">
        {description}
      </CardFooter>
    </Card>
  );
}
