"use client"

import React from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import {
    BookCopy,
    BookOpen,
    CalendarFold,
    FilePlus2,
    Search,
    Send,
} from "lucide-react"
import Autoplay from "embla-carousel-autoplay"

// List of quick action items
const quickActions = [
    { href: "#", label: "Submit Proposal", icon: <Send /> },
    { href: "#", label: "Browse Theses", icon: <Search /> },
    { href: "#", label: "Go to Library", icon: <BookOpen /> },
    { href: "#", label: "Schedule Defense", icon: <CalendarFold /> },
    { href: "#", label: "Upload Thesis", icon: <FilePlus2 /> },
    { href: "#", label: "Borrow Thesis", icon: <BookCopy /> },
]

interface QuickActionCardProps {
    href: string
    icon: React.ReactNode
    label: string
}

const QuickActionCard: React.FC<QuickActionCardProps> = ({ href, icon, label }) => (
    <Link href={href} id={`quick-action-${label.toLowerCase().replace(/ /g, "-")}`}>
        <Card className="transition-all duration-300 hover:scale-110 hover:border-primary">
            <CardContent className="flex min-w-60 flex-col items-center justify-center space-y-2 p-6">
                <div aria-hidden="true" className="flex items-center justify-center size-10 p-2 rounded-lg">
                    {icon}
                </div>
                <span className="text-sm font-semibold">{label}</span>
            </CardContent>
        </Card>
    </Link>
)

export default function QuickActions() {
    const plugin = React.useRef(Autoplay({ delay: 2500, stopOnInteraction: true }))

    return (
        <div id="quick-actions-container" className="flex flex-col items-start space-y-2 justify-center">
            <h2 className="font-semibold text-lg pl-2">Quick Actions</h2>

            {/* Grid View for Larger Screens */}
            <div
                id="quick-actions-grid"
                className="hidden md:grid grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-4"
            >
                {quickActions.map((action, index) => (
                    <QuickActionCard
                        key={`quick-action-grid-${index}`}
                        href={action.href}
                        icon={action.icon}
                        label={action.label}
                    />
                ))}
            </div>

            {/* Carousel View for Smaller Screens */}
            <div id="quick-actions-carousel" className="px-14 md:hidden">
                <Carousel className="max-w-[300px] sm:max-w-md lg:max-w-none" plugins={[plugin.current]}>
                    <CarouselContent id="carousel-content" className="-ml-1">
                        {quickActions.map((action, index) => (
                            <CarouselItem key={`quick-action-carousel-${index}`} className="p-1 sm:basis-1/2">
                                <QuickActionCard
                                    href={action.href}
                                    icon={action.icon}
                                    label={action.label}
                                />
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
