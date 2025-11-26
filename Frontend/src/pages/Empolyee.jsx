import React, { useState, useEffect } from "react";
import { fetchEmployees, addEmployee } from "../api/api.js";

export default function EmployeesPage() {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", role: "" });

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const data = await fetchEmployees();
    setEmployees(data);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await addEmployee(form);
    setForm({ name: "", email: "", role: "" });
    load();
  }

  return (
    <div className="p-6">
      {/* Page title */}
      <h2 className="text-2xl font-bold mb-5">Employee Management</h2>

      {/* Form Card */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md border mb-6 max-w-xl"
      >
        <h3 className="text-lg font-semibold mb-4">Add Employee</h3>

        <div className="grid grid-cols-1 gap-4">
          <input
            placeholder="Name"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            required
            className="border px-3 py-2 rounded-md w-full focus:ring-2 focus:ring-blue-500"
          />

          <input
            placeholder="Email"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            required
            className="border px-3 py-2 rounded-md w-full focus:ring-2 focus:ring-blue-500"
          />

          <input
            placeholder="Role"
            value={form.role}
            onChange={e => setForm({ ...form, role: e.target.value })}
            required
            className="border px-3 py-2 rounded-md w-full focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="mt-4 px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 shadow-md"
        >
          Add Employee
        </button>
      </form>

      {/* Employees Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 rounded-lg shadow-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Role</th>
            </tr>
          </thead>

          <tbody>
            {employees.map((emp, index) => (
              <tr
                key={emp._id}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <td className="px-4 py-2 border">{emp.name}</td>
                <td className="px-4 py-2 border">{emp.email}</td>
                <td className="px-4 py-2 border">{emp.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
