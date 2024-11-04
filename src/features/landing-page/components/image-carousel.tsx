'use client'

import { ImageCard } from '@/components/animated/image-reveal';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';
import { useRef } from 'react';

type ImageCarouselProps = {
    images: ImageCard[]
}

export default function ImageCarousel({ images }: ImageCarouselProps) {
    const plugin = useRef(Autoplay({ delay: 2500, stopOnInteraction: true }));

    return (
        <Carousel className="w-full rounded-lg shadow-xl overflow-hidden" plugins={[plugin.current]}>
            <CarouselContent className="items-center">
                {images.map(({ src, alt, }) => (
                    <CarouselItem key={alt}>
                        <Image alt={alt} src={src} width={1080} height={720} className="w-full aspect-video object-cover" />
                    </CarouselItem>
                ))}
            </CarouselContent>
        </Carousel>
    )
}
