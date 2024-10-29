'use client'

import { Button } from '@/components/ui/button'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel'
import { quickActionsLinks } from '@/lib/navigation-links'
import { cn } from '@/lib/utils'
import Autoplay from 'embla-carousel-autoplay'
import { LucideProps } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

type QuickActionCardProps = React.ComponentPropsWithRef<typeof Link> & {
    href: string
    icon: React.ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>>
    label: string
};

function QuickActionCard({ href, icon: Icon, label, ...props }: QuickActionCardProps) {
    return (
        <Button asChild variant="glass"
            className={cn(
                'h-32 w-full md:w-56 lg:w-64 bg-card/70 dark:bg-card/80 rounded-xl hover:bg-card/70',
                'hover:border-secondary hover:text-secondary transition-transform border text-card-foreground',
                'hover:scale-105 focus-visible:scale-105 focus-visible:text-secondary flex-col space-y-5',
            )}
        >
            <Link href={href}{...props}>
                <Icon />
                <span className="font-semibold">{label}</span>
            </Link>
        </Button>
    )
}

export default function QuickActions() {
    const plugin = React.useRef(Autoplay({ delay: 2500, stopOnInteraction: true }));

    return (
        <div id="quick-actions" className="flex flex-col space-y-2 w-full">
            <h1 className="font-semibold text-lg pl-2">Quick Actions</h1>

            <div
                id="quick-actions-grid"
                className="hidden md:grid grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-4"
            >
                {quickActionsLinks.map(({ href, label, icon: Icon }) => (
                    <QuickActionCard
                        key={`quick-action-grid-${label.toLowerCase().replace(/ /g, '-')}`}
                        id={`quick-action-grid-${label.toLowerCase().replace(/ /g, '-')}`}
                        href={href}
                        icon={Icon}
                        label={label}
                    />
                ))}
            </div>

            <div id="quick-actions-carousel" className="px-14 md:hidden w-full">
                <Carousel className="w-full" plugins={[plugin.current]} >
                    <CarouselContent id="carousel-content" className="flex items-center p-2 gap-2">
                        {quickActionsLinks.map(({ href, label, icon: Icon }) => (
                            <CarouselItem key={`quick-action-carousel-${label.toLowerCase().replace(/ /g, '-')}`}
                                className="xs:basis-1/2">
                                <QuickActionCard
                                    id={`quick-action-carousel-${label.toLowerCase().replace(/ /g, '-')}`}
                                    href={href}
                                    icon={Icon}
                                    label={label}
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
