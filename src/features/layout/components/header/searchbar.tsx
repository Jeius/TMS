import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { TooltipWrapper } from '@/components/ui/tooltip';
import { Search } from 'lucide-react';


export default function SearchBar() {
    return (
        <>
            <Input
                id="search-input"
                className="hidden sm:block max-w-[16rem] bg-background/80"
                type="search"
                placeholder="Search..."
                aria-label="Search through site content" />
            <TooltipWrapper label="Search">
                <Button
                    id="search-button"
                    size='icon'
                    className='block sm:hidden rounded-full shrink-0'
                    variant="ghost"
                    aria-label="Search button"
                >
                    <Search aria-hidden="true" />
                </Button>
            </TooltipWrapper>
        </>
    );
}