'use client';

import {
  AccessContext,
  IAccessContext,
} from '@/components/providers/AccessContextProvider';
import { ColumnDef } from '@tanstack/react-table';
import { OrganizationMember } from '@/lib/types';
import { useContext } from 'react';

export const VerifiedMembersColumn: ColumnDef<OrganizationMember>[] = [
  {
    id: 'index',
    accessorKey: 'index',
    header: 'Index',
    cell: (info) => info.row.index + 1,
    size: 10,
  },
  {
    id: 'username',
    accessorKey: 'username',
    header: 'Username',
    size: 200,
    cell: function Cell(cell) {
      const { userData } = useContext<IAccessContext>(AccessContext);
      const cellValue = cell.getValue() as string;
      console.log(cellValue);

      return userData?.username === cellValue ? (
        <span className='font-bold'>{cellValue} (You)</span>
      ) : (
        cellValue
      );
    },
  },
  { id: 'email', accessorKey: 'email', header: 'Email' },
  {
    id: 'role',
    accessorKey: 'role',
    header: 'Role',
    size: 120,
    cell: function Cell(cell) {
      const cellValue = cell.getValue() as string;
      const roles = {
        SUPER_ADMIN: 'Super Admin',
        ADMIN: 'Admin',
        USER: 'User',
      };

      return roles[cellValue as keyof typeof roles];
    },
  },
];
