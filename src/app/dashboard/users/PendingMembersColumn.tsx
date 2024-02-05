'use client';

import { ColumnDef } from '@tanstack/react-table';
import { OrganizationMember } from '@/lib/types';

export const PendingMembersColumn: ColumnDef<OrganizationMember>[] = [
  {
    id: 'index',
    accessorKey: 'index',
    header: 'Index',
    cell: (info) => info.row.index + 1,
    size: 10,
  },
  { id: 'email', accessorKey: 'email', header: 'Email' },
];
