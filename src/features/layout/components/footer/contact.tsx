import Link from 'next/link';

export default function ContactUs() {
  return (
    <div>
      <h3 className="mb-1 font-semibold">Contact Us</h3>
      <p className="text-sm text-foreground/70">
        Email:{' '}
        {
          <Link
            target="_blank"
            rel="noopener noreferrer"
            href="https://mail.google.com/mail/?view=cm&to=ccs.ec@g.msuiit.edu.ph&su=Hello&body=Your%20message%20here"
            className="hover:text-foreground"
          >
            ccs.ec@g.msuiit.edu.ph
          </Link>
        }
      </p>
      <p className="text-sm text-foreground/70">
        Telephone: +63 (063) 221-4056
      </p>
    </div>
  );
}
