import { Button } from '@/components/ui/button';
import { NAVROUTES } from '@/lib/constants';
import Link from 'next/link';

export default function QuickLinks() {
  return (
    <div>
      <h3 className="mb-1 pl-1 font-semibold">Quick Links</h3>
      <ul className="grid grid-cols-2 gap-x-5">
        <li>
          <Button asChild variant="text" size="text">
            <Link href="/#hero">Home</Link>
          </Button>
        </li>
        <li>
          <Button asChild variant="text" size="text">
            <Link href="/#features">Features</Link>
          </Button>
        </li>
        {Object.entries(NAVROUTES)
          .filter(
            (entry) => entry[1] !== '/' && entry[1] !== '/plagiarism-tool'
          )
          .sort((a, b) => a[0].localeCompare(b[0])) //Sort by asc order
          .map(([label, href]) => (
            <li key={href}>
              <Button asChild variant="text" size="text">
                <Link href={href} className="capitalize">
                  {label}
                </Link>
              </Button>
            </li>
          ))}
      </ul>
    </div>
  );
}
