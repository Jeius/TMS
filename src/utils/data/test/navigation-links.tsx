import { BookCopy, BookOpenCheck, CalendarDays, ChartLine, FilePlus2, House, Library, LogOutIcon, MessageCircle, Search, SettingsIcon, UserIcon } from "lucide-react";

export const primaryLinks = [
    { href: '/', label: 'Home', icon: <House /> },
    { href: '/browse', label: 'Browse', icon: <Search /> },
];

export const userLinks = [
    { href: '/my-library', label: 'My Library', icon: <Library /> },
    { href: '/upload', label: 'Upload', icon: <FilePlus2 /> },
    { href: '/borrow', label: 'Borrow', icon: <BookCopy /> },
    { href: '/schedule', label: 'Schedule', icon: <CalendarDays /> },
    { href: '/messages', label: 'Messages', icon: <MessageCircle /> },
];

export const toolLinks = [
    { href: '/analytics', label: 'Analytics', icon: <ChartLine /> },
    { href: '/plagiarism-tool', label: 'Plagiarism Checker', icon: <BookOpenCheck /> },
];

export const accountLinks = [
    { href: "/profile", label: "Profile", icon: <UserIcon aria-hidden="true" focusable="false" size={15} /> },
    { href: "/settings", label: "Settings", icon: <SettingsIcon aria-hidden="true" focusable="false" size={15} /> },
    { href: "#", label: "Logout", icon: <LogOutIcon aria-hidden="true" focusable="false" size={15} /> },
];