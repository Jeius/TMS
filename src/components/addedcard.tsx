import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { BookIcon, BookPlusIcon } from 'lucide-react'

const AddedCard = () => {
    return (
        <Card className="flex flex-col justify-between">
            <CardHeader className="items-center pb-0">
                <CardTitle className="flex flex-row w-full justify-between items-center font-semibold text-xl">
                    Total Added <BookPlusIcon className="size-6" />
                </CardTitle>
                <CardDescription className="place-self-start">SY: 2024 - 2025</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
                <h2 className='text-6xl font-bold'> 123 </h2>
            </CardContent>
            <CardFooter className="flex justify-center items-center text-sm font-medium text-muted-foreground">
                Total theses added as of the school year
            </CardFooter>
        </Card>
    )
}

export default AddedCard