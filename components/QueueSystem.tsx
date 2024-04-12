"use client";
import { useEffect, useState } from "react";

interface Project {
    id: number;
    name: string;
    url: string;
    status: string; // Add the status field to check project status
  }

export default function QueueSystem() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    // Mocked data for testing purposes
    const mockData: Project[] = [
      {
        id: 1,
        name: "Project 1",
        url: "https://wp-umbrella.com",
        status: "Up"
      },
      {
        id: 2,
        name: "Project 2",
        url: "https://imageseo.io",
        status: "Up"
      },
      {
        id: 3,
        name: "Project 3",
        url: "https://wp-umbrella.com",
        status: "Up"
      },
      {
        id: 4,
        name: "Project 4",
        url: "https://wp-umbrella.com",
        status: "Down"
      },
    ];
    setProjects(mockData);

    // Start a ping every 2 minutes
    const intervalId = setInterval(pingProjects, 2 * 60 * 1000);

    // Clear on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const pingProjects = () => {
    projects.forEach((project) => {
      fetch(project.url)
        .then((response) => {
          if (response.ok) {
            project.status = "Up"; // Update project status if ping status is "Up"
          } else {
            project.status = "Down"; // Update project status if ping status is "Down"
          }
          setProjects([...projects]); // Update state and re-render
        })
        .catch((error) => {
          console.error(`Found a error when pinging ${project.name}:`, error);
          project.status = "Down"; // Update project status if ping found an error
          setProjects([...projects]); // Update state and re-render
        });
    });
  };

  const getStatus = (status: string) => {
    return status === "Up" ? "text-green-600" : "text-red-600";
  };

  return (
    <div className="mt-4">
      <h1 className="mb-2">Queue of projects status</h1>
      <ul>
        {projects.map((project) => (
          <li key={project.id} className="mb-2">
            {project.name} - <span className={`mb-2 ${getStatus(project.status)}`}>Status: {project.status}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
