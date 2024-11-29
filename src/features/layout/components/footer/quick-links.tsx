import { NAVROUTES } from '@/lib/constants';
import Link from 'next/link';

export default function QuickLinks() {
  return (
    <div>
      <h3 className="mb-1 font-semibold">Quick Links</h3>
      <ul className="grid grid-cols-2 gap-x-5 text-sm text-foreground/70">
        <li>
          <Link href="/#hero" className="hover:text-foreground">
            Home
          </Link>
        </li>
        <li>
          <Link href="/#features" className="hover:text-foreground">
            Features
          </Link>
        </li>
        {Object.entries(NAVROUTES)
          .filter(
            (entry) => entry[1] !== '/' && entry[1] !== '/plagiarism-tool'
          )
          .map(([label, href]) => (
            <li key={href}>
              <Link href={href} className="hover:text-foreground">
                <p className="capitalize tracking-wide">{label}</p>
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
}
