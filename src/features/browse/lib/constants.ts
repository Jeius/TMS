import { SortValue } from './types';

export const SORT_VALUES: SortValue[] = [
    { id: 'alpha', label: 'A - Z', value: { id: 'theses', desc: false } },
    { id: '-alpha', label: 'Z - A', value: { id: 'theses', desc: true } },
    { id: 'latest', label: 'Latest First', value: { id: 'year', desc: true } },
    { id: 'oldest', label: 'Oldest First', value: { id: 'year', desc: false } }
];

export const COLUMN_IDS: string[] = [
    'title',
    'year',
    'authors',
    'adviser',
    'keywords',
    'specializations',
    'panelists',
    'dateUploaded',
    'department',
    'college',
];

export const FILTER_COLUMN_IDS: string[] = [
    'college',
    'department',
    'year',
    'specialization',
    'author',
    'adviser',
    'panelist',
];