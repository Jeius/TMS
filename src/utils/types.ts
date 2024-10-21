import { z } from "zod"

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

export const RemindersFormSchema = z.object({
    reminders: z.array(z.string()),
})