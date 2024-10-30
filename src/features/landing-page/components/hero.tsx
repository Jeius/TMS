import ImagesReveal, { ImageCard } from '@/components/animated/image-reveal'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import ImageCarousel from './image-carousel'

const images: ImageCard[] = [
    { src: "/images/academics.png", alt: "students", angle: '-8deg' },
    { src: "/images/faculty-staff.png", alt: "faculty and staff", angle: '5deg' },
    { src: "/images/students-reading.jpg", alt: "students reading", angle: '-5deg' },
    { src: "/images/student-writing.png", alt: "student writing", angle: '8deg' },
];

export default function Hero() {
    return (
        <div className="flex flex-col sm:mt-5 space-y-8 md:space-y-16 items-center">
            <div className="md:px-10 lg:py-10 max-w-7xl">
                <div className="hidden md:block"><ImagesReveal images={images} /></div>
                <div className="block md:hidden"><ImageCarousel images={images} /></div>
            </div>
            <div className="flex flex-col text-center max-w-[600px] space-y-5">
                <h1 className="text-2xl sm:text-4xl font-bold">
                    Empowering Your Thesis Journey
                </h1>
                <h2 className="text-sm sm:text-lg text-foreground/85 p-2">
                    From proposal to defense, our system simplifies every step of thesis management for students and faculty.
                </h2>
                <div className="flex items-center justify-center flex-wrap gap-3 sm:gap-5">
                    <Button size='lg' variant='gradient' asChild
                        className="h-12 sm:text-lg font-semibold shadow-md"
                    >
                        <Link href='/login'>Sign Up</Link>
                    </Button>
                    <Button size='lg' variant='outline' asChild
                        className="flex space-x-2 px-4 shadow"
                    >
                        <Link href='/browse'>
                            <span>Browse</span>
                            <ArrowRight size={18} />
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}
