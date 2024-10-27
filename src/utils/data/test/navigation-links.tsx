import { BookCopy, BookOpen, BookOpenCheck, CalendarDays, CalendarFold, ChartLine, FilePlus2, House, Library, MessageCircle, Search, Send, SettingsIcon, UserIcon } from "lucide-react";

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
];

export const quickActionsLinks = [
    { href: "#", label: "Submit Proposal", icon: <Send aria-hidden="true" focusable="false" size={30} /> },
    { href: "#", label: "Browse Theses", icon: <Search aria-hidden="true" focusable="false" size={30} /> },
    { href: "#", label: "Go to Library", icon: <BookOpen aria-hidden="true" focusable="false" size={30} /> },
    { href: "#", label: "Schedule Defense", icon: <CalendarFold aria-hidden="true" focusable="false" size={30} /> },
    { href: "#", label: "Upload Thesis", icon: <FilePlus2 aria-hidden="true" focusable="false" size={30} /> },
    { href: "#", label: "Borrow Thesis", icon: <BookCopy aria-hidden="true" focusable="false" size={30} /> },
]