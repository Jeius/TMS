import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import React from 'react'

export default function Announcements({
    ...props
}: React.ComponentPropsWithRef<typeof Card>) {
    return (
        <Card {...props}>
            <CardHeader>
                <CardTitle>Announcements</CardTitle>
            </CardHeader>
            <CardContent>
                <ScrollArea className="border-y h-full">
                    contents
                </ScrollArea>
            </CardContent>
        </Card>
    )
}
