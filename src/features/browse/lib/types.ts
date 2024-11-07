import { ColumnSort } from '@tanstack/react-table';

export type SortValue = {
    id: string;
    label: string;
    value: ColumnSort
};
export type ScrollState = {
    left?: { value: number; isScrolled: boolean; };
    top?: { value: number; isScrolled: boolean; };
};
