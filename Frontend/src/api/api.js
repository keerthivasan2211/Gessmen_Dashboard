// frontend/src/api.js
const API = "http://localhost:3000/api";

export async function fetchEmployees() {
  const res = await fetch(`${API}/employees`);
  return res.json();
}

export async function addEmployee(data) {
  const res = await fetch(`${API}/employees`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return res.json();
}

export async function fetchProjects(status) {
  const url = status ? `${API}/projects?status=${encodeURIComponent(status)}` : `${API}/projects`;
  const res = await fetch(url);
  return res.json();
}

export async function addProject(data) {
  const res = await fetch(`${API}/projects`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return res.json();
}

export async function updateProject(id, data) {
  const res = await fetch(`${API}/projects/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return res.json();
}

export async function deleteProject(id) {
  const res = await fetch(`${API}/projects/${id}`, { method: "DELETE" });
  return res.json();
}
