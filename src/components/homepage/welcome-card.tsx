import { accountLinks } from '@/utils/data/test/navigation-links';
import Link from 'next/link';
import { Button } from '../ui/button';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Separator } from '../ui/separator';

export default function WelcomeCard() {
    return (
        <Card id="welcome-card" variant="gradientGlass" className="w-full bg-primary/70 dark:bg-primary/75">
            <CardHeader className="space-y-1">
                <CardTitle className="font-bold text-3xl text-secondary">
                    Welcome, [user]
                </CardTitle>
                <CardDescription>
                    Role: [role]
                </CardDescription>
            </CardHeader>
            <CardFooter className="flex flex-wrap justify-end pt-4 gap-2">
                {accountLinks.map((link, index) => (
                    <div key={index} className='flex items-center space-x-1'>
                        <Button asChild variant="link" size="sm" className="size-min p-1 text-card-foreground">
                            <Link
                                href={link.href}
                                className="flex items-center space-x-2 font-semibold"
                            >
                                <span>{link.label}</span> {link.icon}
                            </Link>
                        </Button>

                        {index !== accountLinks.length - 1 && (
                            <Separator orientation="vertical" className="h-4 bg-primary-foreground/60" />
                        )}
                    </div>
                ))}
            </CardFooter>
        </Card>
    )
}
