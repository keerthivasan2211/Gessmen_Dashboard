import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import ProjectsPage from "./pages/project";
import EmployeesPage from "./pages/Empolyee";

export default function App() {
  return (
    <div style={{ padding: 20, fontFamily: "Arial, sans-serif" }}>
      <nav style={{ marginBottom: 20 }}>
        <Link to="/" style={{ marginRight: 12 }}>Projects</Link>
        <Link to="/employees">Employees</Link>
      </nav>

      <Routes>
        <Route path="/" element={<ProjectsPage />} />
        <Route path="/employees" element={<EmployeesPage />} />
      </Routes>
    </div>
  );
}
