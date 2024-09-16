import React from 'react'
import { DataTable } from '../table/data-table'
import { Activity, columns } from './recent-columns'

async function getData(): Promise<Activity[]> {
    // Fetch data from 
    return [
        {
            id: "728ed52f",
            title: "Sample thesis title 1",
            author: ["Author 1, Author 2, Author 3"],
            status: "uploaded",
            age: "1 day ago",
        },
    ]
}

export default async function RecentTable() {
    const data = await getData()
    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={data} />
        </div>
    )
}
