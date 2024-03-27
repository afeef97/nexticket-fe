import {
  UpdateEmailSchema,
  UpdatePasswordSchema,
  UpdateUsernameSchema,
} from './schemas/updateAccountForm';
import { ColumnDef } from '@tanstack/react-table';
import { ObjectSchema } from 'valibot';
import { UseFormReturn } from 'react-hook-form';

type TypedFormDataValue = FormDataEntryValue | Blob;

/**
 * Polyfill for FormData Generic
 *
 * {@link https://github.com/microsoft/TypeScript/issues/43797}
 * {@link https://xhr.spec.whatwg.org/#interface-formdata}
 */
/* eslint-disable no-unused-vars */
export interface TypedFormData<T extends Record<string, TypedFormDataValue>> {
  /**
   * Appends a new value onto an existing key inside a FormData object, or adds the key if
   * it does not already exist.
   *
   * {@link https://developer.mozilla.org/en-US/docs/Web/API/FormData#formdata.append}
   */
  append<K extends keyof T>(name: K, value: T[K], fileName?: string): void;

  /**
   * Deletes a key/value pair from a FormData object.
   *
   * {@link https://developer.mozilla.org/en-US/docs/Web/API/FormData#formdata.delete}
   */
  delete(name: keyof T): void;

  /**
   * Returns an iterator allowing to go through all key/value pairs contained in this object.
   *
   * {@link https://developer.mozilla.org/en-US/docs/Web/API/FormData#formdata.entries}
   */
  entries<K extends keyof T>(): IterableIterator<[K, T[K]]>;

  /**
   * Returns the first value associated with a given key from within a FormData object.
   *
   * {@link https://developer.mozilla.org/en-US/docs/Web/API/FormData#formdata.get}
   */
  get<K extends keyof T>(name: K): T[K] | null;

  /**
   * Returns an array of all the values associated with a given key from within a FormData.
   *
   * {@link https://developer.mozilla.org/en-US/docs/Web/API/FormData#formdata.getall}
   */
  getAll<K extends keyof T>(name: K): Array<T[K]>;

  /**
   * Returns a boolean stating whether a FormData object contains a certain key.
   *
   * {@link https://developer.mozilla.org/en-US/docs/Web/API/FormData#formdata.has}
   */
  has(name: keyof T): boolean;

  /**
   * Returns an iterator allowing to go through all keys of the key/value pairs contained in
   * this object.
   *
   * {@link https://developer.mozilla.org/en-US/docs/Web/API/FormData#formdata.keys}
   */
  keys(): IterableIterator<keyof T>;

  /**
   * Sets a new value for an existing key inside a FormData object, or adds the key/value
   * if it does not already exist.
   *
   * {@link https://developer.mozilla.org/en-US/docs/Web/API/FormData#formdata.set}
   */
  set(name: keyof T, value: TypedFormDataValue, fileName?: string): void;

  /**
   * Returns an iterator allowing to go through all values contained in this object.
   *
   * {@link https://developer.mozilla.org/en-US/docs/Web/API/FormData#formdata.values}
   */
  values(): IterableIterator<T[keyof T]>;

  forEach<K extends keyof T>(
    callbackfn: (value: T[K], key: K, parent: TypedFormData<T>) => void,
    thisArg?: unknown
  ): void;
}
/* eslint-enable no-unused-vars */

export type FetchReturn<T> = FetchReturnSuccess<T> | FetchReturnError;

export interface FetchReturnSuccess<T> {
  ok: true;
  data: T;
}

export interface FetchReturnError {
  ok: false;
  data: {
    statusCode: number;
    message: string;
    [key: string]: unknown;
  };
}

export type EmptyResponse = {
  data: [];
  message?: string;
};

export type GetQuery<T> = {
  data: T;
  message: string;
};

export type QueryState = 'idle' | 'pending' | 'resolved' | 'error';

export type LabelValue<T> = {
  label: string;
  value: T;
};

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
  message?: string;
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
  role: 'PARLIAMENT_ADMIN' | 'SUPER_ADMIN' | 'ADMIN' | 'USER';
  isVerified?: boolean;
};

export type PaginatedParliamentMember = {
  data: OrganizationMember[];
  meta: {
    total: number;
    lastPage: number;
    currentPage: number;
    perPage: number;
    prev: number;
    next: number;
  };
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

export type TicketSummary = {
  platform: string;
  category: string;
  status_pending_count: number;
  status_processed_count: number;
  status_resolved_count: number;
  priority_low_count: number;
  priority_medium_count: number;
  priority_important_count: number;
  total: number;
};

type ParliamentTicketSummaryCount = {
  total_ticket_count: number;
  total_pending_count: number;
  total_completed_count: number;
  total_awaiting_reply_count: number;
  total_rejected_count: number;
};

export type ParliamentTicketSummary = {
  aid: ParliamentTicketSummaryCount;
  complaint: ParliamentTicketSummaryCount;
  all: ParliamentTicketSummaryCount;
  analytics: {
    year: string;
    month: string;
    count: number;
  };
};

export type ParliamentTickets = {
  id: number;
  full_name: string;
  email: string;
  phone_number: number;
  address: string;
  occupation: string;
  title: string;
  content: string;
  ticket_type: 'AID' | 'COMPLAINT';
  ticket_status: 'PENDING' | 'COMPLETED' | 'REJECTED' | 'AWAITING_REPLY';
  organization_id: number;
  created_at: string;
};

export type PaginatedParliamentTickets = {
  data: ParliamentTickets[];
  meta: {
    total: number;
    lastPage: number;
    currentPage: number;
    perPage: number;
    prev: number;
    next: number;
  };
};