import AvatarMenu from '@/components/shared/AvatarMenu';
import ParliamentSideBar from './(root)/ParliamentSideBar';

const ParliamentLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex bg-white'>
      <ParliamentSideBar />
      {children}
      <AvatarMenu className='!absolute top-4 right-6' />
    </div>
  );
};

export default ParliamentLayout;
