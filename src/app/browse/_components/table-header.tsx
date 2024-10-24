import { Combobox, ComboboxItem } from "@/components/combobox"
import { Button } from "@/components/ui/button"
import { Table } from "@tanstack/react-table"
import React from "react"

import { VisibilityMenu } from "@/app/browse/_components/column-visibility"
import { cn } from "@/lib/utils"
import { AnimatePresence, motion } from "framer-motion"
import { useRouter, useSearchParams } from "next/navigation"
import { SelectMenu, SelectMenuItem } from "../../../components/select-menu"

const getYearData = () => {
    return (Array.from({ length: 50 }).map((_, index) => (
        { value: (2024 - index + 1).toString(), label: (2024 - index + 1).toString() }
    )))
}

const getSpecializationData = (): ComboboxItem[] => {
    return [
        { value: "ML", label: "Machine Learning" },
        { value: "robotics", label: "Robotics" },
        { value: "NS", label: "Network Security" },
        { value: "DM", label: "Database Management" },
        { value: "python", label: "Python" },
    ]
}

function getFilters(yearData: ComboboxItem[], specializationData: ComboboxItem[]) {
    return [
        { key: "college", label: "College", values: [] },
        { key: "department", label: "Department", values: [] },
        { key: "year", label: "Year", values: yearData },
        { key: "sp", label: "Specialization", values: specializationData },
        { key: "author", label: "Author", values: [] },
        { key: "adviser", label: "Adviser", values: [] },
        { key: "keywords", label: "Keywords", values: [] },
    ]
}


const SortOptions = <TData,>({ table }: { table: Table<TData> }) => {
    const sortItems: SelectMenuItem[] = [
        { label: "Latest First", value: "latest" },
        { label: "Oldest First", value: "old" },
        { label: "A - Z", value: "alpha" },
        { label: "Z - A", value: "-alpha" },
    ];

    const router = useRouter()
    const searchParams = useSearchParams()
    const defaultValue = sortItems?.find(item => item.value === searchParams.get("sort"))?.value;

    const handleSortChange = (sortItem: string) => {
        const currentParams = new URLSearchParams(searchParams.toString());
        currentParams.set("sort", sortItem);
        router.push(`?${currentParams.toString()}`);

        if (sortItem === "alpha") {
            table.getColumn("title")?.toggleSorting(false); // Ascending
        } else if (sortItem === "-alpha") {
            table.getColumn("title")?.toggleSorting(true); // Descending
        } else if (sortItem === "latest") {
            table.getColumn("year")?.toggleSorting(true); // Descending (latest first)
        } else if (sortItem === "old") {
            table.getColumn("year")?.toggleSorting(false); // Ascending (oldest first)
        }
    };

    return (
        <SelectMenu items={sortItems} defaultValue={defaultValue} title="Sort by:" placeholder="Sort by:" onValueChanged={handleSortChange} />
    )
}

export type TableOptionsProps<TData> = React.HTMLAttributes<HTMLDivElement> & {
    table: Table<TData>
}

export default function TableHeader<TData>({
    table, className, ...props
}: TableOptionsProps<TData>) {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [showMoreFilters, setShowMoreFilters] = React.useState(false)

    const yearData = getYearData();
    const specializationData = getSpecializationData();

    const filters = getFilters(yearData, specializationData)

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
        <div className={cn("w-full max-w-full overflow-hidden text-card-foreground", className)} {...props}>
            <div className="overflow-hidden px-4 py-3 flex flex-col items-center space-y-10 xs:space-y-0 xs:flex-row xs:items-end sm:justify-between ">
                <div className="flex gap-2 flex-wrap xs:mr-5 sm:mr-20 md:mr-32">
                    {initialFilters.map(filter => (
                        <motion.div layout key={filter.key} transition={{ type: "tween" }}>
                            <Combobox
                                items={filter.values}
                                className="flex"
                                placeholder={filter.label}
                                onValueChanged={(value) => handleFilterChange(filter.key, value)}
                            />
                        </motion.div>
                    ))}
                    <AnimatePresence mode="popLayout">
                        {showMoreFilters && extensionFilters.map(filter => {
                            return (
                                <motion.div key={filter.key}
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
                                        onValueChanged={(value) => handleFilterChange(filter.key, value)}
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
                <motion.div layout transition={{ type: "tween" }} className="flex justify-between w-full 2xs:w-auto 2xs:justify-end items-center gap-2 flex-wrap">
                    <motion.div layout transition={{ type: "tween" }}><SortOptions table={table} /></motion.div>
                    <motion.div layout transition={{ type: "tween" }}><VisibilityMenu table={table} /></motion.div>
                </motion.div>
            </div>
        </div>
    )
}
