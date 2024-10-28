import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { TooltipWrapper } from '@/components/ui/tooltip';
import { Search } from 'lucide-react';


export default function SearchBar() {
    return (
        <>
            <Input
                id="search-input"
                className="hidden sm:block w-[250px]"
                type="search"
                placeholder="Search..."
                aria-label="Search through site content" />
            <TooltipWrapper label="Search">
                <Button
                    id="search-button"
                    className="sm:hidden rounded-full size-fit p-2 text-foreground"
                    variant="ghost"
                    aria-label="Search button"
                >
                    <Search className="size-5" />
                </Button>
            </TooltipWrapper>
        </>
    );
}