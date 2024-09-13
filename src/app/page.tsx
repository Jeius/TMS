
import React from 'react'
import { NextPage } from 'next';
import { BorrowedCard } from '@/components/borrowedcard';
import TotalCard from '@/components/totalcard';
import AddedCard from '@/components/addedcard';
import { BarCard } from '@/components/barcard';
import { Departmentbox } from '@/components/departmentbox';

interface Props {
  searchParams: { [key: string]: string | string[] | undefined };
}

const Dashboard: NextPage<Props> = ({ searchParams }) => {
  return (
    <main className="flex flex-col p-5 gap-y-5 max-w-screen">
      <section className="flex justify-between">
        <h1 className='font-bold text-4xl'>
          Dashboard
        </h1>
        <Departmentbox />
      </section>

      <section className='flex-grow grid grid-cols-1 md:grid-row-2 lg:grid-cols-[1fr_0.5fr] gap-4 max-h-sc'>
        <BarCard />

        <div className="grid gap-4 md:grid-flow-col lg:grid-flow-row size-full">
          <TotalCard />
          <AddedCard />
          <BorrowedCard />
        </div>
      </section>
    </main>
  )
}

export default Dashboard

