"use client"

import { Combobox, ComboboxItem } from "@/components/combobox";
import * as React from "react";


const getDepartments = (): ComboboxItem[] => {
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
    const [value, setValue] = React.useState("")
    const departments = getDepartments()

    return (
        <Combobox items={departments} defaultValue={value} placeholder="Department" onValueChanged={setValue} />
    )
}
