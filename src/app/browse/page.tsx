import BlurryBlob from '@/components/animated/blurry-blob';
import ThesesTable from '@/features/browse/components/theses-table';
import { getFilters } from '@/server/actions/filters';
import { getTheses } from '@/server/actions/theses';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';


export default async function Browse() {
    const theses = await getTheses()
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ['filters'],
        queryFn: getFilters,
    });

    return (
        <main className="pb-4 lg:pl-16">
            <div id="browse-page" className="relative px-3 py-5 sm:px-5 m-auto max-w-none">
                <div className="fixed left-1/3 top-10">
                    <BlurryBlob firstBlobColor="bg-primary" secondBlobColor="bg-secondary" />
                </div>
                <div className="fixed right-0 bottom-0 rotate-45">
                    <BlurryBlob className="size-32" firstBlobColor="bg-primary" secondBlobColor="bg-secondary" />
                </div>
                <div className="fixed left-0 bottom-0 -rotate-12">
                    <BlurryBlob className="size-40" firstBlobColor="bg-secondary" secondBlobColor="bg-primary" />
                </div>
                <div style={{ minHeight: 'calc(-110px + 100vh)' }}>
                    <div className="mb-28 h-full">
                        <HydrationBoundary state={dehydrate(queryClient)}>
                            <ThesesTable data={theses} />
                        </HydrationBoundary>
                    </div>
                </div>
            </div>
        </main>
    )
}
