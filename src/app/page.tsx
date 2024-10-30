import Features from "@/features/landing-page/components/features";
import Hero from "@/features/landing-page/components/hero";

export default function Home() {
    return (
        <>
            <main className="relative max-w-none space-y-20 sm:space-y-32 p-5 md:p-10">
                <Hero />
                <Features />
            </main>
            <footer></footer>
        </>
    );
}
