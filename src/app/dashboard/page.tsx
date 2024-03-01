import { Metadata } from 'next';
import PageTitle from '@/components/shared/PageTitle';
import TicketPriority from './(dashboard)/TicketPriority';
import TicketTotal from './(dashboard)/TicketTotal';
import TicketTypes from './(dashboard)/TicketTypes';
import dynamic from 'next/dynamic';
import { getTicketSummary } from './actions';

const NotifyCreateApikey = dynamic(
  () => import('./(dashboard)/NotifyCreateApikey'),
  {
    ssr: false,
  }
);

export const metadata: Metadata = {
  title: 'nexticket | Dashboard',
};

const Dashboard = async () => {
  const getTicketsResponse = await getTicketSummary();

  return (
    <>
      <PageTitle title='Dashboard' />

      <NotifyCreateApikey />
      <div className='flex flex-col gap-2 flex-wrap'>
        <TicketTotal getTicketsResponse={getTicketsResponse} />
        <div className='flex flex-col md:flex-row gap-2'>
          <TicketTypes getTicketsResponse={getTicketsResponse} />
          <TicketPriority getTicketsResponse={getTicketsResponse} />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
