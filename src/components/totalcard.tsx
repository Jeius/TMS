import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { BookIcon } from 'lucide-react'

const TotalCard = () => {
    return (
        <Card className="flex flex-col justify-between">
            <CardHeader className="items-center pb-0">
                <CardTitle className="flex w-full justify-between items-center gap-2 font-medium leading-none">
                    Total Thesis <BookIcon className="size-6" />
                </CardTitle>
            </CardHeader>
            <CardContent>
                <h2 className='text-5xl font-bold'> 562 </h2>
            </CardContent>
            <CardFooter className="flex items-center gap-2 text-sm font-medium leading-none">
                Total number of thesis stored in the department
            </CardFooter>
        </Card>
    )
}

export default TotalCard