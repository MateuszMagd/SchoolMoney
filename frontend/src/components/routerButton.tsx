'use client';

import { useRouter } from 'next/navigation';

const RouterButton = ({
  page,
  buttonString,
  color = 'bg-blue-500', 
  width = 'w-auto', 
  height = 'h-auto', 
}: {
  page: string;
  buttonString: string;
  color?: string;
  width?: string;
  height?: string;
}) => {
  const router = useRouter();

  const handleRedirect = (page: string) => {
    router.push(`/${page}`);
  };

  return (
    <button
      className={`${color} ${width} ${height} text-white rounded-lg hover:opacity-90 transition`}
      onClick={() => handleRedirect(page)}
    >
      {buttonString}
    </button>
  );
};

export default RouterButton;
