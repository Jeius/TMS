"use client"

import { Combobox } from "@/components/ui/combobox"
import * as React from "react"


export type Department = {
    value: string
    label: string
}

const getDepartments = (): Department[] => {
    return [
        {
            value: "ALL",
            label: "All Departments"
        },
        {
            value: "CA",
            label: "Computer Applications",
        },
        {
            value: "CS",
            label: "Computer Science",
        },
        {
            value: "IS",
            label: "Information Systems",
        },
        {
            value: "IT",
            label: "Information Technology",
        },
    ]
}

export function Departmentbox() {
    const [value, setValue] = React.useState("ALL")
    const departments = getDepartments()

    return (
        <Combobox items={departments} defaultValue="ALL" placeholder="Department" onSelect={setValue} />
    )
}
