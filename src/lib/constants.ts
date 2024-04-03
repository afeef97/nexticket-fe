import { LabelValue } from './types';

export const TIME_OPTIONS: LabelValue<string>[] = [
  { label: 'All', value: '' },
  { label: 'Today', value: 'today' },
  { label: 'Past week', value: 'past_week' },
  { label: 'Past month', value: 'past_month' },
];

export const STATUS_OPTIONS: LabelValue<string>[] = [
  { label: 'All', value: '' },
  { label: 'Completed', value: 'COMPLETED' },
  { label: 'Pending', value: 'PENDING' },
  { label: 'Rejected', value: 'REJECTED' },
];

export const TICKET_STATUS_OPTIONS: LabelValue<string>[] = [
  { label: 'Completed', value: 'COMPLETED' },
  { label: 'Pending', value: 'PENDING' },
  { label: 'Awaiting Reply', value: 'AWAITING_REPLY' },
  { label: 'Rejected', value: 'REJECTED' },
];

export const BACKEND_URL = process.env.NEXTICKET_API;

export const FRONTEND_URL = process.env.NEXTICKET_FRONTEND;