
import React from 'react'
import { BarCard } from '@/components/dashboard/barcard';
import Departmentbox from '@/components/dashboard/department-box';
import StatsCard, { StatCardProps } from '@/components/dashboard/stats-card';
import { Book, BookOpenCheckIcon, BookPlusIcon, BookUp2Icon } from 'lucide-react';
import RecentCard from '@/components/dashboard/recent-card';

type Props = {
    searchParams: { [key: string]: string | string[] | undefined }
}

const statsCardData: StatCardProps[] = [
    {
        title: "Total Theses",
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

export default function Dashboard({ searchParams }: Props) {
    return (
        <main className="flex flex-col p-4 gap-y-4 md:p-5 md:gap-y-5 max-w-screen-2xl w-full box-content">
            <section className="flex flex-col gap-2 sm:flex-row justify-between">
                <h1 className='font-bold text-2xl lg:text-4xl'>
                    Overview
                </h1>
                <Departmentbox />
            </section>

            <section className='grid grid-cols-1 md:grid-row-2 lg:grid-flow-row gap-3 md:gap-4'>
                <div className="grid gap-3 md:gap-4 grid-cols-1 grid-rows-4 md:grid-cols-2 md:grid-rows-2 xl:grid-cols-4 xl:grid-rows-1">
                    {statsCardData.map(data =>
                        <StatsCard
                            key={data.title}
                            title={data.title}
                            symbol={data.symbol}
                            value={data.value}
                            description={data.description}
                            icon={data.icon} />)}
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-4">
                    <BarCard />
                    <RecentCard />
                </div>
            </section>
        </main>
    )
}


