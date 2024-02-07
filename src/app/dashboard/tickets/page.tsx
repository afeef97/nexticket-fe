import { Metadata } from 'next';
import PageTitle from '@/components/shared/PageTitle';

export const metadata: Metadata = {
  title: 'nexticket | Tickets',
};

const Tickets = () => {
  return (
    <>
      <PageTitle title='Tickets' />
    </>
  );
};

export default Tickets;
