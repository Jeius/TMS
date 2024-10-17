"use client"
import { ColumnDef, Row, Table } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import { Dot, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import Link from "next/link"
import { HTMLMotionProps, motion, useAnimate, usePresence } from "framer-motion"
import React from "react"
import { cn } from "@/lib/utils"

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
        header: ({ table }) => {
            return (<ColumnHeader table={table} accessorKey="author" />)
        },
        cell: ({ row }) => {
            return (<ColumnCell accessorKey="author" row={row} />)
        }
    },
    {
        accessorKey: "year",
        size: 100,
        header: ({ table }) => {
            return (<ColumnHeader table={table} accessorKey="year" />)
        },
        cell: ({ row }) => {
            return (<ColumnCell accessorKey="year" row={row} />)
        }
    },
    {
        accessorKey: "adviser",
        size: 250,
        header: ({ table }) => {
            return (<ColumnHeader table={table} accessorKey="adviser" />)
        },
        cell: ({ row }) => {
            return (<ColumnCell accessorKey="adviser" row={row} />)
        }
    },
    {
        accessorKey: "specialization",
        size: 300,
        header: ({ table }) => {
            return (<ColumnHeader table={table} accessorKey="specialization" />)
        },
        cell: ({ row }) => {
            return (<ColumnCell accessorKey="specialization" row={row} />)
        }
    },
    {
        accessorKey: "department",
        size: 300,
        header: ({ table }) => {
            return (<ColumnHeader table={table} accessorKey="department" />)
        },
        cell: ({ row }) => {
            return (<ColumnCell accessorKey="department" row={row} />)
        }
    },
    {
        accessorKey: "dateUploaded",
        size: 180,
        header: ({ table }) => {
            return (<ColumnHeader table={table} accessorKey="dateUploaded" />)
        },
        cell: ({ row }) => {
            return (<ColumnCell accessorKey="dateUploaded" row={row} />)
        }
    },
]

interface ColumnCellProps<TData> extends HTMLMotionProps<"div"> {
    row: Row<TData>;
    accessorKey: string;
}

const ColumnCell = React.forwardRef<HTMLDivElement, ColumnCellProps<any>>(
    ({ accessorKey, row, ...props }, ref) => (
        <motion.div
            ref={ref}
            {...props}
        >
            {row.getValue(accessorKey)}
        </motion.div>
    )
);

ColumnCell.displayName = "ColumnCell";


interface ColumnHeaderProps<TData> extends HTMLMotionProps<"div"> {
    table: Table<TData>;
    accessorKey: string;
    hideClose?: boolean;
}

const ColumnHeader = React.forwardRef<HTMLDivElement, ColumnHeaderProps<any>>(
    ({ accessorKey, table, hideClose = false, className, ...props }, ref) => (
        <Tooltip>
            <motion.div
                ref={ref}
                className={cn("flex items-center justify-between space-x-2", className)}
                {...props}
            >
                <span className="capitalize">
                    {accessorKey.replace(/([a-z])([A-Z])/g, "$1 $2")}
                </span>
                {!hideClose && (
                    <TooltipTrigger asChild>
                        <Button
                            variant="ghost"
                            aria-label="Remove column"
                            className="rounded-full p-0.5 size-5 text-muted-foreground hover:text-foreground hover:bg-transparent"
                            onClick={() =>
                                table?.getColumn(accessorKey)?.toggleVisibility(false)
                            }
                        >
                            <X aria-hidden="true" />
                        </Button>
                    </TooltipTrigger>
                )}
            </motion.div>
            <TooltipContent>
                <p>Remove column</p>
            </TooltipContent>
        </Tooltip>
    )
);

ColumnHeader.displayName = "ColumnHeader"

export { ColumnCell, ColumnHeader }