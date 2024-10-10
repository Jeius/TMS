import { Button } from "@/components/ui/button"
import { Combobox, ComboboxItem } from "@/components/ui/combobox"
import { Separator } from "@/components/ui/separator"
import { Table } from "@tanstack/react-table"
import React from "react"

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

export default function TableHeader<TData>({
    table
}: TableHeaderProps<TData>) {
    const [yearFilter, setYearFilter] = React.useState("");
    const [specializationFilter, setSpecializationFilter] = React.useState("");
    const [authorFilter, setAuthorFilter] = React.useState("");
    const [adviserFilter, setAdviserFilter] = React.useState("")

    const yearData = getYearData();
    const specializationData = getSpecializationData();

    return (
        <div className="flex items-center justify-between overflow-hidden border-b px-4 py-2">
            <div className="flex space-x-2">
                <Combobox items={yearData} placeholder="Year" onSelect={setYearFilter as () => void} />
                <Combobox items={specializationData} placeholder="Specialization" onSelect={setSpecializationFilter as () => void} />
                <Combobox items={[]} placeholder="Author" onSelect={setAuthorFilter as () => void} />
                <Combobox items={[]} placeholder="Adviser" onSelect={setAdviserFilter as () => void} />
                <Button variant="ghost" className="text-primary hover:bg-transparent">More filters</Button>
            </div>

        </div>
    )
}