'use client';

import { useRouter } from 'next/navigation';

const RouterButton = ({
  page,
  buttonString,
  color = 'bg-blue-500', // Domyślny kolor
}: {
  page: string;
  buttonString: string;
  color?: string;
}) => {
  const router = useRouter();

  const handleRedirect = (page: string) => {
    router.push(`/${page}`);
  };

  return (
    <button
      className={`${color} text-white rounded-lg p-4 hover:opacity-90 transition`}
      onClick={() => handleRedirect(page)}
    >
      {buttonString}
    </button>
  );
};

export default RouterButton;
