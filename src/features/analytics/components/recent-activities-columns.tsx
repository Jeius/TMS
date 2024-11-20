'use client';

import { ColumnDef } from '@tanstack/react-table';

export type Activity = {
  id: string;
  title: string;
  author: string[];
  action: 'Uploaded' | 'Updated' | 'Approved' | 'Borrowed';
  age: string;
};

export const columns: ColumnDef<Activity>[] = [
  {
    accessorKey: 'action',
    header: '',
    cell: ({ row }) => {
      const value = row.getValue('action') as string;
      return (
        <div className="w-fit rounded-md border bg-background px-2 py-1">
          {value}
        </div>
      );
    },
  },
  {
    accessorKey: 'title',
    header: 'Title',
    cell: ({ row }) => {
      const value = row.getValue('title') as string;
      return <div className="max-w-64 truncate">{value}</div>;
    },
  },
  {
    accessorKey: 'author',
    header: 'Author',
    cell: ({ row }) => {
      const value = row.getValue('author') as string[];
      return <div className="whitespace-nowrap">{value.join(', ')}</div>;
    },
  },
  {
    accessorKey: 'age',
    header: '',
    cell: ({ row }) => {
      const value = row.getValue('age') as string;
      return <div className="whitespace-nowrap">{value} ago</div>;
    },
  },
];
