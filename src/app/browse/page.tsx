
import { Skeleton } from '@/components/ui/skeleton';
import dynamic from 'next/dynamic';

const ThesesTable = dynamic(() => import('@/features/browse/components/theses-table'), {
    loading: () => <Skeleton className='w-[70vw] h-[50vh] m-auto border' />,
})


export default async function Browse() {
    return (
        <main className="pb-4 lg:pl-16">
            <div id="browse-page" className="relative px-3 py-5 sm:px-5 m-auto max-w-none">
                <div style={{ minHeight: 'calc(-7rem + 100vh)' }}>
                    <div className="mb-28 h-full">
                        <ThesesTable />
                    </div>
                </div>
            </div>
        </main>
    )
}
