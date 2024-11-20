import Link from 'next/link';

export default function QuickLinks() {
  return (
    <div>
      <h3 className="mb-1 font-semibold">Quick Links</h3>
      <ul className="text-sm text-foreground/70">
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
        <li>
          <Link href="/browse" className="hover:text-foreground">
            Browse
          </Link>
        </li>
      </ul>
    </div>
  );
}
