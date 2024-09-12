
import Navbar from '@/components/navbar'
import React from 'react'
import { NextPage } from 'next';
import { BorrowedCard } from '@/components/borrowedcard';
import TotalCard from '@/components/totalcard';
import AddedCard from '@/components/addedcard';

interface Props {
  searchParams: { [key: string]: string | string[] | undefined };
}

const Dashboard: NextPage<Props> = ({ searchParams }) => {
  return (
    <>
      <Navbar />

      <main className="flex flex-col p-5 gap-y-5 justify-center items-center">
        <h1 className='font-bold text-4xl'>
          Overview
        </h1>

        <section className='grid grid-cols-2 grid-rows-2 gap-4'>
          <TotalCard />
          <AddedCard />
          <BorrowedCard />
        </section>
      </main>



    </>

  )
}

export default Dashboard

