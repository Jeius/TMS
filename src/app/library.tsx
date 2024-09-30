import { ScrollArea } from '@/components/ui/scroll-area'
import React from 'react'

export default function MyLibrary() {
    return (
        <section className="w-full h-80 flex flex-col gap-1 text-sm py-4">
            My Library
            <ScrollArea className="size-full border-t">

            </ScrollArea>
        </section>
    )
}
