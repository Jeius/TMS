
import { Button } from '@/components/ui/button';
import { TooltipProvider } from '@/components/ui/tooltip';
import { supabaseServerClient } from '@/lib/supabase/server';
import Image from 'next/image';
import Link from 'next/link';
import NavigationMenu from '../navigation/navigation-menu';
import NotificationMenu from './notification-menu';
import SearchBar from './searchbar';
import UserMenu from './user-menu';


export default async function AppHeader() {
    const supabase = await supabaseServerClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    return (
        <TooltipProvider>
            <header id="app-header"
                className="sticky inset-x-0 top-0 z-50 border-b bg-card/70 backdrop-blur-lg shadow p-2 lg:px-4"
            >
                <div className="flex items-center justify-between">
                    <div className="flex grow items-center space-x-2 pl-2">
                        <NavigationMenu />
                        <Link href="/" id="app-title"
                            className="flex items-center space-x-2 font-semibold text-lg w-fit"
                        >
                            <Image
                                src={'/images/msuiit-logo-275x280.png'}
                                alt="MSU-IIT"
                                width={40}
                                height={40}
                                aria-hidden="true"
                            />
                            <h1 className="hidden md:block">Thesis Management System</h1>
                        </Link>
                    </div>
                    <div className="flex items-center space-x-2 pl-2">
                        <SearchBar />
                        {user && <NotificationMenu />}
                        {user ? (
                            <UserMenu />
                        ) : (
                            <div className="flex items-center sm:pl-5 space-x-2">
                                <Button variant="outline" size="sm" asChild>
                                    <Link href="/login?signUp=true">Sign up</Link>
                                </Button>
                                <Button asChild>
                                    <Link href="/login">Sign in</Link>
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </header>
        </TooltipProvider>
    );
}
