// app/ssr-page/page.tsx

export async function generateStaticParams(): Promise<Array<{ id: string }>> {
    return [{ id: '1' }]; 
  }
  
  export default async function Page({ params }: { params: Promise<{ id?: string }> }) {
 
    const defaultId = '1';
    const { id = defaultId } = await params;
    
    let userData;
  
    try {
      const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);
      if (!res.ok) throw new Error('Failed to fetch data');
      userData = await res.json();
    } catch (error) {
      console.error('Error fetching data:', error);
      userData = { title: 'Fallback Title', id: id };
    }
  
    return (
      <div>
        <h1>SSG Page for ID: {id}</h1>
        <p>Your data is: {userData.title}</p>
      </div>
    );
  }