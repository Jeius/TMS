import Features from '@/features/landing-page/components/features';
import Hero from '@/features/landing-page/components/hero';

export default function Home() {
  return (
    <main className="min-h-[85vh] max-w-none">
      <div className="relative mb-20 space-y-20 sm:mb-32 sm:space-y-32 md:py-10">
        <Hero />
        <Features />
      </div>
    </main>
  );
}
