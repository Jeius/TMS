import { Facebook, GmailLight } from '@/components/social-icons';
import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="relative overflow-hidden bg-footer text-footer-foreground">
            <div className="text-sm leading-relaxed container mx-auto px-5 py-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className='md:text-left'>
                    <h3 className="font-semibold text-lg">Quick Links</h3>
                    <ul>
                        <li><Link href="/#hero" className="hover:underline">Home</Link></li>
                        <li><Link href="/#features" className="hover:underline">Features</Link></li>
                        <li><Link href="/browse" className="hover:underline">Browse</Link></li>
                    </ul>
                </div>
                <div className='md:text-center'>
                    <h3 className="font-semibold text-lg">Legal</h3>
                    <ul>
                        <li><Link href="#privacy" target="_blank" rel="noopener noreferrer" className="hover:underline">Privacy Policy</Link></li>
                        <li><Link href="#terms" target="_blank" rel="noopener noreferrer" className="hover:underline">Terms of Service</Link></li>
                    </ul>
                </div>
                <div className='md:text-right'>
                    <h3 className="font-semibold text-lg">Contact Us</h3>
                    <p>Email: ccs.ec@g.msuiit.edu.ph</p>
                    <p>Telephone: +63 (063) 221-4056</p>
                    <div className='flex md:justify-end items-center space-x-2 mt-2'>
                        <Link
                            href='https://www.facebook.com/CCSCouncilOfficial'
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Facebook width={25} height={25} />
                        </Link>
                        <Link
                            href="https://mail.google.com/mail/?view=cm&to=ccs.ec@g.msuiit.edu.ph&su=Hello&body=Your%20message%20here"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <GmailLight width={25} height={25} />
                        </Link>
                    </div>
                </div>
            </div>
            <div className="text-center border-t border-foreground/40 dark:border-border text-xs text-balance leading-relaxed p-4">
                <p>© 2024 MSU - Iligan Institute of Technology. All rights reserved.</p>
                <p>Developed by <Link
                    href="https://github.com/jeius"
                    target="_blank"
                    rel="noopener noreferrer"
                    className='font-semibold hover:underline'
                >
                    Julius Pahama
                </Link>
                </p>
            </div>
        </footer>
    );
}