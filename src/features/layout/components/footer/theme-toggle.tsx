'use client'

import { Button } from '@/components/ui/button';
import { useIsMounted } from '@/lib/hooks/use-is-mounted';
import { DesktopIcon } from '@radix-ui/react-icons';
import { MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from 'next-themes';

export default function ThemeToggle({ open }: { open?: boolean }) {
    const { theme, setTheme } = useTheme();
    const isMounted = useIsMounted();

    const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const value = e.currentTarget.value;
        setTheme(value);
    };

    return isMounted && (
        <div className="flex p-1 size-fit items-center rounded-full border border-foreground/60 text-foreground/60 dark:border-border">
            <Button variant='ghost' value='light'
                aria-label='Light mode' data-selected={theme === 'light'}
                className='size-8 p-2 rounded-full hover:bg-transparent data-[selected=true]:bg-primary data-[selected=true]:text-foreground'
                onClick={handleClick}
            >
                <SunIcon aria-hidden='true' />
            </Button>
            <Button variant='ghost' value='system'
                aria-label='System mode' data-selected={theme === 'system'}
                className='size-8 p-2 rounded-full hover:bg-transparent data-[selected=true]:text-foreground'
                onClick={handleClick}
            >
                <DesktopIcon aria-hidden='true' />
            </Button>
            <Button variant='ghost' value='dark'
                aria-label='Dark mode' data-selected={theme === 'dark'}
                className='size-8 p-2 rounded-full hover:bg-transparent data-[selected=true]:text-foreground'
                onClick={handleClick}
            >
                <MoonIcon aria-hidden='true' />
            </Button>
        </div>
    );
}