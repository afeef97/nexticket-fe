export type QueryState = 'idle' | 'pending' | 'resolved' | 'error';

export type UserData = {
  id: number;
  email: string;
  token: string;
  is_verified: boolean;
  username: string;
  role: 'SUPER_ADMIN' | 'ADMIN' | 'USER';
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
