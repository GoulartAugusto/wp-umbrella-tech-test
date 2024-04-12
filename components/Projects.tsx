"use client";
import Link from "next/link";
import { useEffect, useState, useMemo } from "react";
import { Tag } from "./Tag";

// I've defined an interface Project to specify the type of each project in the project state.
interface Project {
  id: number;
  name: string;
  tags: string[];
  url: string;
  description: string;
  userId: number;
}

export function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);

  // instad of chaining '.then()' method, the 'async/await' method is more concise and readable
  // This code uses async/await with fetch for cleaner asynchronous code
  const getProjects = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/projects")
      const data = await response.json()
      setProjects(data)
    } catch (error) {
      console.error("Something went wrong fetching projects:", error)
    }
  };

  useEffect(() => {
    getProjects();
  }, []);

  // When mapping elements, the best approach is to use unique identifiers for 'key' prop. 'project.id' is more suitable
  return (
    <div className="space-y-2">
      {projects.map((project) => (
        <div className="rounded p-2 bg-white" key={project.id}>
          <div className="flex items-center gap-2">
            {project.tags.map((tag) => (
              <Tag tag={tag} key={`${project.id}-${tag}`} />
            ))}
          </div>
          <p>
            (Id: {project.id}) Name: {project.name}
          </p>
          <Link href={`/projects/${project.id}`} className="underline">
            View project detail
          </Link>
        </div>
      ))}
    </div>
  );
}