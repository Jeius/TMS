"use client"
import { Column, ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import { Dot, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export type Thesis = {
    id: string
    title: string
    year: number
    author: string
    adviser: string
    keywords: string
    specialization: string
    dateUploaded: string
    department: string
}

export const columns: ColumnDef<Thesis>[] = [
    {
        accessorKey: "title",
        size: 514,
        header: ({ column }) => {
            return (<div className="flex items-center space-x-2 text-foreground min-w-32 p-2">
                <Checkbox id="theses" />
                <label
                    htmlFor="theses"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >Theses</label>
            </div>)
        },
        cell: ({ row }) => {
            const title = row.getValue("title") as string
            const author = row.getValue("author") as string
            const year = row.getValue("year") as string
            const department = row.getValue("department") as string
            return (<div className="flex space-x-2 items-center p-2 mr-auto">
                <Checkbox />
                <div className="flex flex-col flex-wrap">
                    <Button variant="link" className="font-bold size-fit text-md text-secondary text-wrap text-left p-0">{title}</Button>
                    <span>{author}</span>
                    <span className="flex items-center text-xs">
                        {year} <Dot size={25} /> {department}
                    </span>
                </div>
            </div>)
        },
    },
    {
        accessorKey: "author",
        size: 384,
        header: ({ column }) => {
            return (<ColumnHeader column={column} title="Author" />)
        },
        cell: ({ row }) => {
            const value = row.getValue("author") as string
            return (<div>{value}</div>)
        }
    },
    {
        accessorKey: "year",
        size: 384,
        header: ({ column }) => {
            return (<ColumnHeader column={column} title="Year" />)
        },
        cell: ({ row }) => {
            const value = Math.round(row.getValue("year"))
            return (<div className="whitespace-nowrap">{value}</div>)
        }
    },
    {
        accessorKey: "adviser",
        size: 384,
        header: ({ column }) => {
            return (<ColumnHeader column={column} title="Adviser" />)
        },
        cell: ({ row }) => {
            const value = row.getValue("adviser") as string
            return (<div className="whitespace-nowrap">{value}</div>)
        }
    },
    {
        accessorKey: "specialization",
        size: 384,
        header: ({ column }) => {
            return (<ColumnHeader column={column} title="Area of Specialization" />)
        },
        cell: ({ row }) => {
            const value = row.getValue("specialization") as string
            return (<div>{value}</div>)
        }
    },
    {
        accessorKey: "dateUploaded",
        size: 384,
        header: ({ column }) => {
            return (<ColumnHeader column={column} title="Date Uploaded" />)
        },
        cell: ({ row }) => {
            const value = row.getValue("dateUploaded") as string
            return (<div className="whitespace-nowrap">{value}</div>)
        }
    },
    {
        accessorKey: "department",
        size: 384,
        header: ({ column }) => {
            return (<ColumnHeader column={column} title="Department" />)
        },
        cell: ({ row }) => {
            const value = row.getValue("department") as string
            return (<div className="whitespace-nowrap">{value}</div>)
        }
    },
]


const ColumnHeader = <TData, TValue>({
    column,
    title,
    hideClose = false,
}: {
    column: Column<TData, TValue>
    title: string
    hideClose?: boolean
}) => {
    return (
        <TooltipProvider>
            <div className="flex items-center justify-between space-x-2 text-foreground text-sm">
                <span>{title}</span>
                {!hideClose && (
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="ghost"
                                aria-label="Remove column"
                                className="rounded-full p-0.5 size-5 text-muted-foreground hover:text-foreground hover:bg-transparent"
                                onClick={() => column.toggleVisibility(false)}
                            ><X aria-hidden="true" className="" /></Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Remove column</p>
                        </TooltipContent>
                    </Tooltip>
                )}
            </div>
        </TooltipProvider>
    )
}