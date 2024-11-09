'use server'

import { Thesis } from '@/lib/types';
import { fetchMockAdvisers, fetchMockAuthors, fetchMockColleges, fetchMockDepartments, fetchMockPanelists, fetchMockPublicationYears, fetchMockSpecializations } from '@/mock/actions/fetch-filters';
import { fetchMockTheses } from '@/mock/actions/fetch-thesis-data';
import { PrismaClient } from '@prisma/client';

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

export async function fetchTheses() {
    const prisma = new PrismaClient();
    const approvedThesis = await prisma.approvedThesisView.findMany({
        select: {
            title: true,
            year: true,
            authors: true,
            adviser: true,
            panelists: true,
            specializations: true,
            department: true,
            college: true,
        }
    });
    return approvedThesis as Thesis[];
}