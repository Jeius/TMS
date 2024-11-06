'use client';

import { Button } from '@/components/ui/button';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';
import { quickActionsLinks } from '@/lib/navigation-links';
import { cn } from '@/lib/utils';
import Autoplay from 'embla-carousel-autoplay';
import { LucideProps } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

type QuickActionCardProps = React.ComponentPropsWithRef<typeof Link> & {
    href: string;
    icon: React.ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>>;
    label: string;
};

function QuickActionCard({ href, icon: Icon, label, ...props }: QuickActionCardProps) {
    return (
        <Button asChild
            className={cn(
                'h-32 w-full md:w-56 lg:w-64 bg-card rounded-xl hover:bg-card',
                'hover:border-secondary hover:text-secondary transition-transform border text-card-foreground',
                'hover:scale-105 focus-visible:scale-105 focus-visible:text-secondary flex-col space-y-5'
            )}
        >
            <Link href={href} {...props} role="link" aria-label={label}>
                <Icon aria-hidden="true" focusable="false" />
                <h3 className="font-semibold">
                    {label}
                </h3>
            </Link>
        </Button>
    );
}

export default function QuickActions() {
    const plugin = React.useRef(Autoplay({ delay: 2500, stopOnInteraction: true }));

    return (
        <section id="quick-actions"
            className="flex flex-col space-y-2 w-full"
            aria-labelledby="quick-actions-heading"
        >
            <h2 id="quick-actions-heading" className="font-semibold text-lg pl-2">Quick Actions</h2>

            <ul role='list'
                id="quick-actions-list"
                aria-label="Quick Actions Cards"
                className="hidden md:grid grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-4"
            >
                {quickActionsLinks.map(({ href, label, icon: Icon }) => (
                    <li key={`list-${href}`}>
                        <QuickActionCard
                            href={href}
                            icon={Icon}
                            label={label}
                        />
                    </li>
                ))}
            </ul>

            <div className='px-8' >
                <Carousel
                    id="quick-actions-carousel"
                    className="md:hidden w-full"
                    aria-label="Quick Actions Carousel"
                    plugins={[plugin.current]}
                >
                    <CarouselContent
                        id="carousel-content"
                        className="flex items-center py-2 px-3 -ml-5"
                    >
                        {quickActionsLinks.map(({ href, label, icon: Icon }) => (
                            <CarouselItem
                                key={`carousel-${href}`}
                                role="listitem"
                                className="xs:basis-1/2 pl-5 last:pr-5"
                            >
                                <QuickActionCard
                                    href={href}
                                    icon={Icon}
                                    label={label}
                                />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious aria-label="Previous quick action" />
                    <CarouselNext aria-label="Next quick action" />
                </Carousel>
            </div>
        </section>
    );
}
