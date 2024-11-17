
import Filters from '@/components/filters'
import { Button } from '@/components/ui/button'
import { TooltipProvider } from '@/components/ui/tooltip'
import ThesesTableContent from '@/features/browse/components/table-content'
import { cn } from '@/lib/utils'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { BookCopyIcon } from 'lucide-react'
import React from 'react'
import { fetchTheses, fetchUniqueDataByColumnId } from '../lib/actions'
import { FILTER_IDS } from '../lib/constants'
import { ColumnVisibilityControl } from './column-visibility'
import SortOptions from './sort'

type TableProps = React.HtmlHTMLAttributes<HTMLDivElement>

export default async function ThesesTable({ className, ...props }: TableProps) {
    const queryClient = new QueryClient();

    await Promise.all([
        ...FILTER_IDS.map((filterId) =>
            queryClient.prefetchInfiniteQuery({
                queryKey: [filterId, 'filter'],
                queryFn: async ({ pageParam }) => await fetchUniqueDataByColumnId(filterId, pageParam),
                initialPageParam: 0
            })
        ),
        queryClient.prefetchQuery({
            queryKey: ['theses'],
            queryFn: () => fetchTheses({}),
        })
    ]);

    return (
        <TooltipProvider>
            <div id="theses-table" className={cn('relative', className)} {...props}>
                <div className="flex flex-col m-auto bg-card shadow border rounded-xl max-w-min overflow-hidden">
                    <HydrationBoundary state={dehydrate(queryClient)}>
                        <div className='overflow-hidden p-4 gap-14 flex justify-between flex-col xs:flex-row items-center xs:items-end'>
                            <Filters />
                            <div className='flex justify-between w-full xs:w-fit xs:justify-end items-center gap-2 flex-wrap'>
                                <SortOptions />
                                <ColumnVisibilityControl type='popover' />
                            </div>
                        </div>

                        <ThesesTableContent />
                    </HydrationBoundary>

                    <div className="flex border-t p-4 text-card-foreground">
                        <Button size='lg' className="mx-auto font-bold flex-wrap">
                            <BookCopyIcon aria-hidden="true" />
                            Load more theses
                        </Button>
                    </div>
                </div>
            </div>
        </TooltipProvider>
    )
}
