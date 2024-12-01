import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function ContactUs() {
  return (
    <div className="pl-1">
      <h3 className="mb-1 font-semibold">Contact Us</h3>
      <p className="text-sm text-foreground/80 dark:text-foreground/65">
        Email:
        {
          <Button asChild variant="text" size="text">
            <Link
              target="_blank"
              rel="noopener noreferrer"
              href="https://mail.google.com/mail/?view=cm&to=ccs.ec@g.msuiit.edu.ph&su=Hello&body=Your%20message%20here"
            >
              ccs.ec@g.msuiit.edu.ph
            </Link>
          </Button>
        }
      </p>
      <p className="text-sm text-foreground/80 dark:text-foreground/65">
        Telephone: +63 (063) 221-4056
      </p>
    </div>
  );
}
