// Incremental Static Regeneration (ISR) Example page

"use client";

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

const CACHE_TIME = 10; // cache time in seconds
const FETCH_INTERVAL = 10000; // constant to fetch data every 10 seconds


async function fetchData(id: string): Promise<Todo> {
  const baseUrl = 'https://jsonplaceholder.typicode.com/todos';
  const url = `${baseUrl}/${id}`;
  
  const res = await fetch(url, {
    headers: {
        'Cache-Control': `s-maxage=${CACHE_TIME}, stale-while-revalidate`
      }
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  const data = await res.json();
  return data;
}

const PageContent = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get('id') || '1';
  const [data, setData] = useState<Todo | null>(null);

  useEffect(() => {
    const fetchDataInterval = () => {
      fetchData(id).then(setData).catch(console.error);
    };

    fetchDataInterval(); // Initial fetch
    const interval = setInterval(fetchDataInterval, FETCH_INTERVAL); // Fetch every 10 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [id]);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Static Site Generated Page</h1>
      <p>User ID: {data.userId}</p>
      <p>ID: {data.id}</p>
      <p>Title: {data.title}</p>
      <p>Completed: {data.completed ? 'Yes' : 'No'}</p>
    </div>
  );
};

const Page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PageContent />
    </Suspense>
  );
};

export default Page;