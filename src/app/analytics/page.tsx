import { RecentActivitiesCard } from '@/app/analytics/recent-activities-card';
import { Statistic, StatisticsCard } from '@/app/analytics/stats-card';
import { ThesesChartCard } from '@/app/analytics/theses-chart-card';
import Filters from '@/components/filters';
import { fetchFilters } from '@/mock/actions/fetch-filters';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import {
  Book,
  BookOpenCheckIcon,
  BookPlusIcon,
  BookUp2Icon
} from 'lucide-react';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type Props = {
  searchParams: { [key: string]: string | string[] | undefined }
}

const getStatistics = (): Statistic[] => {
  return [
    {
      title: "Total Approved Theses",
      value: 525,
      icon: <Book className="size-4" />,
      description: "Archived at the department"
    },
    {
      title: "Borrowed",
      value: 325,
      icon: <BookUp2Icon className="size-4" />,
      description: "Total theses borrowed"
    },
    {
      title: "Approved Proposals",
      symbol: <strong>+</strong>,
      value: 143,
      icon: <BookOpenCheckIcon className="size-4" />,
      description: "+16% from last school year"
    },
    {
      title: "Uploaded",
      symbol: <strong>+</strong>,
      value: 150,
      icon: <BookPlusIcon className="size-4" />,
      description: "+20% from last school year"
    }
  ]
}

export default async function Dashboard() {
  const statistics = getStatistics()
  const filters = ["college", "department"];
  const queryClient = new QueryClient();

  queryClient.setQueryData(["filters"], filters);

  await Promise.all(filters.map(filter =>
    queryClient.prefetchQuery({
      queryKey: [filter],
      queryFn: () => fetchFilters(filter)
    })
  ));

  return (
    <div className="flex flex-col p-4 gap-y-4 md:p-5 md:gap-y-5 items-center box-content m-auto max-w-none">
      <div className="flex flex-col gap-2 sm:flex-row sm:justify-between w-full max-w-screen-2xl">
        <h1 className='font-bold text-2xl lg:text-4xl'>
          Overview
        </h1>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <Filters showInitial={filters.length} hideShowMore />
        </HydrationBoundary>
      </div>

      <section className='grid grid-cols-1 md:grid-row-2 lg:grid-flow-row gap-3 md:gap-4 w-full max-w-screen-2xl'>
        <div className="grid gap-3 md:gap-4 grid-cols-1 grid-rows-4 md:grid-cols-2 md:grid-rows-2 xl:grid-cols-4 xl:grid-rows-1">
          {statistics.map(data =>
            <StatisticsCard
              key={data.title}
              title={data.title}
              symbol={data.symbol}
              value={data.value}
              description={data.description}
              icon={data.icon} />)}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-4">
          <ThesesChartCard />
          <RecentActivitiesCard />
        </div>
      </section>
    </div>
  )
}


