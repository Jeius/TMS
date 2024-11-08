'use client'

import { motion } from 'framer-motion';
import Image from 'next/image';

interface CustomProps {
    index: number;
    angle: string;
}

const cardVariants = {
    hidden: { opacity: 0, scale: 0.2 },
    visible: (custom: CustomProps) => ({
        opacity: 1,
        scale: 1.15,
        rotate: custom.angle,
        transition: {
            delay: custom.index * 0.1,
            duration: 0.3,
            type: 'spring',
            stiffness: 150,
            damping: 20,
            mass: 0.5,
        },
    }),
};

export type ImageCard = {
    angle: string
    src: string
    alt: string
}

type ImagesRevealProps = {
    title?: string
    images: ImageCard[]
}

export default function ImagesReveal({ title, images }: ImagesRevealProps) {
    const basis = ((1 / images.length) * 100).toString()
    return (
        <>
            <h1 className="text-center text-2xl font-semibold text-foreground">{title}</h1>
            <div className="relative flex justify-center">
                {images.map(({ angle, src, alt }, i) => (
                    <motion.div
                        key={i}
                        className={`relative overflow-hidden size-full aspect-square basis-[${basis}%] rounded-2xl p-1 lg:p-1.5 backdrop-blur-md shadow-xl`}
                        custom={{ index: i, angle: angle }}
                        initial="hidden"
                        animate="visible"
                        variants={cardVariants}
                        whileHover={{
                            scale: 1.3,
                            rotate: '0deg',
                            zIndex: 10,
                            transition: { duration: 0.3, type: 'spring', stiffness: 150, damping: 20 },
                        }}
                    >
                        <Image alt={alt} src={src} height={720} width={1080} priority className="object-cover rounded-2xl size-full" />
                    </motion.div>
                ))}
            </div>
        </>
    );
}
