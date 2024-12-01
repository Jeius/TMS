import { Skeleton } from '@/components/ui/skeleton';
import ThesesTable from '@/features/browse/components/theses-table';
import React, { Suspense } from 'react';

export default async function Browse() {
  return (
    <main id="browse-page" className="mb-28 min-h-[85vh] max-w-none lg:pl-16">
      <div className="relative m-auto p-4 sm:p-5 lg:p-8">
        <Suspense fallback={<TableSkeleton />}>
          <ThesesTable />
        </Suspense>
      </div>
    </main>
  );
}

function TableSkeleton() {
  return (
    <div className="m-auto max-w-[min(57rem,85vw)] overflow-hidden rounded-2xl border bg-card">
      <div className="flex h-16 justify-between space-x-6 border-b p-4">
        <div className="flex space-x-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="w-20" />
          ))}
        </div>
        <div className="flex space-x-2">
          <Skeleton className="w-24" />
          <Skeleton className="w-24" />
        </div>
      </div>

      <div className="grid grid-cols-[1fr_0.6fr] grid-rows-1">
        <div className="grid grid-flow-row">
          <div className="border-b border-r p-4">
            <Skeleton className="h-6 w-32" />
          </div>
          {Array.from({ length: 9 }).map((_, i) => (
            <div
              key={i}
              className="flex flex-col space-y-2 border-b border-r p-4"
            >
              <Skeleton className="h-6 w-10/12" />
              <Skeleton className="h-6 w-4/12" />
              <Skeleton className="h-6 w-7/12" />
            </div>
          ))}
        </div>
        <div className="grid grid-flow-row border-b border-r p-4">
          <div className="flex flex-col space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <React.Fragment key={i}>
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-6 w-28" />
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
