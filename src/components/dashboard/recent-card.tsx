import React from 'react'
import { ScrollArea } from '../ui/scroll-area'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Separator } from '../ui/separator'

const RecentCard = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Recent Activities</CardTitle>
            </CardHeader>
            <Separator />
            <CardContent>
                <ScrollArea>

                </ScrollArea>
            </CardContent>
        </Card>
    )
}

export default RecentCard