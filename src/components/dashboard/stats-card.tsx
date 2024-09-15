
import React from 'react'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../ui/card'

export type StatCardProps = {
  title: string,
  symbol?: React.ReactNode,
  icon?: React.ReactNode,
  description?: string,
  value: string | number,
}

const StatsCard = ({
  title, symbol, icon, description, value,
}: StatCardProps) => {
  return (
    <Card className="flex flex-col p-6">
      <CardHeader className="p-0">
        <CardTitle className="flex flex-row w-full justify-between items-center font-semibold text-md">
          {title}
          <div aria-label="icon" className="text-muted-foreground">
            {icon}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <h2 className='text-3xl font-bold'>{symbol}{value}</h2>
      </CardContent>
      <CardFooter className="flex items-center text-sm text-muted-foreground p-0">
        {description}
      </CardFooter>
    </Card>
  )
}

export default StatsCard