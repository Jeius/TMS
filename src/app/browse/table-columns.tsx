"use client"
import { Column, ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import { Dot, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import Link from "next/link"

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
        enableSorting: false,
        enableHiding: false,
        header: ({ table }) => {
            return (<div className="flex items-center space-x-3 text-foreground min-w-32">
                <Checkbox id="theses"
                    checked={
                        table.getIsAllPageRowsSelected() ||
                        (table.getIsSomePageRowsSelected() && "indeterminate")
                    }
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    className="ml-1"
                    aria-label="Select all"
                />
                <label
                    htmlFor="theses"
                    className="leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >Theses</label>
            </div>)
        },
        cell: ({ row }) => {
            const title = row.getValue("title") as string
            const author = row.getValue("author") as string
            const year = row.getValue("year") as string
            const department = row.getValue("department") as string

            return (<div className="flex">
                <Checkbox className="my-auto ml-1 mr-3"
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label={`Select ${title}`}
                />
                <div className="flex flex-col space-y-1">
                    <div className="line-clamp-3 text-ellipsis font-bold" data-title={title}>
                        <Link href={"#"} className="text-secondary text-base hover:underline">
                            <span className="inline">{title}</span>
                        </Link>
                    </div>
                    <div className="text-xs font-semibold" data-author-list={author}>
                        <span>{author}</span>
                    </div>
                    <div className="flex items-center text-sm">
                        <span>{year}</span> <Dot size={25} aria-hidden="true" /> <span>{department}</span>
                    </div>
                </div>
            </div>)
        },
    },
    {
        accessorKey: "author",
        size: 250,
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
        size: 100,
        header: ({ column }) => {
            return (<ColumnHeader column={column} title="Year" />)
        },
        cell: ({ row }) => {
            const value = Math.round(row.getValue("year"))
            return (<div className="text-center">{value}</div>)
        }
    },
    {
        accessorKey: "adviser",
        size: 250,
        header: ({ column }) => {
            return (<ColumnHeader column={column} title="Adviser" />)
        },
        cell: ({ row }) => {
            const value = row.getValue("adviser") as string
            return (<div>{value}</div>)
        }
    },
    {
        accessorKey: "specialization",
        size: 300,
        header: ({ column }) => {
            return (<ColumnHeader column={column} title="Area of Specialization" />)
        },
        cell: ({ row }) => {
            const value = row.getValue("specialization") as string
            return (<div>{value}</div>)
        }
    },
    {
        accessorKey: "department",
        size: 300,
        header: ({ column }) => {
            return (<ColumnHeader column={column} title="Department" />)
        },
        cell: ({ row }) => {
            const value = row.getValue("department") as string
            return (<div>{value}</div>)
        }
    },
    {
        accessorKey: "dateUploaded",
        size: 180,
        header: ({ column }) => {
            return (<ColumnHeader column={column} title="Date Uploaded" />)
        },
        cell: ({ row }) => {
            const value = row.getValue("dateUploaded") as string
            return (<div className="text-center">{value}</div>)
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
            <div className="flex items-center justify-between space-x-2">
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