import { SortValue } from "./types";

export const SORTVALUES: SortValue[] = [
    { id: 'alpha', label: 'A - Z', value: { id: 'theses', desc: false } },
    { id: '-alpha', label: 'Z - A', value: { id: 'theses', desc: true } },
    { id: 'latest', label: 'Latest First', value: { id: 'year', desc: true } },
    { id: 'oldest', label: 'Oldest First', value: { id: 'year', desc: false } }
]