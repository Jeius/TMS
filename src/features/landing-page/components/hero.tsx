'use client';

import ImagesReveal, { ImageCard } from '@/components/animated/image-reveal';
import InteractiveGrid from '@/components/animated/interactive-grid';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/auth-provider';
import { SearchIcon } from 'lucide-react';
import Link from 'next/link';
import ImageCarousel from './image-carousel';

const images: ImageCard[] = [
  { src: '/images/academics.png', alt: 'students', angle: '-8deg' },
  { src: '/images/faculty-staff.png', alt: 'faculty and staff', angle: '5deg' },
  {
    src: '/images/students-reading.jpg',
    alt: 'students reading',
    angle: '-5deg',
  },
  { src: '/images/student-writing.png', alt: 'student writing', angle: '8deg' },
];

export default function Hero() {
  const { isSignedIn, isMounted } = useAuth();
  return (
    <section id="hero" aria-labelledby="hero-heading" className="scroll-mt-24">
      <InteractiveGrid>
        <div className="flex flex-col items-center space-y-8 p-5 md:space-y-16 md:px-10">
          <div className="max-w-7xl md:px-10 lg:py-10">
            <div className="hidden md:block" aria-hidden="true">
              <ImagesReveal images={images} />
            </div>
            <div className="block md:hidden" aria-hidden="true">
              <ImageCarousel images={images} />
            </div>
          </div>

          <div className="flex max-w-[37.5rem] flex-col space-y-4 text-center">
            <h2 id="hero-heading" className="text-3xl font-bold sm:text-4xl">
              Empowering Your Thesis Journey
            </h2>
            <p className="p-2 text-sm text-foreground/90 sm:text-lg">
              From proposal to defense, our system simplifies every step of
              thesis management for students and faculty.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-5">
              <Button
                size="lg"
                asChild
                variant="shine"
                className="h-12 font-semibold shadow-md transition-transform hover:scale-105 sm:text-lg"
              >
                {isMounted &&
                  (isSignedIn ? (
                    <Link href="/browse" aria-label="Browse theses">
                      Browse <SearchIcon aria-hidden="true" />
                    </Link>
                  ) : (
                    <Link
                      href="/login?signUp=true"
                      aria-label="Sign up to start using the thesis management system"
                    >
                      Sign Up
                    </Link>
                  ))}
              </Button>
              <Button variant="outline" className="shadow" asChild>
                {isMounted &&
                  (isSignedIn ? (
                    <Link href="/dashboard" aria-label="Go to dashboard.">
                      Dashboard
                    </Link>
                  ) : (
                    <Link
                      href="/login"
                      aria-label="Sign in if you already have an account."
                    >
                      Sign In
                    </Link>
                  ))}
              </Button>
            </div>
          </div>
        </div>
      </InteractiveGrid>
    </section>
  );
}
