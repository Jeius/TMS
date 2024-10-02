import { Card, CardFooter, CardHeader } from '@/components/ui/card'

import React from 'react'
import QuickActions from './quick-actions'
import Link from 'next/link'
import { Separator } from '@/components/ui/separator'

const accountLinks = [
    { href: "#", label: "Profile" },
    { href: "#", label: "Account Management" },
    { href: "#", label: "Settings" },
    { href: "#", label: "Logout" },
]

export default function Home() {
    return (
        <div className="max-w-none m-auto p-5">
            <div className="flex flex-col w-fit items-center space-y-16">
                <Card className="w-full">
                    <CardHeader className="space-y-1">
                        <h1 className="font-semibold text-lg">Welcome, [user]</h1>
                        <span className="text-sm text-muted-foreground">[role]</span>
                    </CardHeader>
                    <CardFooter className="flex flex-wrap justify-end space-x-1">
                        {accountLinks.map((link, index) => (
                            <div key={index} className='flex space-x-1 items-center'>
                                <Link
                                    href={link.href}
                                    className="text-sm font-semibold no-underline underline-offset-2 hover:text-muted-foreground hover:underline"
                                >
                                    {link.label}
                                </Link>

                                {index !== accountLinks.length - 1 && <Separator orientation="vertical" className="h-4" />}
                            </div>
                        ))}
                    </CardFooter>
                </Card>

                <QuickActions />
            </div>
        </div>
    )
}




