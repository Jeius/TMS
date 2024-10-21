"use client"

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { cn } from "@/lib/utils"
import Autoplay from "embla-carousel-autoplay"
import {
    BookCopy,
    BookOpen,
    CalendarFold,
    FilePlus2,
    Search,
    Send,
} from "lucide-react"
import Link from "next/link"
import React from "react"
import { Button } from "../ui/button"

// List of quick action items
const quickActions = [
    { href: "#", label: "Submit Proposal", icon: <Send aria-hidden="true" focusable="false" size={30} /> },
    { href: "#", label: "Browse Theses", icon: <Search aria-hidden="true" focusable="false" size={30} /> },
    { href: "#", label: "Go to Library", icon: <BookOpen aria-hidden="true" focusable="false" size={30} /> },
    { href: "#", label: "Schedule Defense", icon: <CalendarFold aria-hidden="true" focusable="false" size={30} /> },
    { href: "#", label: "Upload Thesis", icon: <FilePlus2 aria-hidden="true" focusable="false" size={30} /> },
    { href: "#", label: "Borrow Thesis", icon: <BookCopy aria-hidden="true" focusable="false" size={30} /> },
]

type QuickActionCardProps = React.ComponentPropsWithRef<typeof Link> & {
    href: string
    icon: React.ReactNode
    label: string
};

function QuickActionCard({ href, icon, label, ...props }: QuickActionCardProps) {
    return (
        <Button asChild variant="outline"
            className={cn(
                "h-32 w-full md:w-56 lg:w-64 bg-card/70 backdrop-blur-md rounded-xl",
                "hover:bg-card/60 hover:border-secondary hover:text-secondary",
                "hover:scale-105 transition-transform"
            )}
        >
            <Link href={href} className="flex flex-col space-y-4"{...props}>
                {icon}
                <span className="text-sm font-semibold">{label}</span>
            </Link>
        </Button>
    )
}

export default function QuickActions() {
    const plugin = React.useRef(Autoplay({ delay: 2500, stopOnInteraction: true }));

    return (
        <div id="quick-actions" className="flex flex-col space-y-2 w-full">
            <h2 className="font-semibold text-lg pl-2">Quick Actions</h2>

            <div
                id="quick-actions-grid"
                className="hidden md:grid grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-4"
            >
                {quickActions.map((action) => (
                    <QuickActionCard
                        key={`quick-action-grid-${action.label.toLowerCase().replace(/ /g, "-")}`}
                        id={`quick-action-grid-${action.label.toLowerCase().replace(/ /g, "-")}`}
                        href={action.href}
                        icon={action.icon}
                        label={action.label}
                    />
                ))}
            </div>

            <div id="quick-actions-carousel" className="px-14 md:hidden w-full">
                <Carousel className="w-full" plugins={[plugin.current]} >
                    <CarouselContent id="carousel-content" className="flex items-center p-2 gap-2">
                        {quickActions.map((action, index) => (
                            <CarouselItem key={`quick-action-carousel-${index}`} className="xs:basis-1/2">
                                <QuickActionCard
                                    id={`quick-action-carousel-${action.label.toLowerCase().replace(/ /g, "-")}`}
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
