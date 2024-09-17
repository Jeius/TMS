"use client"
import { ColumnDef } from "@tanstack/react-table"
import { DataTableColumnHeader } from "../table/column-header"

export type Thesis = {
    id: string
    title: string
    year: number
    author: string
    adviser: string
    keywords: string
    specialization: string
    dateUploaded: string
}

export const columns: ColumnDef<Thesis>[] = [
    {
        accessorKey: "author",
        header: ({ column }) => {
            return (<DataTableColumnHeader column={column} title="Author" />)
        },
        cell: ({ row }) => {
            const value = row.getValue("author") as string
            return (<div className="max-w-36 truncate">{value}</div>)
        }
    },
    {
        accessorKey: "title",
        header: ({ column }) => {
            return (<DataTableColumnHeader column={column} title="Title" />)
        },
        cell: ({ row }) => {
            const value = row.getValue("title") as string
            return (<div className="max-w-64 truncate">{value}</div>)
        }
    },
    {
        accessorKey: "year",
        header: ({ column }) => {
            return (<DataTableColumnHeader column={column} title="Year" />)
        },
        cell: ({ row }) => {
            const value = Math.round(row.getValue("year"))
            return (<div className="whitespace-nowrap">{value}</div>)
        }
    },
    {
        accessorKey: "adviser",
        header: ({ column }) => {
            return (<DataTableColumnHeader column={column} title="Adviser" />)
        },
        cell: ({ row }) => {
            const value = row.getValue("adviser") as string
            return (<div className="whitespace-nowrap">{value}</div>)
        }
    },
    {
        accessorKey: "specialization",
        header: ({ column }) => {
            return (<DataTableColumnHeader column={column} title="Area of Specialization" />)
        },
        cell: ({ row }) => {
            const value = row.getValue("specialization") as string
            return (<div className="max-w-36 truncate">{value}</div>)
        }
    },
    {
        accessorKey: "dateUploaded",
        header: ({ column }) => {
            return (<DataTableColumnHeader column={column} title="Date Uploaded" />)
        },
        cell: ({ row }) => {
            const value = row.getValue("dateUploaded") as string
            return (<div className="whitespace-nowrap">{value}</div>)
        }
    },
]
