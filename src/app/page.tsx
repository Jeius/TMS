import { Combobox } from "@/components/combobox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";

import React from 'react'

const Dashboard = () => {
  return (
    <div>
      <nav className="flex flex-row items-center p-5 gap-10 h-[70px] justify-between border-b border-zinc-400">
        <ul className="flex flex-row gap-10 font-semibold items-center">
          <Combobox />
          <Link href={"/dashboard"}>Dashboard</Link>
          <Link href={"/browse"}>Browse</Link>
          <Link href={"/borrow"}>Borrow</Link>
          <Link href={"/upload"}>Upload</Link>
        </ul>
        <div className="flex flex-row gap-5 w-full justify-end max-w-[400px] ">
          <Input className="min-w-[100px] border-zinc-400" type="search" placeholder="Search..." />
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </nav>

      <main className="flex self-stretch">
        Main
      </main>



    </div>

  )
}

export default Dashboard

