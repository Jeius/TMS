"use client"

import { Combobox } from "@/components/ui/combobox"
import * as React from "react"


const getDepartments = () => {
    return ["all", "computer Applications", "computer Science", "information Systems", "information Technology"];
}

export function Departmentbox() {
    const [value, setValue] = React.useState("all")
    const departments = getDepartments()

    return (
        <Combobox items={departments} defaultValue={value} placeholder="Department" onMenuSelect={setValue} />
    )
}
