
import Filters from '@/components/filters'
import { Button } from '@/components/ui/button'
import { TooltipProvider } from '@/components/ui/tooltip'
import ThesesTableContent from '@/features/browse/components/table-content'
import { cn } from '@/lib/utils'
import { fetchMockFilterIds } from '@/mock/actions/fetch-filters'
import { fetchMockTheses } from '@/mock/actions/fetch-thesis-data'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { BookCopyIcon } from 'lucide-react'
import React from 'react'
import { ColumnVisibilityControl } from './column-visibility'
import Container from './container'
import SortOptions from './sort'

type TableProps = React.HtmlHTMLAttributes<HTMLDivElement>

export default async function ThesesTable({ className, ...props }: TableProps) {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ['filterIds'],
        queryFn: fetchMockFilterIds,
    });

    await queryClient.prefetchQuery({
        queryKey: ['theses'],
        queryFn: fetchMockTheses,
    });

    return (
        <TooltipProvider>
            <div id="theses-table" className={cn('relative', className)} {...props}>
                <div className="flex flex-col m-auto bg-card shadow border rounded-xl max-w-fit overflow-hidden">
                    <Container className='overflow-hidden p-4 gap-14 flex justify-between flex-col xs:flex-row items-center xs:items-end'>
                        <HydrationBoundary state={dehydrate(queryClient)}>
                            <Filters />
                        </HydrationBoundary>
                        <div className='flex justify-between w-full xs:w-fit xs:justify-end items-center gap-2 flex-wrap'>
                            <SortOptions />
                            <ColumnVisibilityControl type='popover' />
                        </div>
                    </Container>

                    <HydrationBoundary state={dehydrate(queryClient)}>
                        <ThesesTableContent />
                    </HydrationBoundary>

                    <Container className="flex w-full max-w-full overflow-hidden border-t p-4 text-card-foreground">
                        <Button className="mx-auto font-bold flex-wrap h-auto min-h-10">
                            <BookCopyIcon aria-hidden="true" size='1.5rem' className='mr-2' />
                            Load more theses
                        </Button>
                    </Container>
                </div>
            </div>
        </TooltipProvider>
    )
}
