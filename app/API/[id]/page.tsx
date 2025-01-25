type Todo = {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
  };
  
  async function fetchData(id: string): Promise<Todo> {
    const baseUrl = 'https://jsonplaceholder.typicode.com/todos';
    const url = `${baseUrl}/${id}`;
    
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await res.json();
    return data;
  }
  
  export async function generateStaticParams() {
    // Create array of numbers from 1 to 200
    const ids = Array.from({ length: 200 }, (_, i) => (i + 1).toString());
    
    // Map to generate static params
    return ids.map(id => ({
      id: id
    }));
  }
  
  type Params = Promise<{ id: string }>;

  const Page = async ({ params }: { params: Params }) => {
    const { id } = await params;
    const data = await fetchData(id);
  
    return (
      <div>
        <h1>Static Site Generated Page for ID: {id}</h1>
        <p>User ID: {data.userId}</p>
        <p>ID: {data.id}</p>
        <p>Title: {data.title}</p>
        <p>Completed: {data.completed ? 'Yes' : 'No'}</p>
      </div>
    );
  };
  
  export default Page;