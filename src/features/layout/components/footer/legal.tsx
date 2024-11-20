import Link from 'next/link';

export default function Legal() {
  return (
    <div>
      <h3 className="mb-1 font-semibold">Legal</h3>
      <ul className="text-sm text-foreground/70">
        <li>
          <Link
            href="#privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground"
          >
            Privacy Policy
          </Link>
        </li>
      </ul>
    </div>
  );
}
