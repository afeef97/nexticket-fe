import { LabelValue } from './types';

export const TIME_OPTIONS: LabelValue<string>[] = [
  { label: 'All', value: '' },
  { label: 'Today', value: 'today' },
  { label: 'Past week', value: 'past_week' },
  { label: 'Past month', value: 'past_month' },
];

export const COMPLAINT_FILTER_OPTIONS: LabelValue<string>[] = [
  { label: 'All', value: '' },
  { label: 'Completed', value: 'COMPLETED' },
  { label: 'Awaiting Reply', value: 'AWAITING_REPLY' },
];

export const AID_FILTER_OPTIONS: LabelValue<string>[] = [
  { label: 'All', value: '' },
  { label: 'Completed', value: 'COMPLETED' },
  { label: 'Pending', value: 'PENDING' },
  { label: 'Rejected', value: 'REJECTED' },
];

export const COMPLAINT_STATUS_OPTIONS: LabelValue<string>[] = [
  { label: 'Completed', value: 'COMPLETED' },
  { label: 'Awaiting Reply', value: 'AWAITING_REPLY' },
];

export const AID_STATUS_OPTIONS: LabelValue<string>[] = [
  { label: 'Completed', value: 'COMPLETED' },
  { label: 'Rejected', value: 'REJECTED' },
  { label: 'Pending', value: 'PENDING' },
];

export const BACKEND_URL = process.env.NEXTICKET_API;

export const FRONTEND_URL = process.env.NEXTICKET_FRONTEND;