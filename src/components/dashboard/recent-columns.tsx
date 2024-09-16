"use client"

import { ColumnDef } from "@tanstack/react-table"


export type Activity = {
    id: string
    title: string
    author: string[]
    status: "uploaded" | "updated" | "approved" | "borrowed"
    age: string
}

export const columns: ColumnDef<Activity>[] = [
    {
        accessorKey: "title",
        header: "Title",
    },
    {
        accessorKey: "author",
        header: "Author",
    },
    {
        accessorKey: "status",
        header: "Status",
    },
    {
        accessorKey: "age",
        header: "Age",
    }
]
