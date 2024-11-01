import Image from 'next/image';
import ContactUs from './contact';
import Copyrights from './copyright';
import Legal from './legal';
import QuickLinks from './quick-links';
import Social from './social';
import ThemeToggle from './theme-toggle';

export default function Footer() {
    return (
        <footer className="relative overflow-hidden bg-footer text-footer-foreground lg:pl-16 border-t border-foreground/40 dark:border-border">
            <div className='max-w-[80rem] mx-auto px-5 md:px-8'>
                <div className="py-8 grid grid-cols-1 md:grid-cols-4 gap-8 leading-relaxed">
                    <Image
                        src={'/images/msuiit-logo-275x280.png'}
                        alt="MSU-IIT Seal of Excellence"
                        width={275}
                        height={280}
                        role='img'
                        className='size-[7rem] shrink-0'
                    />
                    <QuickLinks />
                    <ContactUs />
                    <Legal />
                </div>
                <div className="py-4 pt-0 text-sm text-foreground/70 text-pretty leading-relaxed">
                    <Copyrights />
                    <div className='flex flex-col sm:flex-row gap-4 justify-between '>
                        <Social />
                        <ThemeToggle />
                    </div>
                </div>
            </div>
        </footer>
    );
}