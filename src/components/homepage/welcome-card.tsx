import { accountLinks } from '@/utils/data/test/navigation-links';
import Link from 'next/link';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Separator } from '../ui/separator';

export default function WelcomeCard() {
    return (
        <Card id="welcome-card" filter="glass" colorType="gradient" className="w-full bg-primary">
            <CardHeader className="space-y-1">
                <CardTitle className="font-bold text-3xl text-secondary">
                    Welcome, [user]
                </CardTitle>
                <CardDescription>
                    Role: [role]
                </CardDescription>
            </CardHeader>
            <CardFooter className="flex flex-wrap justify-end gap-2">
                {accountLinks.map((link, index) => (
                    <div key={index} className='flex items-center space-x-2'>
                        <Link
                            href={link.href}
                            className="flex items-center space-x-2 text-sm font-semibold no-underline underline-offset-2 hover:underline"
                        >
                            <span>{link.label}</span> {link.icon}
                        </Link>

                        {index !== accountLinks.length - 1 && (
                            <Separator orientation="vertical" className="h-4 bg-primary-foreground/60" />
                        )}
                    </div>
                ))}
            </CardFooter>
        </Card>
    )
}
