import Features from '@/features/landing-page/components/features';
import Hero from '@/features/landing-page/components/hero';

export default function Home() {
  return (
    <main className="min-h-[calc(100vh-4rem)] max-w-none">
      <div className="relative mb-32 space-y-32 md:py-10">
        <Hero />
        <Features />
      </div>
    </main>
  );
}
