"use client"
import { Column, ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import { Dot, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import Link from "next/link"
import { MDiv } from "framer-motion-nextjs-elements"

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
            return (<MDiv initial={{ x: 60, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>{value}</MDiv>)
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
            return (<MDiv initial={{ x: 60, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="text-center">{value}</MDiv>)
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
            return (<MDiv initial={{ x: 60, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>{value}</MDiv>)
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
            return (<MDiv initial={{ x: 60, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>{value}</MDiv>)
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
            return (<MDiv initial={{ x: 60, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>{value}</MDiv>)
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
            return (<MDiv initial={{ x: 60, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="text-center">{value}</MDiv>)
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
        <Tooltip>
            <MDiv
                className="flex items-center justify-between space-x-2"
                initial={{ x: 60, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
            >
                <span>{title}</span>
                {!hideClose && (
                    <TooltipTrigger asChild>
                        <Button
                            variant="ghost"
                            aria-label="Remove column"
                            className="rounded-full p-0.5 size-5 text-muted-foreground hover:text-foreground hover:bg-transparent"
                            onClick={() => column.toggleVisibility(false)}
                        ><X aria-hidden="true" className="" /></Button>
                    </TooltipTrigger>
                )}
            </MDiv>
            <TooltipContent side="bottom">
                <p>Remove column</p>
            </TooltipContent>
        </Tooltip>
    )
}