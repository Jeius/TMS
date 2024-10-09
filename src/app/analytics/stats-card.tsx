
import React from 'react'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter
} from '../../components/ui/card'

export type Statistic = {
  title: string
  symbol?: React.ReactNode
  icon?: React.ReactNode
  description?: string
  value: string | number
}

export function StatisticsCard({
  title, symbol, icon, description, value,
}: Statistic) {
  return (
    <Card className="flex flex-col p-6">
      <CardHeader className="p-0">
        <CardTitle className="flex flex-row w-full justify-between items-center">
          {title}
          <div aria-label="icon" className="text-muted-foreground">
            {icon}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <data
          className='text-3xl font-bold'
          value={value}
        >
          {symbol}{value}
        </data>
      </CardContent>
      <CardFooter className="flex items-center text-sm text-muted-foreground p-0">
        {description}
      </CardFooter>
    </Card>
  )
}
