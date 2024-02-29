import AvatarMenu from '@/components/shared/AvatarMenu';
import CheckUser from './(dashboard)/CheckUser';
import Navigation from './(dashboard)/Navigation';
import Providers from '@/components/providers/Providers';

const DashboardLayout = async ({
  children,
}: {
  children: React.ReactElement;
}) => {
  return (
    <Providers>
      <div className='relative md:grid grid-cols-[auto_1fr] min-[2160px]:max-w-[2160px] min-[2160px]:mx-auto'>
        <Navigation />
        <main>
          <div className='min-h-[calc(100vh-4rem)] py-2 md:py-4 px-3 md:px-6'>
            <CheckUser>{children}</CheckUser>
          </div>
        </main>
        <AvatarMenu className='!absolute top-4 right-6 hidden md:block' />
      </div>
    </Providers>
  );
};

export default DashboardLayout;
