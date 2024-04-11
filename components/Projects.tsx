"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Tag } from "./Tag";

export function Projects() {
  const [projects, setProjects] = useState([]);

  // instad of chaining '.then()' method, the 'async/await' method is more concise and readable
  {/*
    const getProjects = () => {
      fetch("http://localhost:3000/api/projects").then((response) =>
      response.json().then((data) => {
        setProjects(data);
      })
      );
    };
*/}

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

  return (
    <div className="space-y-2">
      {projects.map((project) => (
        <div className="rounded p-2 bg-white">
          <div className="flex items-center gap-2">
            {project.tags.map((tag, key) => {
              return <Tag tag={tag} key={key} />;
            })}
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
