import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Legal() {
  return (
    <div>
      <h3 className="mb-1 pl-1 font-semibold">Legal</h3>
      <ul>
        <li>
          <Button asChild variant="text" size="text">
            <Link href="#privacy" target="_blank" rel="noopener noreferrer">
              Privacy Policy
            </Link>
          </Button>
        </li>
      </ul>
    </div>
  );
}
