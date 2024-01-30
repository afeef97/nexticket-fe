import dynamic from 'next/dynamic';

const NotifyCreateApikey = dynamic(
  () => import('./(dashboard)/NotifyCreateApikey'),
  {
    ssr: false,
  }
);

const Dashboard = async () => {
  return (
    <>
      <NotifyCreateApikey />
      <p>Dashboard</p>
    </>
  );
};

export default Dashboard;
