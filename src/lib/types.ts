
export type Thesis = {
    id: string
    title: string
    year: string
    author: string
    adviser: string
    keywords: string
    specialization: string
    dateUploaded: string
    department: string
}

export type AuthActionResponse = {
    success?: string,
    error?: string,
    details?: string,
}

export type Message =
    | { success?: string }
    | { error?: string };



