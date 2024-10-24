import { TooltipProvider } from "@/components/ui/tooltip";
import Image from 'next/image';
import Link from 'next/link';
import NavigationMenu from '../navigation/navigation-menu';
import NotificationMenu from './notification-menu';
import SearchBar from './searchbar';
import UserMenu from './user-menu';

export default function AppHeader() {
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
                                src={`/images/msuiit-logo-275x280.png`}
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
                        <NotificationMenu />
                        <UserMenu />
                    </div>
                </div>
            </header>
        </TooltipProvider>
    );
}
