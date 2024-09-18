import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { DataTable } from '../table/data-table'
import { Activity, columns } from './recent-columns'

function getData(): Activity[] {
    // Fetch data from 
    return [
        {
            id: "728ed52f",
            title: "A Very Loooooooong Sample Thesis Title 1",
            author: ["Author 1, Author 2, Author 3, Author 4"],
            action: "Uploaded",
            age: 1,
        },
        {
            id: "728ed5ff",
            title: "A Very Loooooooong Sample Thesis Title 1",
            author: ["Author 1, Author 2, Author 3, Author 4"],
            action: "Uploaded",
            age: 1,
        },
        {
            id: "728ead52f",
            title: "A Very Loooooooong Sample Thesis Title 1",
            author: ["Author 1, Author 2, Author 3, Author 4"],
            action: "Uploaded",
            age: 1,
        },
        {
            id: "728ed522f",
            title: "A Very Loooooooong Sample Thesis Title 1",
            author: ["Author 1, Author 2, Author 3, Author 4"],
            action: "Uploaded",
            age: 1,
        },
        {
            id: "728sd52f",
            title: "Sample thesis title 2",
            author: ["Author 1, Author 2"],
            action: "Borrowed",
            age: 3,
        },
        {
            id: "72wsd52f",
            title: "Sample thesis title 2",
            author: ["Author 1, Author 2"],
            action: "Borrowed",
            age: 3,
        },
        {
            id: "728sd342f",
            title: "Sample thesis title 2",
            author: ["Author 1, Author 2"],
            action: "Borrowed",
            age: 3,
        },
        {
            id: "7w28sd52f",
            title: "Sample thesis title 2",
            author: ["Author 1, Author 2"],
            action: "Borrowed",
            age: 3,
        },
        {
            id: "728hd52f",
            title: "Sample thesis title 3",
            author: ["Author 1"],
            action: "Uploaded",
            age: 22,
        },
        {
            id: "728ed32f",
            title: "Sample thesis title 4",
            author: ["Author 1, Author 2, Author 3, Author 4"],
            action: "Approved",
            age: 24,
        },
        {
            id: "72bed32f",
            title: "Sample thesis title 4",
            author: ["Author 1, Author 2, Author 3, Author 4"],
            action: "Approved",
            age: 24,
        },
        {
            id: "728ed122f",
            title: "Sample thesis title 4",
            author: ["Author 1, Author 2, Author 3, Author 4"],
            action: "Approved",
            age: 24,
        },
    ]
}

export default function RecentCard() {
    const data = getData()
    return (
        <Card>
            <CardHeader>
                <CardTitle>Recent Activities</CardTitle>
            </CardHeader>
            <CardContent>
                <DataTable
                    classname="border-none container lg:h-96 xl:h-[430px] 2xl:h-full"
                    columns={columns} data={data} />
            </CardContent>
        </Card>
    )
}