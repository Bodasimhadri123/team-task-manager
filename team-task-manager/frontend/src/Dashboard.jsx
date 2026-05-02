import { useState, useEffect } from "react";
import axios from "axios";

export default function Dashboard() {
  const [name, setName] = useState("");
  const [projects, setProjects] = useState([]);

  // GET PROJECTS
  const getProjects = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/projects");
      setProjects(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getProjects();
  }, []);

  // CREATE PROJECT
  const createProject = async () => {
    if (!name) {
      alert("Enter project name");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/projects", { name });

      setName("");
      getProjects();
    } catch (err) {
      console.log(err);
      alert("Error creating project");
    }
  };

  // DELETE PROJECT
  const deleteProject = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/projects/${id}`);
      getProjects();
    } catch (err) {
      console.log(err);
      alert("Error deleting project");
    }
  };

  return (
    <div>
      <h2>Dashboard Working ✅</h2>

      <h3>Create Project</h3>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Project name"
      />
      <button onClick={createProject}>Add</button>

      <h3>Projects</h3>

      {projects.map((p) => (
        <div key={p._id}>
          <h4>{p.name}</h4>
          <button onClick={() => deleteProject(p._id)}>Delete</button>
        </div>
      ))}

      <button
        onClick={() => {
          localStorage.removeItem("token");
          window.location.href = "/";
        }}
      >
        Logout
      </button>
    </div>
  );
}