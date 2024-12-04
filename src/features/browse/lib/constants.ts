import { ComboboxFunction } from '@/components/combobox';
import { ColumnID } from '@/lib/types';
import {
  fetchAdvisers,
  fetchApprovedYears,
  fetchAuthors,
  fetchColleges,
  fetchDepartments,
  fetchPanelists,
  fetchSpecializations,
} from '@/server/actions';
import { SortValue } from './types';

export const SORT_VALUES: SortValue[] = [
  { id: 'alpha', label: 'A - Z', value: { id: 'theses', desc: false } },
  { id: '-alpha', label: 'Z - A', value: { id: 'theses', desc: true } },
  { id: 'latest', label: 'Latest First', value: { id: 'year', desc: true } },
  { id: 'oldest', label: 'Oldest First', value: { id: 'year', desc: false } },
];

export const COLUMN_IDS: ColumnID[] = [
  'title',
  'abstract',
  'year',
  'specializations',
  'authors',
  'adviser',
  'panelists',
  'department',
  'college',
];

export const FILTERS: { [x: string]: ComboboxFunction } = {
  college: async (pageNumber = 0, search?: string) => {
    const res = await fetchColleges(pageNumber, search);
    return {
      ...res,
      items: res.data
        .filter((res) => res.deleted_at === null)
        .map(({ id, name }) => ({ id, value: name })),
    };
  },
  department: async (pageNumber = 0, search?: string) => {
    const res = await fetchDepartments(pageNumber, search);
    return {
      ...res,
      items: res.data
        .filter((res) => res.deleted_at === null)
        .map(({ id, name }) => ({ id, value: name })),
    };
  },
  year: async (pageNumber = 0, search?: string) => {
    const res = await fetchApprovedYears(pageNumber, search);
    return {
      ...res,
      items: res.data.map((item) => ({ id: item, value: item })),
    };
  },
  specializations: async (pageNumber = 0, search?: string) => {
    const res = await fetchSpecializations(pageNumber, search);
    return {
      ...res,
      items: res.data
        .filter((res) => res.deleted_at === null)
        .map(({ id, name }) => ({ id: Number(id), value: name })),
    };
  },
  authors: async (pageNumber = 0, search?: string) => {
    const res = await fetchAuthors(pageNumber, search);
    return {
      ...res,
      items: res.data
        .filter((item) => !!item.first_name && !!item.last_name)
        .map((item) => ({
          id: item.author_id,
          value: `${item.first_name} ${item.last_name}`,
        })),
    };
  },
  adviser: async (pageNumber = 0, search?: string) => {
    const res = await fetchAdvisers(pageNumber, search);
    return {
      ...res,
      items: res.data
        .filter((item) => !!item.first_name && !!item.last_name)
        .map((item) => {
          const { prefix, first_name, last_name, suffix } = item;
          let fullName = `${first_name} ${last_name}`;
          if (prefix && suffix)
            fullName = `${prefix} ${first_name} ${last_name}, ${suffix}`;
          else if (suffix) fullName = `${first_name} ${last_name}, ${suffix}`;
          return { id: item.adviser_id, value: fullName };
        }),
    };
  },
  panelists: async (pageNumber = 0, search?: string) => {
    const res = await fetchPanelists(pageNumber, search);
    return {
      ...res,
      items: res.data
        .filter((item) => !!item.first_name && !!item.last_name)
        .map((item) => {
          const { prefix, first_name, last_name, suffix } = item;
          let fullName = `${first_name} ${last_name}`;
          if (prefix && suffix)
            fullName = `${prefix} ${first_name} ${last_name}, ${suffix}`;
          else if (suffix) fullName = `${first_name} ${last_name}, ${suffix}`;
          return { id: item.panelist_id, value: fullName };
        }),
    };
  },
};
