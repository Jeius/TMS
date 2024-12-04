'use server';

import { ColumnID } from '@/lib/types';
import prisma from '@/server/db';
import { VisibilityState } from '@tanstack/react-table';
import { ThesisStatus } from '../../prisma/generated/client';

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

  return {
    data: results,
    currentPage: pageNumber,
    nextPage: results.length < LIMIT ? null : pageNumber + 1,
    search,
  };
}

export async function fetchDepartments(pageNumber = 0, search?: string) {
  const skip = pageNumber * LIMIT;

  const results = await prisma.department.findMany({
    select: {
      id: true,
      name: true,
      created_at: true,
      deleted_at: true,
      updated_at: true,
      college: {
        select: { id: true, name: true },
      },
    },
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

  return {
    data: results,
    currentPage: pageNumber,
    nextPage: results.length < LIMIT ? null : pageNumber + 1,
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
    .map((res) => String(res.year_approved));

  return {
    data: years,
    currentPage: pageNumber,
    nextPage: years.length < LIMIT ? null : pageNumber + 1,
    search,
  };
}

export async function fetchSpecializations(pageNumber = 0, search?: string) {
  const skip = pageNumber * LIMIT;

  const results = await prisma.specializationTag.findMany({
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

  return {
    data: results,
    currentPage: pageNumber,
    nextPage: results.length < LIMIT ? null : pageNumber + 1,
    search,
  };
}

export async function fetchAuthors(
  pageNumber = 0,
  search?: string,
  status: ThesisStatus = 'FINAL_MANUSCRIPT'
) {
  const skip = pageNumber * LIMIT;

  const results = await prisma.authorView.findMany({
    distinct: ['author_id'],
    where: {
      status: status,
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

  return {
    data: results,
    currentPage: pageNumber,
    nextPage: results.length < LIMIT ? null : pageNumber + 1,
    search,
  };
}

export async function fetchAdvisers(
  pageNumber = 0,
  search?: string,
  status: ThesisStatus = 'FINAL_MANUSCRIPT'
) {
  const skip = pageNumber * LIMIT;

  const results = await prisma.adviserView.findMany({
    distinct: ['adviser_id'],
    where: {
      status: status,
      ...(search && {
        OR: [
          {
            prefix: {
              contains: search,
              mode: 'insensitive',
            },
          },
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
          {
            suffix: {
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

  return {
    data: results,
    currentPage: pageNumber,
    nextPage: results.length < LIMIT ? null : pageNumber + 1,
    search,
  };
}

export async function fetchPanelists(
  pageNumber = 0,
  search?: string,
  status: ThesisStatus = 'FINAL_MANUSCRIPT'
) {
  const skip = pageNumber * LIMIT;

  const results = await prisma.panelistView.findMany({
    distinct: ['panelist_id'],
    where: {
      status: status,
      ...(search && {
        OR: [
          {
            prefix: {
              contains: search,
              mode: 'insensitive',
            },
          },
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
          {
            suffix: {
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

  return {
    data: results,
    currentPage: pageNumber,
    nextPage: results.length < LIMIT ? null : pageNumber + 1,
    search,
  };
}
