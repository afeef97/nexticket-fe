import {
  UpdateEmailSchema,
  UpdatePasswordSchema,
  UpdateUsernameSchema,
} from './schemas/updateAccountForm';
import { ColumnDef } from '@tanstack/react-table';
import { ObjectSchema } from 'valibot';
import { UseFormReturn } from 'react-hook-form';

export type QueryState = 'idle' | 'pending' | 'resolved' | 'error';

export type UserData = {
  id: number;
  email: string;
  token: string;
  is_verified: boolean;
  username: string;
  role: 'PARLIAMENT_ADMIN' | 'SUPER_ADMIN' | 'ADMIN' | 'USER';
  organization_id: number;
  created_at: string;
  updated_at: string;
  organization: OrganizationData;
  user_has_ticket: number[];
};

export type OrganizationData = {
  id: number;
  name: string;
  api_key: string;
  email_domain: string;
  created_at: string;
  updated_at: string;
};

export type OrganizationMember = {
  email: string;
  username: string;
  role: 'SUPER_ADMIN' | 'ADMIN' | 'USER';
};

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  paginated?: boolean;
}

export type UpdateSchema =
  | typeof UpdateEmailSchema
  | typeof UpdatePasswordSchema
  | typeof UpdateUsernameSchema;

export type UpdateFields = {
  name: string;
  label: string;
  schema: ObjectSchema<any, any>;
  form: UseFormReturn<any>;
  isEdit: boolean;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
};
