import AvatarMenu from '@/components/shared/AvatarMenu';
import CheckUser from './(dashboard)/CheckUser';
import Navigation from './(dashboard)/Navigation';
import Providers from '@/components/shared/Providers';

const DashboardLayout = async ({
  children,
}: {
  children: React.ReactElement;
}) => {
  return (
    <Providers>
      <div className='tw-relative md:tw-grid tw-grid-cols-[auto_1fr] min-[2160px]:tw-max-w-[2160px] min-[2160px]:tw-mx-auto'>
        <Navigation />
        <main>
          <div className='tw-min-h-[calc(100vh-4rem)] tw-py-2 md:tw-py-4 tw-px-3 md:tw-px-6'>
            <CheckUser>{children}</CheckUser>
          </div>
        </main>
        <AvatarMenu className='!tw-absolute tw-top-4 tw-right-6 tw-hidden md:tw-block' />
      </div>
    </Providers>
  );
};

export default DashboardLayout;
