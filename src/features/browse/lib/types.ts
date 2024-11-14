import { ColumnSort } from '@tanstack/react-table';

export type SortId = 'latest' | 'oldest' | 'alpha' | '-alpha'

export type ColumnID = 'title' |
    'year' |
    'specializations' |
    'authors' |
    'adviser' |
    'panelists' |
    'department' |
    'college'

export type SortValue = {
    id: SortId;
    label: string;
    value: ColumnSort
};
export type ScrollState = {
    left?: { value: number; isScrolled: boolean; };
    top?: { value: number; isScrolled: boolean; };
};
