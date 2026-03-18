import { Suspense } from 'react';
import Header from '@/components/Header';
import Feed from '@/components/Feed';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function Home() {
  return (
    <>
      <Header />
      <main className="max-w-3xl mx-auto px-4 py-4">
        <Suspense fallback={<LoadingSpinner />}>
          <Feed />
        </Suspense>
      </main>
    </>
  );
}
