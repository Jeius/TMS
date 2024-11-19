import { ComboboxFunction } from '@/components/combobox';
import {
    fetchApprovedThesesAdviser,
    fetchApprovedThesesAuthors,
    fetchApprovedThesesPanelists,
    fetchApprovedYears,
    fetchColleges,
    fetchDepartments,
    fetchSpecializations
} from './actions';
import { ColumnID, SortValue } from './types';

export const SORT_VALUES: SortValue[] = [
    { id: 'alpha', label: 'A - Z', value: { id: 'theses', desc: false } },
    { id: '-alpha', label: 'Z - A', value: { id: 'theses', desc: true } },
    { id: 'latest', label: 'Latest First', value: { id: 'year', desc: true } },
    { id: 'oldest', label: 'Oldest First', value: { id: 'year', desc: false } }
];

export const COLUMN_IDS: ColumnID[] = [
    'title',
    'year',
    'specializations',
    'authors',
    'adviser',
    'panelists',
    'department',
    'college',
];

export const FILTERS: { [x: string]: ComboboxFunction } = {
    college: fetchColleges,
    department: fetchDepartments,
    year: fetchApprovedYears,
    specializations: fetchSpecializations,
    authors: fetchApprovedThesesAuthors,
    adviser: fetchApprovedThesesAdviser,
    panelists: fetchApprovedThesesPanelists,
}