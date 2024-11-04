import Link from 'next/link';

export default function Legal() {
    return (
        <div>
            <h3 className="font-semibold mb-1">Legal</h3>
            <ul className='text-foreground/70 text-sm'>
                <li><Link href="#privacy" target="_blank" rel="noopener noreferrer" className="hover:text-foreground">Privacy Policy</Link></li>
            </ul>
        </div>
    )
}
