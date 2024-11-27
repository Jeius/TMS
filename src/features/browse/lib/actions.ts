'use server';

import prisma from '@/server/db';
import { VisibilityState } from '@tanstack/react-table';
import { ColumnID } from './types';

const LIMIT = 10;

type FetchThesesParams = {
  columns?: VisibilityState;
  order?: Record<ColumnID, 'asc' | 'desc'>[];
};

export async function fetchTheses({ columns, order }: FetchThesesParams) {
  // const defaultCols = {
  //     title: true,
  //     year: true,
  //     authors: true,
  //     department: true,
  //     specializations: true,
  //     adviser: true
  // }
  const approvedThesis = await prisma.approvedThesisView.findMany({
    select: columns,
    orderBy: order,
  });
  return approvedThesis as unknown;
}

export async function fetchColleges(pageNumber = 0, search?: string) {
  const skip = pageNumber * LIMIT;

  const results = await prisma.college.findMany({
    select: { name: true },
    where: {
      ...(search && {
        name: {
          contains: search,
          mode: 'insensitive',
        },
      }),
    },
    skip: skip,
    take: LIMIT,
  });

  const colleges = results.map((result) => result.name);

  return {
    items: colleges,
    currentPage: pageNumber,
    nextPage: colleges.length < LIMIT ? null : pageNumber + 1,
    search,
  };
}

export async function fetchDepartments(pageNumber = 0, search?: string) {
  const skip = pageNumber * LIMIT;

  const results = await prisma.department.findMany({
    select: { name: true },
    where: {
      ...(search && {
        name: {
          contains: search,
          mode: 'insensitive',
        },
      }),
    },
    skip: skip,
    take: LIMIT,
  });

  const departments = results.map((result) => result.name);

  return {
    items: departments,
    currentPage: pageNumber,
    nextPage: departments.length < LIMIT ? null : pageNumber + 1,
    search,
  };
}

export async function fetchApprovedYears(pageNumber = 0, search?: string) {
  const skip = pageNumber * LIMIT;

  const results = await prisma.thesis.findMany({
    select: { year_approved: true },
    distinct: ['year_approved'],
    where: {
      year_approved: {
        ...(search && { equals: parseInt(search) }),
      },
    },
    skip: skip,
    take: LIMIT,
  });

  const years = results
    .filter((res) => res.year_approved !== null)
    .map((res) => res.year_approved!.toString());

  return {
    items: years,
    currentPage: pageNumber,
    nextPage: years.length < LIMIT ? null : pageNumber + 1,
    search,
  };
}

export async function fetchSpecializations(pageNumber = 0, search?: string) {
  const skip = pageNumber * LIMIT;

  const results = await prisma.specializationTag.findMany({
    select: { name: true },
    where: {
      ...(search && {
        name: {
          contains: search,
          mode: 'insensitive',
        },
      }),
    },
    skip: skip,
    take: LIMIT,
  });

  const specializations = results.map((result) => result.name);

  return {
    items: specializations,
    currentPage: pageNumber,
    nextPage: specializations.length < LIMIT ? null : pageNumber + 1,
    search,
  };
}

export async function fetchApprovedThesesAuthors(
  pageNumber = 0,
  search?: string
) {
  const skip = pageNumber * LIMIT;

  const results = await prisma.authorView.findMany({
    select: { first_name: true, last_name: true },
    distinct: ['author_id'],
    where: {
      status: 'FINAL_MANUSCRIPT',
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
    take: LIMIT,
  });

  const authors = results.map((result) => Object.values(result).join(' '));

  return {
    items: authors,
    currentPage: pageNumber,
    nextPage: authors.length < LIMIT ? null : pageNumber + 1,
    search,
  };
}

export async function fetchApprovedThesesAdviser(
  pageNumber = 0,
  search?: string
) {
  const skip = pageNumber * LIMIT;

  const results = await prisma.adviserView.findMany({
    select: { prefix: true, first_name: true, last_name: true, suffix: true },
    distinct: ['adviser_id'],
    where: {
      status: 'FINAL_MANUSCRIPT',
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
    take: LIMIT,
  });

  const advisers = results.map((result) => {
    const { prefix, first_name, last_name, suffix } = result;

    if (prefix && suffix)
      return `${prefix} ${first_name} ${last_name}, ${suffix}`;
    else if (suffix) return `${first_name} ${last_name}, ${suffix}`;
    else return `${first_name} ${last_name}`;
  });

  return {
    items: advisers,
    currentPage: pageNumber,
    nextPage: advisers.length < LIMIT ? null : pageNumber + 1,
    search,
  };
}

export async function fetchApprovedThesesPanelists(
  pageNumber = 0,
  search?: string
) {
  const skip = pageNumber * LIMIT;

  const results = await prisma.panelistView.findMany({
    select: { prefix: true, first_name: true, last_name: true, suffix: true },
    distinct: ['panelist_id'],
    where: {
      status: 'FINAL_MANUSCRIPT',
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
    take: LIMIT,
  });

  const panelists = results.map((result) => {
    const { prefix, first_name, last_name, suffix } = result;

    if (prefix && suffix)
      return `${prefix} ${first_name} ${last_name}, ${suffix}`;
    else if (suffix) return `${first_name} ${last_name}, ${suffix}`;
    else return `${first_name} ${last_name}`;
  });

  return {
    items: panelists,
    currentPage: pageNumber,
    nextPage: panelists.length < LIMIT ? null : pageNumber + 1,
    search,
  };
}
