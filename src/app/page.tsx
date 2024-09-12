
import Navbar from '@/components/navbar'
import React from 'react'
import { NextPage } from 'next';
import { RadialChart } from '@/components/radialchart';
import TotalCard from '@/components/totalcard';

interface Props {
  searchParams: { [key: string]: string | string[] | undefined };
}

const Dashboard: NextPage<Props> = ({ searchParams }) => {
  return (
    <>
      <Navbar />

      <main className="flex flex-col p-5 justify-center items-center">
        <h1 className='font-bold text-2xl'>
          Overview
        </h1>

        <section className='grid grid-cols-2 grid-rows-2 gap-3'>
          <TotalCard />
          <RadialChart />
        </section>
      </main>



    </>

  )
}

export default Dashboard

