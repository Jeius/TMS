import ThemeToggle from '@/components/theme-toggle';
import { Separator } from '@/components/ui/separator';

export default function NavigationFooter() {
    return (
        <div id="sidebar-footer" className="flex flex-col w-full items-start justify-center">
            <Separator className='my-1' orientation="horizontal" />
            <ThemeToggle />
        </div>
    )
}
