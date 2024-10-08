import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import React from 'react'

export default function Announcements({
    ...props
}: React.ComponentPropsWithRef<typeof Card>) {
    return (
        <Card {...props}>
            <CardHeader className="pb-4">
                <CardTitle>Announcements</CardTitle>
            </CardHeader>
            <CardContent>
                <ScrollArea className="border-t h-[300px]">
                    <div className="flex flex-col space-y-2 p-2">
                        {Array.from({ length: 20 }).map((_, index) => (
                            <p key={index}>Announcement {index}</p>
                        ))}
                    </div>
                </ScrollArea>
            </CardContent>
        </Card>
    )
}
