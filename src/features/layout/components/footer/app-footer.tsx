import Image from 'next/image';
import ContactUs from './contact';
import Copyrights from './copyright';
import Legal from './legal';
import QuickLinks from './quick-links';
import Social from './social';
import ThemeToggle from './theme-toggle';

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-foreground/40 bg-footer text-footer-foreground dark:border-border lg:pl-16">
      <div className="mx-auto max-w-screen-xl px-5 md:px-8">
        <div className="grid grid-cols-1 gap-8 py-8 leading-relaxed md:grid-cols-4">
          <Image
            src={'/images/msuiit-logo-275x280.png'}
            alt="MSU-IIT Seal of Excellence"
            width={275}
            height={280}
            role="img"
            className="size-28 shrink-0"
          />
          <QuickLinks />
          <ContactUs />
          <Legal />
        </div>
        <div className="text-pretty py-4 pt-0 text-sm leading-relaxed text-foreground/80 dark:text-foreground/65">
          <Copyrights />
          <div className="flex flex-col justify-between gap-4 sm:flex-row">
            <Social />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </footer>
  );
}
