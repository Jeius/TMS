'use server'

import prisma from '@/server/db';
import { VisibilityState } from '@tanstack/react-table';
import { ColumnID } from './types';

type FetchThesesParams = {
    columns?: VisibilityState
    order?: Record<ColumnID, 'asc' | 'desc'>[]
}

export async function fetchTheses({ columns, order }: FetchThesesParams) {
    const defaultCols = {
        title: true,
        year: true,
        authors: true,
        department: true,
        specializations: true,
        adviser: true
    }
    const approvedThesis = await prisma.approvedThesisView.findMany({
        select: columns,
        orderBy: order
    });
    return approvedThesis as unknown;
}


export async function fetchUniqueDataByColumnId(
    columnId: ColumnID,
    pageNumber: number,
    search?: string
) {
    const itemsPerPage = 10;
    const skip = (pageNumber) * itemsPerPage;

    // Fetch records with search and pagination
    const records: { [x: string]: string | string[] | number }[] = await prisma.approvedThesisView.findMany({
        where: (search && columnId !== 'year')
            ? {
                [columnId]: {
                    contains: search,
                    mode: 'insensitive',
                },
            }
            : (search && columnId === 'year')
                ? {
                    year: {
                        equals: parseInt(search),
                    },
                }
                : {},
        distinct: [columnId],
        select: { [columnId]: true },
        skip: skip,
        take: itemsPerPage,
    });

    // Create a set to store unique values
    const uniqueValuesSet = new Set<string>();

    records.forEach(record => {
        const value = record[columnId];

        if (Array.isArray(value)) {
            value.forEach(item => uniqueValuesSet.add(item));
        } else if (typeof value === 'number') {
            uniqueValuesSet.add(value.toString());
        } else if (value) {
            uniqueValuesSet.add(value);
        }
    });

    // Convert Set to array and slice to get only the unique items for the current page
    const uniqueItems = Array.from(uniqueValuesSet);

    return {
        items: uniqueItems,
        currentPage: pageNumber,
        nextPage: uniqueItems.length < itemsPerPage ? null : pageNumber + 1,
        search,
    };
}


export async function fetchApprovedThesesAuthors(
    pageNumber: number,
    search?: string
) {
    const result = await prisma.profile.findMany({
        select: { first_name: true, last_name: true }
    });
}