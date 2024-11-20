import { Facebook } from '@/components/social-icons';
import Link from 'next/link';

export default function Social() {
  return (
    <div className="mt-2 flex items-center space-x-2">
      <Link
        href="https://www.facebook.com/MSUIITPHCCS?mibextid=ZbWKwL"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Facebook width="1.7rem" height="1.7rem" />
      </Link>
    </div>
  );
}
