import React, { useState, useEffect } from "react";
import { fetchProjects, addProject, updateProject, deleteProject, fetchEmployees } from "../api/api.js";
import ProjectForm from "../Components/ProjectForm.jsx";

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [editing, setEditing] = useState(null);
  const [filterStatus, setFilterStatus] = useState("");

  useEffect(() => {
    load();
    loadEmployees();
  }, [filterStatus]);

  async function load() {
    const data = await fetchProjects(filterStatus || undefined);
    setProjects(data);
  }

  async function loadEmployees() {
    const data = await fetchEmployees();
    setEmployees(data);
  }

  async function handleCreate(projectData) {
    await addProject(projectData);
    setEditing(null);
    load();
  }

  async function handleUpdate(id, data) {
    await updateProject(id, data);
    setEditing(null);
    load();
  }

  async function handleDelete(id) {
    if (!confirm("Delete project?")) return;
    await deleteProject(id);
    load();
  }

  return (
    <div className="p-6">
      {/* Title */}
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Projects Dashboard</h2>

      {/* Filter Section */}
      <div className="mb-4 flex items-center gap-3">
        <label className="text-gray-600 font-medium">Filter by status:</label>
        <select
          value={filterStatus}
          onChange={e => setFilterStatus(e.target.value)}
          className="border px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All</option>
          <option value="Planned">Planned</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      {/* Project Form */}
      <ProjectForm
        employees={employees}
        onSubmit={editing ? (data) => handleUpdate(editing._id, data) : handleCreate}
        initialData={editing}
        onCancel={() => setEditing(null)}
      />

      {/* Table Card */}
      <div className="mt-6 bg-white shadow-md rounded-lg border border-gray-200 p-4">
        <h3 className="text-lg font-semibold mb-4">Projects List</h3>

        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 border text-left">Name</th>
                <th className="p-3 border text-left">Client</th>
                <th className="p-3 border text-left">Start</th>
                <th className="p-3 border text-left">End</th>
                <th className="p-3 border text-left">Status</th>
                <th className="p-3 border text-left">Employees</th>
                <th className="p-3 border text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map(p => (
                <tr key={p._id} className="hover:bg-gray-50">
                  <td className="p-3 border">{p.name}</td>
                  <td className="p-3 border">{p.client}</td>
                  <td className="p-3 border">{new Date(p.startDate).toLocaleDateString()}</td>
                  <td className="p-3 border">{new Date(p.endDate).toLocaleDateString()}</td>
                  <td className="p-3 border">
                    <span
                      className={`px-2 py-1 rounded text-white text-sm ${
                        p.status === "Completed"
                          ? "bg-green-600"
                          : p.status === "In Progress"
                          ? "bg-blue-600"
                          : "bg-gray-500"
                      }`}
                    >
                      {p.status}
                    </span>
                  </td>

                  <td className="p-3 border">
                    {(p.assignedEmployees || [])
                      .map(emp => emp.name || emp)
                      .join(", ")}
                  </td>

                  <td className="p-3 border flex gap-2">
                    <button
                      onClick={() => setEditing(p)}
                      className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(p._id)}
                      className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

              {projects.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center p-4 text-gray-500">
                    No projects found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
