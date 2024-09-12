
import Navbar from '@/components/navbar'
import React from 'react'
import { NextPage } from 'next';
import { RadialChart } from '@/components/radialchart';

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

        <RadialChart />
      </main>



    </>

  )
}

export default Dashboard

