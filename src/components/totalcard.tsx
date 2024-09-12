import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { BookIcon } from 'lucide-react'

const TotalCard = () => {
    return (
        <Card className="flex flex-col justify-between">
            <CardHeader className="items-center">
                <CardTitle className="flex flex-row w-full justify-between items-center font-semibold text-xl">
                    Total Thesis <BookIcon className="size-6" />
                </CardTitle>
            </CardHeader>
            <CardContent>
                <h2 className='text-5xl font-bold'> 562 </h2>
            </CardContent>
            <CardFooter className="flex items-center text-sm font-medium text-muted-foreground">
                Total number of theses shelfed
            </CardFooter>
        </Card>
    )
}

export default TotalCard