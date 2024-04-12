"use client";
import { useEffect, useState } from "react";
import { Tag } from "components/Tag";

// I added interface to components to avoid potential errors.
interface Project  {
  id: number;
  name: string;
  description: string;
  tags: string[]
}

interface Props {
  params: {
    id: string;
  }
}

export default function Home({ params }: Props) {
  // Now setProject state uses the interface Project
  const [project, setProject] = useState<Project | null>(null);
  // I added a loading state while waiting for the project data to fetch
  const [loading, setLoading] = useState(true);

  // instad of chaining '.then()' method, the 'async/await' I used async/await 
  // for cleaner asynchronous code in the getProject function.
  async function getProject() {
    try {
      const response = await fetch(`http://localhost:3000/api/projects/${params.id}`)
      const data = await response.json()
      setProject(data)
      setLoading(false)
    } catch (error) {
      console.error("Something went wrong fetching this project:", error)
      setLoading(false)
    }
  }

  useEffect(() => {
    getProject();
  }, []);


  if (loading) return <div>Loading...</div>;
  if (!project) return <div>Project not found</div>

  return (
    <div className="bg-slate-50 p-4 w-full h-full">
      <h1 className="text-3xl font-bold mb-8">Project: {project.name}</h1>
      <div className="flex items-center gap-2">
        {project.tags.map((tag, key) => {
          return <Tag tag={tag} key={key} />;
        })}
      </div>
      <p>Id: {project.id}</p>
      <p>{project.description}</p>
    </div>
  );
}
