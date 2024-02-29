import AvatarMenu from '@/components/shared/AvatarMenu';
import CheckUser from '../dashboard/(dashboard)/CheckUser';
import ParliamentSideBar from './(root)/ParliamentSideBar';
import Providers from '@/components/providers/Providers';

const ParliamentLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Providers>
      <div className='flex bg-white'>
        <ParliamentSideBar />
        <CheckUser>
          <main className='w-[calc(100vw-200px)] px-[24px] py-[16px] overflow-y-auto'>
            {children}
          </main>
        </CheckUser>
        <AvatarMenu className='!absolute top-4 right-6' />
      </div>
    </Providers>
  );
};

export default ParliamentLayout;
