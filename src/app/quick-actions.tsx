"use client"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import { Card, CardContent } from '@/components/ui/card'
import Link from "next/link"
import { BookOpen, CalendarFold, FilePlus2, Search, Send, } from "lucide-react"
import { useDeviceSize } from "@/hooks/use-device-size"
import { screens } from "@/lib/utils"

const actions = [
    { href: "#", label: "Submit Proposal", icon: <Send /> },
    { href: "#", label: "Browse Theses", icon: <Search /> },
    { href: "#", label: "Go to Library", icon: <BookOpen /> },
    { href: "#", label: "Schedule Defense", icon: <CalendarFold /> },
    { href: "#", label: "Upload Thesis", icon: <FilePlus2 /> },
    { href: "#", label: "Borrow Thesis", icon: <FilePlus2 /> },
]

export default function QuickActions() {
    const deviceSize = useDeviceSize()
    return (
        <div className="flex flex-col items-start space-y-2 justify-center">
            <h2 className="font-semibold text-lg pl-2">Quick Actions</h2>
            {deviceSize.width >= screens["md"]
                ? <div id="grid-quick-actions" className="grid grid-cols-3 gap-4">
                    {actions.map((action, index) => (
                        <Link
                            key={index}
                            href={action.href}
                        >
                            <Card className="transition-all duration-150 hover:bg-accent ">
                                <CardContent className="flex flex-col items-center justify-center space-y-2 p-6">
                                    <div className="flex items-center justify-center size-10 p-2 bg-accent rounded-lg ">
                                        {action.icon}
                                    </div>
                                    <span className="text-md font-semibold">{action.label}</span>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
                : <div className="px-14">
                    <Carousel
                        className="max-w-[300px] sm:max-w-sm md:max-w-md lg:max-w-none"
                        plugins={[
                            Autoplay({
                                delay: 3000,
                            }),
                        ]}
                    >
                        <CarouselContent className="-ml-1">
                            {actions.map((action, index) => (
                                <CarouselItem
                                    key={index}
                                    className="p-1 sm:basis-1/2"
                                >
                                    <Link href={action.href}>
                                        <Card className="">
                                            <CardContent className="flex flex-col items-center justify-center space-y-2 p-6">
                                                <div className="flex items-center justify-center size-10 p-2 bg-accent rounded-lg ">
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
                </div>}
        </div>
    )
}