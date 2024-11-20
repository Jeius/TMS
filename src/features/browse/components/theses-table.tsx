import { Button } from '@/components/ui/button';
import { TooltipProvider } from '@/components/ui/tooltip';
import Filters from '@/features/browse/components/filters';
import ThesesTableContent from '@/features/browse/components/table-content';
import { cn } from '@/lib/utils';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { BookCopyIcon } from 'lucide-react';
import React from 'react';
import { fetchTheses } from '../lib/actions';
import { FILTERS } from '../lib/constants';
import { ColumnVisibilityControl } from './column-visibility';
import SortOptions from './sort';

type TableProps = React.HtmlHTMLAttributes<HTMLDivElement>;

export default async function ThesesTable({ className, ...props }: TableProps) {
  const queryClient = new QueryClient();

  await Promise.all([
    ...Object.entries(FILTERS).map(([filterId, fetcher]) =>
      queryClient.prefetchInfiniteQuery({
        queryKey: [filterId, 'filter', ''],
        queryFn: async ({ pageParam }) => await fetcher(pageParam),
        initialPageParam: 0,
      })
    ),
    queryClient.prefetchQuery({
      queryKey: ['theses'],
      queryFn: () => fetchTheses({}),
    }),
  ]);

  return (
    <TooltipProvider>
      <div id="theses-table" className={cn('relative', className)} {...props}>
        <div className="m-auto flex max-w-min flex-col overflow-hidden rounded-xl border bg-card shadow">
          <HydrationBoundary state={dehydrate(queryClient)}>
            <div className="flex flex-col items-center justify-between gap-14 overflow-hidden p-4 xs:flex-row xs:items-end">
              <Filters />
              <div className="flex w-full flex-wrap items-center justify-between gap-2 xs:w-fit xs:justify-end">
                <SortOptions />
                <ColumnVisibilityControl type="popover" />
              </div>
            </div>

            <ThesesTableContent />
          </HydrationBoundary>

          <div className="flex border-t p-4 text-card-foreground">
            <Button size="lg" className="mx-auto flex-wrap font-bold">
              <BookCopyIcon aria-hidden="true" />
              Load more theses
            </Button>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
