
import { Button } from '@/components/ui/button'
import { TooltipProvider } from '@/components/ui/tooltip'
import ThesesTableContent from '@/features/browse/components/table-content'
import { cn } from '@/lib/utils'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { BookCopyIcon } from 'lucide-react'
import React from 'react'
import { fetchTheses } from '../lib/actions'
import { ColumnVisibilityControl } from './column-visibility'
import SortOptions from './sort'

type TableProps = React.HtmlHTMLAttributes<HTMLDivElement>

export default async function ThesesTable({ className, ...props }: TableProps) {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ['theses'],
        queryFn: fetchTheses,
    });

    return (
        <TooltipProvider>
            <div id="theses-table" className={cn('relative', className)} {...props}>
                <div className="flex flex-col m-auto bg-card shadow border rounded-xl max-w-min overflow-hidden">
                    <div className='overflow-hidden p-4 gap-14 flex justify-between flex-col xs:flex-row items-center xs:items-end'>
                        <HydrationBoundary state={dehydrate(queryClient)}>
                            {/* <Filters /> */}
                        </HydrationBoundary>
                        <div className='flex justify-between w-full xs:w-fit xs:justify-end items-center gap-2 flex-wrap'>
                            <SortOptions />
                            <ColumnVisibilityControl type='popover' />
                        </div>
                    </div>

                    <HydrationBoundary state={dehydrate(queryClient)}>
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
