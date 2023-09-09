'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function page() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  console.log('router-page', router, pathname, searchParams.get('serch'));

  return <div>page</div>;
}
