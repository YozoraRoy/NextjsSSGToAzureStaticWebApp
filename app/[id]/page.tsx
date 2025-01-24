type PageProps = {
  params: Promise<{ id: string }>;
};

async function fetchData(id: string) {
  const data = { id };
  return data;
}

export async function generateStaticParams() {
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' }
  ];
}

const Page = async ({ params }: PageProps) => {
  const { id } = await params;
  const data = await fetchData(id);

  return (
    <div>
      <h1>Dynamic Page</h1>
      <p>ID: {data.id}</p>
    </div>
  );
};

export default Page;