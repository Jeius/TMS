import { InstagramLogoIcon } from '@radix-ui/react-icons';
import { Linkedin, Mail } from 'lucide-react';
import Link from 'next/link';

const Footer = () => {
    return (
        <footer className="relative overflow-hidden bg-footer text-footer-foreground py-8">
            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                    <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
                    <ul>
                        <li><Link href="/" className="hover:underline">Home</Link></li>
                        <li><Link href="#features" className="hover:underline">Features</Link></li>
                        <li><Link href="/browse" className="hover:underline">Browse</Link></li>
                    </ul>
                </div>
                <div>
                    <h3 className="font-semibold text-lg mb-4">Legal</h3>
                    <ul>
                        <li><a href="#privacy" className="hover:underline">Privacy Policy</a></li>
                        <li><a href="#terms" className="hover:underline">Terms of Service</a></li>
                        <li><a href="#cookies" className="hover:underline">Cookie Policy</a></li>
                    </ul>
                </div>
                <div>
                    <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
                    <p>Email: support@g.msuiit.edu.ph</p>
                    <p>Telephone: +63 (063) 221-4056</p>
                    <div className="flex space-x-4 mt-4">
                        <a href="https://gmail.com" target="_blank" rel="noopener noreferrer"><Mail className="text-white hover:text-blue-600" /></a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><InstagramLogoIcon className="text-white hover:text-blue-400" /></a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><Linkedin className="text-white hover:text-blue-700" /></a>
                    </div>
                </div>
            </div>
            <div className="text-center border-foreground/40 dark:border-border text-xs mt-8 pt-4">
                <p>© 2024 Mindanao State University - Iligan Institute of Technology. All rights reserved.</p>
                <p>Developed by <Link href="https://github.com/jeius" className='font-semibold hover:underline'>Julius Pahama</Link></p>
            </div>
        </footer>
    );
};

export default Footer;
