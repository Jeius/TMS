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

export const navigationLinks = [
    primaryLinks, userLinks, toolLinks
]