'use client';

import { Button } from '@/components/ui/button';
import HeroTitle from './HeroTitle';
import { useRouter } from 'next/navigation';

const Hero = () => {
  const router = useRouter();

  return (
    <section className='tw-min-h-screen'>
      <HeroTitle
        title='nexticket'
        subtitle='A simple help desk ticketing system'
      />

      <Button onClick={() => router.push('/register')}>Get started</Button>
    </section>
  );
};

export default Hero;
