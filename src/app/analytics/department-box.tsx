"use client"

import { Combobox } from "@/components/combobox";
import { useRouter, useSearchParams } from "next/navigation";


const getDepartments = () => {
    return [
        "All Departments",
        "Computer Applications",
        "Computer Science",
        "Information Systems",
        "Information Technology",
    ]
}

export function Departmentbox() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const departments = getDepartments();
    const defaultValue = searchParams.get("department") ?? "";

    const filter = {
        key: "department",
        label: "Department",
        values: departments,
    }

    const handleFilterChange = (key: string, value: string) => {
        const currentParams = new URLSearchParams(searchParams.toString())
        if (value) {
            currentParams.set(key, value)
        } else {
            currentParams.delete(key)
        }
        router.push(`?${currentParams.toString()}`)
    }

    return (
        <Combobox
            items={departments}
            defaultValue={defaultValue}
            placeholder="Department"
            onValueChanged={(value) => handleFilterChange(filter.key, value)}
        />
    )
}
