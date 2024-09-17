"use client"

import { ColumnDef } from "@tanstack/react-table"


export type Activity = {
    id: string
    title: string
    author: string[]
    action: "Uploaded" | "Updated" | "Approved" | "Borrowed"
    age: number
}

export const columns: ColumnDef<Activity>[] = [
    {
        accessorKey: "action",
        header: "Action",
        cell: ({ row }) => {
            const value = row.getValue("action") as string
            return (<div className="border rounded-md py-1 px-2 w-fit bg-background">{value}</div>)
        }
    },
    {
        accessorKey: "title",
        header: "Title",
        cell: ({ row }) => {
            const value = row.getValue("title") as string
            return (<div className="max-w-64 truncate">{value}</div>)
        }
    },
    {
        accessorKey: "author",
        header: "Author",
        cell: ({ row }) => {
            const value = row.getValue("author") as string
            return (<div className="max-w-36 truncate">{value}</div>)
        }
    },
    {
        accessorKey: "age",
        header: "",
        cell: ({ row }) => {
            const value = Math.round(row.getValue("age"))
            return (<div className="whitespace-nowrap">{value} hours ago</div>)
        }
    }
]
