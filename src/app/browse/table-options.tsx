import { Button } from "@/components/ui/button"
import { Combobox } from "@/components/ui/combobox"
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
import { AnimatePresence, motion } from "framer-motion"

export interface TableOptionsProps<TData> {
    table: Table<TData>
}

const getYearData = () => {
    return (Array.from({ length: 100 }).map((_, index) => ((2024 - index + 1).toString())))
}

const getSpecializationData = () => {
    return [
        "machine learning",
        "robotics",
        "network security",
        "database management",
        "python",
    ]
}

const ColumnsViewOptions = <TData,>({
    table,
}: TableOptionsProps<TData>) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    size="sm"
                    variant="gradient"
                >
                    <Plus className="mr-2" size={16} aria-hidden="true" />
                    <span>Add Columns</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[150px]">
                <DropdownMenuLabel>Select Columns</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {table
                    .getAllColumns()
                    .filter(
                        (column) =>
                            typeof column.accessorFn !== "undefined" && column.getCanHide() && !column.getIsVisible()
                    )
                    .map((column) => {
                        return (
                            <DropdownMenuCheckboxItem
                                key={column.id}
                                className="capitalize"
                                checked={column.getIsVisible()}
                                onCheckedChange={(value) => column.toggleVisibility(!!value)}
                            >
                                {column.id.replace(/([a-z])([A-Z])/g, '$1 $2')}
                            </DropdownMenuCheckboxItem>
                        )
                    })}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

const SortOptions = <TData,>({ table }: TableOptionsProps<TData>) => {
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
        } else if (sortValue.value === "old") {
            table.getColumn("year")?.toggleSorting(false); // Ascending (oldest first)
        }
    };

    return (
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
    )
}


export default function TableOptions<TData>({
    table
}: TableOptionsProps<TData>) {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [showMoreFilters, setShowMoreFilters] = React.useState(false)

    const yearData = getYearData();
    const specializationData = getSpecializationData();

    const filters = [
        { key: "college", label: "College", values: [] as string[] },
        { key: "department", label: "Department", values: [] as string[] },
        { key: "year", label: "Year", values: yearData },
        { key: "sp", label: "Specialization", values: specializationData },
        { key: "author", label: "Author", values: [] as string[] },
        { key: "adviser", label: "Adviser", values: [] as string[] },
        { key: "keywords", label: "Keywords", values: [] as string[] },
    ]

    const initialFilters = filters.slice(0, 3)
    const extensionFilters = filters.slice(3)

    // Helper function to update URL parameters
    const handleFilterChange = (key: string, value: string) => {
        const currentParams = new URLSearchParams(searchParams.toString())
        if (value) {
            currentParams.set(key, value)
        } else {
            currentParams.delete(key)
        }
        router.push(`?${currentParams.toString()}`)
    }

    const toggleMoreFilters = () => setShowMoreFilters(prev => !prev)

    return (
        <div className="flex items-end justify-between overflow-hidden px-4 py-3">
            <div className="flex gap-2 flex-wrap mr-5 sm:mr-20 md:mr-32">
                {initialFilters.map(filter => (
                    <Combobox
                        key={crypto.randomUUID()}
                        items={filter.values}
                        className="flex"
                        placeholder={filter.label}
                        onMenuSelect={(value) => handleFilterChange(filter.key, value)}
                    />
                ))}
                <AnimatePresence mode="popLayout">
                    {showMoreFilters && extensionFilters.map(filter => {
                        return (
                            <motion.div key={crypto.randomUUID()}
                                layout
                                initial={{ x: -60, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: -60, opacity: 0 }}
                                transition={{ type: "tween" }}
                            >
                                <Combobox
                                    items={filter.values}
                                    className="flex"
                                    placeholder={filter.label}
                                    onMenuSelect={(value) => handleFilterChange(filter.key, value)}
                                />
                            </motion.div>
                        )
                    })}
                </AnimatePresence>
                <motion.div layout transition={{ type: "tween" }}>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="text-secondary/85 hover:text-secondary hover:bg-transparent font-bold"
                        onClick={toggleMoreFilters}
                    >
                        {showMoreFilters ? "Less filters" : "More filters"}
                    </Button>
                </motion.div>
            </div>
            <motion.div layout transition={{ type: "tween" }} className="flex justify-end gap-2 flex-wrap">
                <motion.div layout transition={{ type: "tween" }}><SortOptions table={table} /></motion.div>
                <motion.div layout transition={{ type: "tween" }}><ColumnsViewOptions table={table} /></motion.div>
            </motion.div>
        </div>
    )
}