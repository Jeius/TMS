import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'

import React from 'react'
import QuickActions from './quick-actions'
import Link from 'next/link'
import { Separator } from '@/components/ui/separator'

const accountLinks = [
    { href: "#", label: "Profile" },
    { href: "#", label: "Account Management" },
    { href: "#", label: "Logout" },
]

export default function Home() {
    return (
        <div className="flex justify-center max-w-none m-auto p-5">
            <div className="flex flex-col w-fit items-center space-y-16">
                <Card className="w-full bg-primary">
                    <CardHeader className="space-y-1">
                        <CardTitle className="font-bold text-3xl text-secondary">Welcome, [user]</CardTitle>
                        <CardDescription className="text-primary-foreground">Role: [role]</CardDescription>
                    </CardHeader>
                    <CardFooter className="flex flex-wrap justify-end space-x-1 text-primary-foreground">
                        {accountLinks.map((link, index) => (
                            <div key={index} className='flex space-x-1 items-center'>
                                <Link
                                    href={link.href}
                                    className="text-sm font-semibold no-underline underline-offset-2 hover:underline"
                                >
                                    {link.label}
                                </Link>

                                {index !== accountLinks.length - 1 && <Separator orientation="vertical" className="h-4 bg-primary-foreground/70" />}
                            </div>
                        ))}
                    </CardFooter>
                </Card>

                <QuickActions />
            </div>
        </div>
    )
}




