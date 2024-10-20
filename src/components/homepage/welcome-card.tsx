import Link from 'next/link';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Separator } from '../ui/separator';

// Array of account links for easy modification and mapping.
const accountLinks = [
    { href: "#", label: "Profile" },
    { href: "#", label: "Account Management" },
    { href: "#", label: "Logout" },
];

// Component to render account links within a card footer.
const AccountLinks = () => {
    return accountLinks.map((link, index) => (
        <div key={index} className='flex space-x-1 items-center'>
            <Link
                href={link.href}
                className="text-sm font-semibold no-underline underline-offset-2 hover:underline"
            >
                {link.label}
            </Link>
            {/* Separator for visual division between links */}
            {index !== accountLinks.length - 1 && (
                <Separator orientation="vertical" className="h-4" />
            )}
        </div>
    ))
};

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
            <CardFooter className="flex flex-wrap justify-end space-x-1">
                <AccountLinks />
            </CardFooter>
        </Card>
    )
}
