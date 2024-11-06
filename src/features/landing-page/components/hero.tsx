import ImagesReveal, { ImageCard } from '@/components/animated/image-reveal'
import InteractiveGrid from '@/components/animated/interactive-grid'
import { Button } from '@/components/ui/button'
import { Search } from 'lucide-react'
import Link from 'next/link'
import ImageCarousel from './image-carousel'

const images: ImageCard[] = [
    { src: '/images/academics.png', alt: 'students', angle: '-8deg' },
    { src: '/images/faculty-staff.png', alt: 'faculty and staff', angle: '5deg' },
    { src: '/images/students-reading.jpg', alt: 'students reading', angle: '-5deg' },
    { src: '/images/student-writing.png', alt: 'student writing', angle: '8deg' },
];

export default function Hero() {
    return (
        <section id='hero' aria-labelledby="hero-heading" className='scroll-mt-24'>
            <InteractiveGrid>
                <div className="flex flex-col py-5 space-y-8 px-5 md:px-10 md:space-y-16 items-center">
                    <div className="md:px-10 lg:py-10 max-w-7xl">
                        <div className="hidden md:block" aria-hidden="true">
                            <ImagesReveal images={images} />
                        </div>
                        <div className="block md:hidden" aria-hidden="true">
                            <ImageCarousel images={images} />
                        </div>
                    </div>

                    <div className="flex flex-col text-center max-w-[37.5rem] space-y-4">
                        <h2 id="hero-heading" className="text-2xl sm:text-4xl font-bold">
                            Empowering Your Thesis Journey
                        </h2>
                        <p className="text-sm sm:text-lg text-foreground/90 p-2">
                            From proposal to defense, our system simplifies every step of thesis management for students and faculty.
                        </p>

                        <div className="flex items-center justify-center flex-wrap gap-3 sm:gap-5">
                            <Button
                                size="lg" asChild
                                className="h-12 sm:text-lg font-semibold shadow-md hover:scale-105 transition-transform"
                            >
                                <Link href='/login?signUp=true' aria-label="Sign up to start using the thesis management system">
                                    Sign Up
                                </Link>
                            </Button>
                            <Button variant="outline" className="shadow" asChild>
                                <Link href='/browse' aria-label="Browse thesis resources">
                                    <span>Browse</span>
                                    <Search size={18} aria-hidden="true" />
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </InteractiveGrid>
        </section>
    )
}
