import { DashboardIcon } from '@radix-ui/react-icons';
import {
  BookOpen,
  BookOpenCheck,
  CalendarDays,
  CalendarFold,
  ChartLine,
  FilePlus2,
  House,
  Library,
  LucideInbox,
  MessageCircle,
  Search,
  Send,
  SendIcon,
  SettingsIcon,
  UserIcon,
} from 'lucide-react';

export const primaryLinks = [
  { label: 'Home', href: '/', icon: House },
  { label: 'Dashboard', href: '/dashboard', icon: DashboardIcon },
  { label: 'Browse', href: '/browse', icon: Search },
];

export const userLinks = [
  { label: 'Library', href: '/library', icon: Library },
  { label: 'Inbox', href: '/inbox', icon: MessageCircle },
  { label: 'Submit', href: '/submit', icon: SendIcon },
  { label: 'Schedule', href: '/schedule', icon: CalendarDays },
  { label: 'Upload', href: '/upload', icon: FilePlus2 },
];

export const toolLinks = [
  { label: 'Analytics', href: '/analytics', icon: ChartLine },
  {
    label: 'Plagiarism Checker',
    href: '/plagiarism-tool',
    icon: BookOpenCheck,
  },
];

export const accountLinks = [
  { href: '/profile', label: 'Profile', icon: UserIcon },
  { href: '/settings', label: 'Settings', icon: SettingsIcon },
];

export const quickActionsLinks = [
  { href: '/submit', label: 'Submit Proposal', icon: Send },
  { href: '/browse', label: 'Browse Theses', icon: Search },
  { href: '/library', label: 'Go to Library', icon: BookOpen },
  { href: '/schedule', label: 'Schedule Defense', icon: CalendarFold },
  { href: '/upload', label: 'Upload Thesis', icon: FilePlus2 },
  { href: '/inbox', label: 'Check Inbox', icon: LucideInbox },
];
