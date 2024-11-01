import Link from 'next/link'

export default function ContactUs() {
    return (
        <div>
            <h3 className="font-semibold mb-1">Contact Us</h3>
            <p className='text-foreground/70 text-sm'>Email: {
                <Link target="_blank" rel="noopener noreferrer"
                    href="https://mail.google.com/mail/?view=cm&to=ccs.ec@g.msuiit.edu.ph&su=Hello&body=Your%20message%20here"
                    className='hover:text-foreground'
                >
                    ccs.ec@g.msuiit.edu.ph
                </Link>
            }</p>
            <p className='text-foreground/70 text-sm'>Telephone: +63 (063) 221-4056</p>

        </div>
    )
}
