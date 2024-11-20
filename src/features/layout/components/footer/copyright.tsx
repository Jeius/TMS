import Link from 'next/link';

export default function Copyrights() {
  return (
    <>
      <p>© 2024 MSU - Iligan Institute of Technology. All rights reserved.</p>
      <p>
        Developed by{' '}
        <Link
          href="https://github.com/jeius"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold hover:text-foreground"
        >
          Julius Pahama
        </Link>
      </p>
    </>
  );
}
