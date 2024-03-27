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
