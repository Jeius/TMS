import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useQuery } from "@tanstack/react-query";
import {
    BookCopy,
    BookOpenCheck,
    CalendarDays,
    ChartLine,
    FilePlus2,
    House,
    Library,
    MessageCircle,
    Search
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const primaryLinks = [
    { href: '/', label: 'Home', icon: <House /> },
    { href: '/browse', label: 'Browse', icon: <Search /> },
];

const userLinks = [
    { href: '/my-library', label: 'My Library', icon: <Library /> },
    { href: '/upload', label: 'Upload', icon: <FilePlus2 /> },
    { href: '/borrow', label: 'Borrow', icon: <BookCopy /> },
    { href: '/schedule', label: 'Schedule', icon: <CalendarDays /> },
    { href: '/messages', label: 'Messages', icon: <MessageCircle /> },
];

const toolLinks = [
    { href: '/analytics', label: 'Analytics', icon: <ChartLine /> },
    { href: '/plagiarism-tool', label: 'Plagiarism Checker', icon: <BookOpenCheck /> },
];


export default function NavigationItems() {
    const pathname = usePathname();
    const navigationLinks = [primaryLinks, userLinks, toolLinks];

    const { data: isMenuOpen, refetch: refetchMenu } = useQuery<boolean>({
        queryKey: ["navigation", "menu"],
        queryFn: () => false,
    });

    const { data: isSidebarOpen } = useQuery<boolean>({
        queryKey: ["navigation", "sidebar"],
    });

    const highlight = (label: string) => {
        const currentPath = pathname === "/" ? "home" : pathname.substring(1);
        return currentPath === label.toLowerCase() ? "bg-primary text-secondary" : "hover:bg-accent font-medium";
    };

    const handleClick = () => {
        isMenuOpen && refetchMenu();
    };

    return (
        <ScrollArea className="flex grow flex-col w-full items-center overflow-x-visible justify-start">
            {navigationLinks.map((linkGroup, groupIndex) => (
                <React.Fragment key={`link-group-${groupIndex}`}>
                    {linkGroup.map(subLink => (
                        <Button key={subLink.href} variant="ghost" asChild
                            className={`p-0 h-fit my-1 w-full justify-start rounded-md whitespace-nowrap ${highlight(subLink.label)}`}
                        >
                            <Link href={subLink.href} onClick={handleClick}
                                id={`sidebar-link-${subLink.label.toLowerCase().replace(/ /g, "-")}`}
                                title={`sidebar-link-${subLink.label.toLowerCase().replace(/ /g, "-")}`}
                            >
                                <div aria-hidden="true" className="flex size-9 p-2 shrink-0 items-center justify-center">
                                    {subLink.icon}
                                </div>
                                {(isSidebarOpen || isMenuOpen) && (
                                    <span className="pr-4 text-sm pointer-events-none">
                                        {subLink.label}
                                    </span>
                                )}
                            </Link>
                        </Button>
                    ))}

                    {groupIndex !== navigationLinks.length - 1 && (
                        <Separator className='my-1' orientation="horizontal" />
                    )}
                </React.Fragment>
            ))}
        </ScrollArea>
    );
}
