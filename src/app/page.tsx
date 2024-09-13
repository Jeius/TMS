
import Navbar from '@/components/navbar'
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
    <>
      <Navbar />

      <main className="flex flex-col p-5 gap-y-5 max-w-screen">
        {/* <h1 className='font-bold text-4xl'>
          Overview
        </h1> */}
        <Departmentbox />

        <section className='grid grid-cols-1 md:grid-row-2 lg:grid-cols-[1fr_0.5fr] gap-4 size-full'>
          <BarCard />

          <div className="grid gap-4 md:grid-flow-col lg:grid-flow-row size-full">
            <TotalCard />
            <AddedCard />
            <BorrowedCard />
          </div>
        </section>
      </main>



    </>

  )
}

export default Dashboard

