"use client"

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import {
    BookOpen,
    CalendarFold,
    FilePlus2,
    Search,
    Send,
} from "lucide-react"
import React from "react"
import Link from "next/link"
import Autoplay from "embla-carousel-autoplay"
import { Card, CardContent } from '@/components/ui/card'


const actions = [
    { href: "#", label: "Submit Proposal", icon: <Send /> },
    { href: "#", label: "Browse Theses", icon: <Search /> },
    { href: "#", label: "Go to Library", icon: <BookOpen /> },
    { href: "#", label: "Schedule Defense", icon: <CalendarFold /> },
    { href: "#", label: "Upload Thesis", icon: <FilePlus2 /> },
    { href: "#", label: "Borrow Thesis", icon: <FilePlus2 /> },
]

export default function QuickActions() {
    const plugin = React.useRef(
        Autoplay({ delay: 2500, stopOnInteraction: true })
    )

    return (
        <div className="flex flex-col items-start space-y-2 justify-center">
            <h2 className="font-semibold text-lg pl-2">Quick Actions</h2>

            <div id="grid-quick-actions" className="hidden md:grid grid-cols-3 gap-4 ">
                {actions.map((action, index) => (
                    <Link
                        key={index}
                        href={action.href}
                    >
                        <Card className="transition-all duration-300 hover:bg-primary hover:scale-105 hover:border-secondary/50 hover:text-secondary">
                            <CardContent className="flex min-w-60 flex-col items-center justify-center space-y-2 p-6">
                                <div className="flex items-center justify-center size-10 p-2 rounded-lg">
                                    {action.icon}
                                </div>
                                <span className="text-md font-semibold">{action.label}</span>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>

            <div className="px-14 md:hidden">
                <Carousel
                    className="max-w-[300px] sm:max-w-md lg:max-w-none"
                    plugins={[plugin.current]}
                >
                    <CarouselContent className="-ml-1">
                        {actions.map((action, index) => (
                            <CarouselItem
                                key={index}
                                className="p-1"
                            >
                                <Link href={action.href}>
                                    <Card className="transition-all duration-300 hover:bg-primary hover:border-secondary/50 hover:text-secondary">
                                        <CardContent className="flex min-w-60 flex-col items-center justify-center space-y-2 p-6">
                                            <div className="flex items-center justify-center size-10 p-2 rounded-lg">
                                                {action.icon}
                                            </div>
                                            <span className="text-md font-semibold">{action.label}</span>
                                        </CardContent>
                                    </Card>
                                </Link>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </div>
        </div>
    )
}