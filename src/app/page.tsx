
import Navbar from '@/components/navbar'
import React from 'react'
import { NextPage } from 'next';

interface Props {
  searchParams: { [key: string]: string | string[] | undefined };
}

const Dashboard: NextPage<Props> = ({ searchParams }) => {
  return (
    <>
      <Navbar />

      <main className="flex self-stretch">
        Main
      </main>



    </>

  )
}

export default Dashboard

