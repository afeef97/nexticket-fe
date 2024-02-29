import AvatarMenu from '@/components/shared/AvatarMenu';
import CheckUser from '../dashboard/(dashboard)/CheckUser';
import ParliamentProviders from '@/components/providers/ParliamentProviders';
import ParliamentSideBar from './(root)/ParliamentSideBar';

const ParliamentLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ParliamentProviders>
      <div className='flex bg-white'>
        <ParliamentSideBar />
        <CheckUser>
          <main className='w-[calc(100vw-200px)] px-[24px] py-[16px] overflow-y-auto'>
            {children}
          </main>
        </CheckUser>
        <AvatarMenu className='!absolute top-4 right-6' />
      </div>
    </ParliamentProviders>
  );
};

export default ParliamentLayout;
