'use server';

import fetchNexticket from '@/lib/customFetch';

export const getUserAccount = async () => {
  return await fetchNexticket('/users/my-account', {
    useToken: true,
    options: {
      credentials: 'include',
      next: {
        tags: ['user-account'],
        revalidate: 300,
      },
    },
  });
};

export const getOrganization = async () => {
  return await fetchNexticket('/organization', {
    options: {
      credentials: 'include',
      next: {
        tags: ['organization'],
        revalidate: 300,
      },
    },
  });
};

export const getTickets = async () => {
  const response = await fetchNexticket('/ticket', {
    options: {},
  });

  let totalTickets: number = 0;
  const categoriesMap: Map<string, number> = new Map();
  const priorityMap: Map<string, number> = new Map();

  if (response.ok) {
    totalTickets = response.data.data.length;
    response.data.data.map((ticket: any) => {
      if (!priorityMap.has(ticket.priority) && ticket.priority) {
        priorityMap.set(ticket.priority, 1);
      } else if (priorityMap.has(ticket.priority)) {
        priorityMap.set(
          ticket.priority,
          (priorityMap.get(ticket.priority) as number) + 1
        );
      }

      if (!categoriesMap.has(ticket.category)) {
        categoriesMap.set(ticket.category, 1);
      } else if (categoriesMap.has(ticket.category)) {
        categoriesMap.set(
          ticket.category,
          (categoriesMap.get(ticket.category) as number) + 1
        );
      }
    });
  }

  return {
    ok: response.ok,
    data: {
      ...response.data,
      totalTickets,
      categories: categoriesMap,
      priorities: priorityMap,
    },
  };
};