'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Skeleton } from '@/components/ui/skeleton';
import { TooltipWrapper } from '@/components/ui/tooltip';
import { accountLinks } from '@/lib/navigation-links';
import { supabaseBrowserClient } from '@/lib/supabase/client';
import { User } from '@supabase/supabase-js';
import { LogOutIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function UserMenu() {
    const [user, setUser] = useState<User | null>(null);

    const router = useRouter();

    const handleLogout = async () => {
        const { error } = await supabaseBrowserClient().auth.signOut();
        if (error) {
            console.error("Error logging out:", error.message);
        } else {
            console.log("Logged out successfully");
            router.push('/'); // Redirect to home or login page after logging out
        }
    };

    useEffect(() => {
        // Fetch the session to get the authenticated user
        const fetchUser = async () => {
            const { data } = await supabaseBrowserClient().auth.getSession();
            setUser(data.session?.user ?? null);
        };

        fetchUser();

        // Optional: Set up a listener for auth state changes
        const { data: authListener } = supabaseBrowserClient().auth.onAuthStateChange(async (_event, session) => {
            setUser(session?.user ?? null);
        });

        // Clean up the listener on unmount
        return () => {
            authListener?.subscription.unsubscribe();
        };
    }, []);

    return (user &&
        <Popover>
            <TooltipWrapper label="Account" className="mr-3">
                <PopoverTrigger asChild>
                    <Button
                        id="user-avatar"
                        aria-label="Account"
                        className="size-fit p-0 rounded-full border-2 border-primary"
                        variant="outline"
                    >
                        <Avatar aria-hidden="true" className="size-9">
                            <AvatarImage
                                src="https://github.com/jeius.png"
                                alt="User Avatar"
                                className="transition-all duration-150 filter-none hover:brightness-150" />
                            <AvatarFallback>
                                <Skeleton className="size-full" />
                            </AvatarFallback>
                        </Avatar>
                    </Button>
                </PopoverTrigger>
            </TooltipWrapper>
            <PopoverContent id="user-menu" sideOffset={12} className="mr-1 p-2 max-w-40"
                onCloseAutoFocus={e => e.preventDefault()}
            >
                <div className="flex flex-col space-y-1">
                    {accountLinks.map(({ href, label, icon: Icon }) => (
                        <Button asChild
                            key={label}
                            size="sm"
                            variant="ghost"
                            aria-label={label}
                            className="flex space-x-3 items-center justify-between" >
                            <Link href={href}>
                                <span>{label}</span>
                                <Icon size={16} />
                            </Link>
                        </Button>
                    ))}
                    <Button size="sm" variant="ghost"
                        aria-label='Sign out'
                        className="flex space-x-3 justify-between"
                        onClick={handleLogout}
                    >
                        <span>Sign out</span>
                        <LogOutIcon aria-hidden="true" focusable="false" size={15} />
                    </Button>
                </div>
            </PopoverContent>
        </Popover>
    )
}