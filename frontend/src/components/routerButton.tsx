'use client';

import { useRouter } from 'next/navigation';

const RouterButton = ({ page, buttonString }: { page: string; buttonString: string }) => {
  const router = useRouter();

  const handleRedirect = (page: string) => {
    router.push(`/${page}`);
  };

  return <button className='bg-blue-500 rounded-md p-5' onClick={() => handleRedirect(page)}>{buttonString}</button>;
};

export default RouterButton;
