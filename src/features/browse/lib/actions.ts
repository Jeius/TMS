'use server'

import { Thesis } from '@/lib/types';
import { fetchMockAdvisers, fetchMockAuthors, fetchMockColleges, fetchMockDepartments, fetchMockPanelists, fetchMockPublicationYears, fetchMockSpecializations } from '@/mock/actions/fetch-filters';
import { fetchMockTheses } from '@/mock/actions/fetch-thesis-data';
import { PrismaClient } from '@prisma/client';
import { VisibilityState } from '@tanstack/react-table';
import { ColumnID } from './types';

export async function fetchFiltersById(filter: string) {
    const filters = {
        'college': fetchMockColleges,
        'department': fetchMockDepartments,
        'specialization': fetchMockSpecializations,
        'year': fetchMockPublicationYears,
        'author': fetchMockAuthors,
        'adviser': fetchMockAdvisers,
        'panelist': fetchMockPanelists,
    }

    const fetcher = Object.entries(filters).find(entry => entry[0] === filter)?.[1];

    return fetcher ? await fetcher() : [];
}

export async function fetchColumnIds() {
    const theses = await fetchMockTheses();
    const columnIds = Object.keys(theses[0] ?? {}).filter(key => key !== 'id') as Array<keyof Thesis>;
    return columnIds;
}

type FetchThesesParams = {
    columns?: VisibilityState
    order?: Record<ColumnID, 'asc' | 'desc'>[]
}

export async function fetchTheses({ columns, order }: FetchThesesParams) {
    const prisma = new PrismaClient();
    const defaultCols = { title: true, year: true, authors: true, department: true, specializations: true, adviser: true }
    const approvedThesis = await prisma.approvedThesisView.findMany({
        select: columns,
        orderBy: order
    });
    return approvedThesis as unknown;
}