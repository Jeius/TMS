import React from 'react'
import { DataTable } from '../table/data-table'
import { Thesis, columns } from './table-columns'
import { Card, CardContent } from '../ui/card'

function getAllData(): Thesis[] {
    return [
        {
            id: "1",
            title: "A Study on Quantum Computing Applications",
            year: 2023,
            author: ["Alice Smith", "Bob Johnson"],
            adviser: "Dr. Emily Clark",
            keywords: ["quantum computing", "applications", "research"],
            specialization: ["Computer Science"],
            dateUploaded: "2024-01-10"
        },
        {
            id: "2",
            title: "Advancements in Artificial Intelligence",
            year: 2022,
            author: ["Charlie Brown"],
            adviser: "Dr. Sarah Davis",
            keywords: ["artificial intelligence", "machine learning", "technology"],
            specialization: ["Computer Science", "AI"],
            dateUploaded: "2023-05-22"
        },
        {
            id: "3",
            title: "Exploring Sustainable Energy Solutions",
            year: 2021,
            author: ["Daniel Lee", "Eve Martinez"],
            adviser: "Dr. Michael Wilson",
            keywords: ["sustainable energy", "renewable resources", "environment"],
            specialization: ["Environmental Science"],
            dateUploaded: "2022-07-30"
        },
        {
            id: "4",
            title: "Impact of Social Media on Modern Communication",
            year: 2023,
            author: ["Fiona Harris"],
            adviser: "Dr. James Anderson",
            keywords: ["social media", "communication", "impact"],
            specialization: ["Communication Studies"],
            dateUploaded: "2024-03-15"
        },
        {
            id: "5",
            title: "Blockchain Technology and Its Potential",
            year: 2020,
            author: ["George Thompson"],
            adviser: "Dr. Lisa White",
            keywords: ["blockchain", "technology", "potential"],
            specialization: ["Information Technology"],
            dateUploaded: "2021-10-05"
        },
        {
            id: "6",
            title: "Machine Learning in Healthcare",
            year: 2022,
            author: ["Hannah Wilson", "Ian Patel"],
            adviser: "Dr. Olivia Lewis",
            keywords: ["machine learning", "healthcare", "data analysis"],
            specialization: ["Data Science", "Healthcare"],
            dateUploaded: "2023-02-18"
        },
        {
            id: "7",
            title: "Economic Impacts of Climate Change",
            year: 2021,
            author: ["Jack Robinson"],
            adviser: "Dr. Emily Adams",
            keywords: ["climate change", "economics", "impact"],
            specialization: ["Economics"],
            dateUploaded: "2022-08-20"
        },
        {
            id: "8",
            title: "Innovations in Nanotechnology",
            year: 2023,
            author: ["Kaitlyn King"],
            adviser: "Dr. Robert Carter",
            keywords: ["nanotechnology", "innovations", "research"],
            specialization: ["Nanotechnology"],
            dateUploaded: "2024-04-10"
        },
        {
            id: "9",
            title: "Cultural Effects of Globalization",
            year: 2022,
            author: ["Liam Turner"],
            adviser: "Dr. Sophia Walker",
            keywords: ["globalization", "culture", "effects"],
            specialization: ["Cultural Studies"],
            dateUploaded: "2023-06-25"
        },
        {
            id: "10",
            title: "Developments in Quantum Cryptography",
            year: 2023,
            author: ["Mia Scott", "Nathan Young"],
            adviser: "Dr. Benjamin Allen",
            keywords: ["quantum cryptography", "developments", "security"],
            specialization: ["Cryptography", "Security"],
            dateUploaded: "2024-02-01"
        }
    ]
}


export default function Table() {
    const data = getAllData()
    return (
        <Card>
            <CardContent>
                <DataTable
                    classname="border-none"
                    columns={columns} data={data} />
            </CardContent>
        </Card>
    )
}
