
import { Skeleton } from '@/components/ui/skeleton';
import ThesesTable from '@/features/browse/components/theses-table';
import React, { Suspense } from 'react';



export default async function Browse() {
    return (
        <main id="browse-page" className="pb-4 lg:pl-16">
            <div className="relative px-3 py-5 sm:px-5 m-auto max-w-none">
                <div className='min-h-[85vh] mb-28'>
                    <Suspense fallback={<TableSkeleton />}>
                        <ThesesTable />
                    </Suspense>
                </div>

            </div>
        </main>
    )
}


function TableSkeleton() {
    return (
        <div className='m-auto max-w-[min(57rem,85vw)] bg-card border rounded-2xl overflow-hidden'>
            <div className='flex space-x-6 justify-between h-16 border-b p-4'>
                <div className='flex space-x-2'>
                    {Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className='w-20' />)}
                </div>
                <div className='flex space-x-2'>
                    <Skeleton className='w-24' />
                    <Skeleton className='w-24' />
                </div>
            </div>

            <div className='grid grid-rows-1 grid-cols-[1fr_0.6fr]'>
                <div className='grid grid-flow-row'>
                    <div className='border-r border-b p-4'><Skeleton className='h-6 w-32' /></div>
                    {Array.from({ length: 9 }).map((_, i) => (
                        <div key={i} className='flex flex-col space-y-2 border-r border-b p-4'>
                            <Skeleton className='h-6 w-10/12' />
                            <Skeleton className='h-6 w-4/12' />
                            <Skeleton className='h-6 w-7/12' />
                        </div>
                    ))}
                </div>
                <div className='grid grid-flow-row border-r border-b p-4'>
                    <div className='flex flex-col space-y-3'>
                        {Array.from({ length: 3 }).map((_, i) => (
                            <React.Fragment key={i}>
                                <Skeleton className='h-6 w-24' />
                                <Skeleton className='h-6 w-32' />
                                <Skeleton className='h-6 w-28' />
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}