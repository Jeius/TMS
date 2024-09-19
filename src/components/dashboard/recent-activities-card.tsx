
import React from 'react'
import { DataTable } from '../table/data-table'
import { Activity, columns } from './recent-activities-columns'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from '../ui/card'


function getData(): Activity[] {
    // Fetch data from 
    return [
        { id: "1", title: "Research Paper on AI", author: ["Johnson A."], action: "Uploaded", age: "2 days" },
        { id: "2", title: "Quantum Computing Basics", author: ["Smith B.", "White C."], action: "Updated", age: "5 hours" },
        { id: "3", title: "Blockchain Technology", author: ["Miller D."], action: "Approved", age: "1 week" },
        { id: "4", title: "Data Science Tutorial", author: ["Davis E."], action: "Borrowed", age: "3 days" },
        { id: "5", title: "Introduction to Algorithms", author: ["Wilson F."], action: "Uploaded", age: "4 hours" },
        { id: "6", title: "Python for Beginners", author: ["Lee G.", "Adams H."], action: "Updated", age: "2 weeks" },
        { id: "7", title: "Machine Learning Models", author: ["Harris I."], action: "Approved", age: "3 hours" },
        { id: "8", title: "Big Data Analysis", author: ["Thomas J."], action: "Borrowed", age: "5 days" },
        { id: "9", title: "Cybersecurity Fundamentals", author: ["Roberts K."], action: "Uploaded", age: "8 hours" },
        { id: "10", title: "Cloud Computing Overview", author: ["Scott L."], action: "Updated", age: "6 days" },
        { id: "11", title: "Advanced JavaScript", author: ["Lewis M."], action: "Approved", age: "10 hours" },
        { id: "12", title: "Mobile App Development", author: ["Evans N."], action: "Borrowed", age: "3 weeks" },
        { id: "13", title: "UI/UX Design Principles", author: ["Green O."], action: "Uploaded", age: "12 hours" },
        { id: "14", title: "Digital Marketing Strategies", author: ["Wright P."], action: "Updated", age: "2 days" },
        { id: "15", title: "Artificial Intelligence Ethics", author: ["Carter Q."], action: "Approved", age: "1 day" }
    ]
}

export function RecentActivitiesCard() {
    const data = getData()
    return (
        <Card>
            <CardHeader>
                <CardTitle>Recent Activities</CardTitle>
            </CardHeader>
            <CardContent>
                <DataTable
                    classname="border-none lg:h-96 xl:h-[430px] 2xl:h-auto"
                    columns={columns}
                    data={data}
                    showSelected={false}
                    showRowsPerPage={false} />
            </CardContent>
        </Card>
    )
}