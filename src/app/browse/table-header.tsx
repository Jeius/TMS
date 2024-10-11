import { Button } from "@/components/ui/button"
import { Combobox, ComboboxItem } from "@/components/ui/combobox"
import { Separator } from "@/components/ui/separator"
import { Table } from "@tanstack/react-table"
import React from "react"

import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown, Plus } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"

interface TableHeaderProps<TData> {
    table: Table<TData>
}

const getYearData = () => {
    return (Array.from({ length: 100 }).map((_, index) =>
    ({
        value: (2024 - index + 1).toString(),
        label: (2024 - index + 1).toString()
    } as ComboboxItem)))
}

const getSpecializationData = () => {
    return [
        {
            value: "machine learning",
            label: "Machine Learning",
        },
        {
            value: "robotics",
            label: "Robotics",
        },
        {
            value: "network security",
            label: "Network Security",
        },
        {
            value: "database management",
            label: "Database Management",
        },
        {
            value: "python",
            label: "Python",
        },
    ]
}

const ColumnsViewOptions = <TData,>({
    table,
}: TableHeaderProps<TData>) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    size="sm"
                    className="ml-auto h-8 flex data-[state=open]:bg-accent"
                >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Columns
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[150px]">
                <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {table
                    .getAllColumns()
                    .filter(
                        (column) =>
                            typeof column.accessorFn !== "undefined" && column.getCanHide()
                    )
                    .map((column) => {
                        return (
                            <DropdownMenuCheckboxItem
                                key={column.id}
                                className="capitalize"
                                checked={column.getIsVisible()}
                                onCheckedChange={(value) => column.toggleVisibility(!!value)}
                            >
                                {column.id}
                            </DropdownMenuCheckboxItem>
                        )
                    })}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

const SortOptions = <TData,>({ table }: TableHeaderProps<TData>) => {
    const sortValues = [
        { label: "Latest First", value: "latest" },
        { label: "Oldest First", value: "old" },
        { label: "A - Z", value: "alpha" },
        { label: "Z - A", value: "-alpha" },
    ];

    const router = useRouter()
    const searchParams = useSearchParams()
    const selectedValue = sortValues.find(e => e.value === searchParams.get("sort"))

    const handleSortChange = (sortValue: typeof sortValues[0]) => {
        const currentParams = new URLSearchParams(searchParams.toString());
        currentParams.set("sort", sortValue.value);
        router.push(`?${currentParams.toString()}`);

        if (sortValue.value === "alpha") {
            table.getColumn("title")?.toggleSorting(false); // Ascending
        } else if (sortValue.value === "-alpha") {
            table.getColumn("title")?.toggleSorting(true); // Descending
        } else if (sortValue.value === "latest") {
            table.getColumn("year")?.toggleSorting(true); // Descending (latest first)
        } else if (sortValue.value === "olde") {
            table.getColumn("year")?.toggleSorting(false); // Ascending (oldest first)
        }
    };

    return (
        <div className="flex items-center space-x-2">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="outline"
                        size="sm"
                        className="-ml-3 h-8 data-[state=open]:bg-accent"
                    >
                        Sort by: {selectedValue?.label}
                        <ChevronDown className="size-4 ml-1" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                    {sortValues.map((option) => (
                        <DropdownMenuCheckboxItem
                            key={option.value}
                            checked={selectedValue?.value === option.value}
                            onCheckedChange={() => handleSortChange(option)}
                        >
                            {option.label}
                        </DropdownMenuCheckboxItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}


export default function TableHeader<TData>({
    table
}: TableHeaderProps<TData>) {
    const router = useRouter()
    const searchParams = useSearchParams()

    const yearData = getYearData();
    const specializationData = getSpecializationData();

    const handleYearSelect = (value: string) => {
        const currentParams = new URLSearchParams(searchParams.toString());
        if (value) {
            currentParams.set("approved", value);
        } else {
            currentParams.delete("approved")
        }
        router.push(`?${currentParams.toString()}`);
    }

    const handleSpecializationSelect = (value: string) => {
        const currentParams = new URLSearchParams(searchParams.toString());
        if (value) {
            currentParams.set("sp", value);
        } else {
            currentParams.delete("sp")
        }
        router.push(`?${currentParams.toString()}`);
    }

    const handleAuthorSelect = (value: string) => {
        const currentParams = new URLSearchParams(searchParams.toString());
        if (value) {
            currentParams.set("author", value);
        } else {
            currentParams.delete("author")
        }
        router.push(`?${currentParams.toString()}`);
    }

    const handleAdviserSelect = (value: string) => {
        const currentParams = new URLSearchParams(searchParams.toString());
        if (value) {
            currentParams.set("adviser", value);
        } else {
            currentParams.delete("adviser")
        }
        router.push(`?${currentParams.toString()}`);
    }

    return (
        <div className="flex items-center justify-between overflow-hidden border-b px-4 py-2">
            <div className="flex space-x-2 mr-20">
                <Combobox items={yearData} placeholder="Year" onSelect={handleYearSelect} />
                <Combobox items={specializationData} placeholder="Specialization" onSelect={handleSpecializationSelect} />
                <Combobox items={[]} placeholder="Author" onSelect={handleAuthorSelect} />
                <Combobox items={[]} placeholder="Adviser" onSelect={handleAdviserSelect} />
                <Button variant="ghost" size="sm" className="lg:hidden text-primary hover:bg-transparent">More filters</Button>
            </div>
            <div className="flex space-x-2">
                <SortOptions table={table} />
                <ColumnsViewOptions table={table} />
            </div>
        </div>
    )
}