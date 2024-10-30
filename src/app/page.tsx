import InteractiveGrid from "@/components/animated/interactive-grid";
import Features from "@/features/landing-page/components/features";
import Hero from "@/features/landing-page/components/hero";

export default function Home() {
    return (
        <main className="relative max-w-none space-y-20 sm:space-y-32 mb-20 sm:mb-32 md:py-10">
            <InteractiveGrid>
                <Hero />
            </InteractiveGrid>

            <Features />
        </main>
    );
}
