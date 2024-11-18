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

export async function fetchColleges(
    pageNumber = 0,
    search?: string
) {
    const itemsPerPage = 10;
    const skip = (pageNumber) * itemsPerPage;

    const results = await prisma.college.findMany({
        select: { name: true },
        where: {
            ...(search && {
                name: {
                    contains: search,
                    mode: 'insensitive',
                }
            })
        },
        skip: skip,
        take: itemsPerPage,
    })

    const colleges = results.map(result => result.name);

    return {
        items: colleges,
        currentPage: pageNumber,
        nextPage: colleges.length < itemsPerPage ? null : pageNumber + 1,
        search,
    };
}

export async function fetchDepartments(
    pageNumber = 0,
    search?: string
) {
    const itemsPerPage = 10;
    const skip = (pageNumber) * itemsPerPage;

    const results = await prisma.department.findMany({
        select: { name: true },
        where: {
            ...(search && {
                name: {
                    contains: search,
                    mode: 'insensitive',
                }
            })
        },
        skip: skip,
        take: itemsPerPage,
    })

    const departments = results.map(result => result.name);

    return {
        items: departments,
        currentPage: pageNumber,
        nextPage: departments.length < itemsPerPage ? null : pageNumber + 1,
        search,
    };
}

export async function fetchApprovedYears(
    pageNumber = 0,
    search?: string
) {
    const itemsPerPage = 10;
    const skip = (pageNumber) * itemsPerPage;

    const results = await prisma.thesis.findMany({
        select: { year_approved: true },
        distinct: ['year_approved'],
        where: {
            year_approved: {
                ...(search && { equals: parseInt(search) })
            }
        },
        skip: skip,
        take: itemsPerPage,
    });

    const years = results.filter(res => res.year_approved !== null).map(res => res.year_approved!.toString());

    return {
        items: years,
        currentPage: pageNumber,
        nextPage: years.length < itemsPerPage ? null : pageNumber + 1,
        search,
    };
}

export async function fetchSpecializations(
    pageNumber = 0,
    search?: string
) {
    const itemsPerPage = 10;
    const skip = (pageNumber) * itemsPerPage;

    const results = await prisma.specializationTag.findMany({
        select: { name: true },
        where: {
            ...(search && {
                name: {
                    contains: search,
                    mode: 'insensitive',
                }
            })
        },
        skip: skip,
        take: itemsPerPage,
    });

    const specializations = results.map(result => result.name);

    return {
        items: specializations,
        currentPage: pageNumber,
        nextPage: specializations.length < itemsPerPage ? null : pageNumber + 1,
        search,
    };
}


export async function fetchApprovedThesesAuthors(
    pageNumber = 0,
    search?: string
) {
    const itemsPerPage = 10;
    const skip = (pageNumber) * itemsPerPage;

    const results = await prisma.authorView.findMany({
        select: { first_name: true, last_name: true },
        distinct: ['author_id'],
        where: {
            status: 'APPROVED',
            ...(search && {
                OR: [
                    {
                        first_name: {
                            contains: search,
                            mode: 'insensitive',
                        },
                    },
                    {
                        last_name: {
                            contains: search,
                            mode: 'insensitive',
                        },
                    },
                ],
            }),
        },
        skip: skip,
        take: itemsPerPage,
    });

    const authors = results.map(result => Object.values(result).join(' '))

    return {
        items: authors,
        currentPage: pageNumber,
        nextPage: authors.length < itemsPerPage ? null : pageNumber + 1,
        search,
    };
}

export async function fetchApprovedThesesAdviser(
    pageNumber = 0,
    search?: string
) {
    const itemsPerPage = 10;
    const skip = (pageNumber) * itemsPerPage;

    const results = await prisma.adviserView.findMany({
        select: { prefix: true, first_name: true, last_name: true, suffix: true },
        distinct: ['adviser_id'],
        where: {
            status: 'APPROVED',
            ...(search && {
                OR: [
                    {
                        first_name: {
                            contains: search,
                            mode: 'insensitive',
                        },
                    },
                    {
                        last_name: {
                            contains: search,
                            mode: 'insensitive',
                        },
                    },
                ],
            }),
        },
        skip: skip,
        take: itemsPerPage,
    });

    const advisers = results.map(result => {
        const { prefix, first_name, last_name, suffix } = result;

        if (prefix && suffix) return `${prefix}${first_name} ${last_name}, ${suffix}`;
        else if (suffix) return `${first_name} ${last_name}, ${suffix}`;
        else return `${first_name} ${last_name}`;
    });

    return {
        items: advisers,
        currentPage: pageNumber,
        nextPage: advisers.length < itemsPerPage ? null : pageNumber + 1,
        search,
    };
}

export async function fetchApprovedThesesPanelists(
    pageNumber = 0,
    search?: string
) {
    const itemsPerPage = 10;
    const skip = (pageNumber) * itemsPerPage;

    const results = await prisma.panelistView.findMany({
        select: { prefix: true, first_name: true, last_name: true, suffix: true },
        distinct: ['panelist_id'],
        where: {
            status: 'APPROVED',
            ...(search && {
                OR: [
                    {
                        first_name: {
                            contains: search,
                            mode: 'insensitive',
                        },
                    },
                    {
                        last_name: {
                            contains: search,
                            mode: 'insensitive',
                        },
                    },
                ],
            }),
        },
        skip: skip,
        take: itemsPerPage,
    });

    const panelists = results.map(result => {
        const { prefix, first_name, last_name, suffix } = result;

        if (prefix && suffix) return `${prefix}${first_name} ${last_name}, ${suffix}`;
        else if (suffix) return `${first_name} ${last_name}, ${suffix}`;
        else return `${first_name} ${last_name}`;
    });

    return {
        items: panelists,
        currentPage: pageNumber,
        nextPage: panelists.length < itemsPerPage ? null : pageNumber + 1,
        search,
    };
}