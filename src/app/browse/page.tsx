import ThesesTable from '@/features/browse/components/theses-table';
import { fetchFilterValues } from '@/mock/actions/fetch-filters';
import { getFilters } from '@/server/actions/filters';
import { getTheses } from '@/server/actions/theses';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';


export default async function Browse() {
    const theses = await getTheses();
    const filters = await getFilters();
    const queryClient = new QueryClient();

    async function prefetchFilters() {
        await queryClient.prefetchQuery({
            queryKey: ['filters'],
            queryFn: getFilters,
        });
    }

    async function prefetchFilterValues() {
        await Promise.all(
            filters.map(filter =>
                queryClient.prefetchQuery({
                    queryKey: [filter],
                    queryFn: () => fetchFilterValues(filter),
                })
            )
        );
    }

    await Promise.all([prefetchFilters(), prefetchFilterValues()]);

    return (
        <main className="pb-4 lg:pl-16">
            <div id="browse-page" className="relative px-3 py-5 sm:px-5 m-auto max-w-none">
                <div style={{ minHeight: 'calc(-7rem + 100vh)' }}>
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
