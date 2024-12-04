/* eslint-disable @typescript-eslint/no-unused-vars */
import { RecentActivitiesCard } from '@/features/analytics/components/recent-activities-card';
import {
  Statistic,
  StatisticsCard,
} from '@/features/analytics/components/stats-card';
import { ThesesChartCard } from '@/features/analytics/components/theses-chart-card';
import { ColumnID } from '@/lib/types';
import {
  Book,
  BookOpenCheckIcon,
  BookPlusIcon,
  BookUp2Icon,
} from 'lucide-react';

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

const getStatistics = (): Statistic[] => {
  return [
    {
      title: 'Total Approved Theses',
      value: 525,
      icon: <Book className="size-4" />,
      description: 'Archived at the department',
    },
    {
      title: 'Borrowed',
      value: 325,
      icon: <BookUp2Icon className="size-4" />,
      description: 'Total theses borrowed',
    },
    {
      title: 'Approved Proposals',
      symbol: <strong>+</strong>,
      value: 143,
      icon: <BookOpenCheckIcon className="size-4" />,
      description: '+16% from last school year',
    },
    {
      title: 'Uploaded',
      symbol: <strong>+</strong>,
      value: 150,
      icon: <BookPlusIcon className="size-4" />,
      description: '+20% from last school year',
    },
  ];
};

const FILTERS: ColumnID[] = ['college', 'department'];

export default async function Analytics() {
  const statistics = getStatistics();

  return (
    <main className="min-h-[calc(100vh-4rem)] pb-4 lg:pl-16">
      <div className="m-auto box-content flex max-w-none flex-col items-center gap-y-4 p-4 md:gap-y-5 md:p-5">
        <div className="flex w-full max-w-screen-2xl flex-col gap-2 sm:flex-row sm:justify-between">
          <h1 className="text-2xl font-bold lg:text-4xl">Overview</h1>
          {/* <Suspense>
            <Filters
              initialNum={FILTERS.length}
              filterIds={FILTERS}
              canExpand
            />
          </Suspense> */}
        </div>

        <section className="md:grid-row-2 grid w-full max-w-screen-2xl grid-cols-1 gap-3 md:gap-4 lg:grid-flow-row">
          <div className="grid grid-cols-1 grid-rows-4 gap-3 md:grid-cols-2 md:grid-rows-2 md:gap-4 xl:grid-cols-4 xl:grid-rows-1">
            {statistics.map((data) => (
              <StatisticsCard
                key={data.title}
                title={data.title}
                symbol={data.symbol}
                value={data.value}
                description={data.description}
                icon={data.icon}
              />
            ))}
          </div>
          <div className="grid grid-cols-1 gap-3 md:gap-4 lg:grid-cols-2">
            <ThesesChartCard />
            <RecentActivitiesCard />
          </div>
        </section>
      </div>
    </main>
  );
}
