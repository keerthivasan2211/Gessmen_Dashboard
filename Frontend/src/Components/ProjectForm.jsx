import React, { useState, useEffect } from "react";

export default function ProjectForm({ employees, onSubmit, initialData, onCancel }) {
  const [form, setForm] = useState({
    name: "",
    client: "",
    startDate: "",
    endDate: "",
    status: "Planned",
    assignedEmployees: []
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name || "",
        client: initialData.client || "",
        startDate: initialData.startDate ? initialData.startDate.slice(0, 10) : "",
        endDate: initialData.endDate ? initialData.endDate.slice(0, 10) : "",
        status: initialData.status || "Planned",
        assignedEmployees: (initialData.assignedEmployees || []).map(e =>
          e._id ? e._id : e
        )
      });
    } else {
      setForm({
        name: "",
        client: "",
        startDate: "",
        endDate: "",
        status: "Planned",
        assignedEmployees: []
      });
    }
  }, [initialData]);

  function toggleEmployee(id) {
    setForm(prev => {
      const exists = prev.assignedEmployees.includes(id);
      return {
        ...prev,
        assignedEmployees: exists
          ? prev.assignedEmployees.filter(x => x !== id)
          : [...prev.assignedEmployees, id]
      };
    });
  }

  function submit(e) {
    e.preventDefault();

    if (!form.name || !form.client || !form.startDate || !form.endDate) {
      alert("Please fill required fields");
      return;
    }

    const payload = {
      ...form,
      startDate: form.startDate,
      endDate: form.endDate
    };

    onSubmit(payload);
  }

  return (
    <form
      onSubmit={submit}
      className="bg-white rounded-lg shadow-md p-6 border border-gray-200 mb-6"
    >
      <h2 className="text-xl font-semibold mb-4">
        {initialData ? "Edit Project" : "Create Project"}
      </h2>

      {/* Name + Client */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          placeholder="Project Name"
          className="border px-3 py-2 rounded-md w-full focus:ring-2 focus:ring-blue-500"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          required
        />

        <input
          placeholder="Client"
          className="border px-3 py-2 rounded-md w-full focus:ring-2 focus:ring-blue-500"
          value={form.client}
          onChange={e => setForm({ ...form, client: e.target.value })}
          required
        />
      </div>

      {/* Dates */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div>
          <label className="block text-sm mb-1 font-medium">Start Date</label>
          <input
            type="date"
            className="border px-3 py-2 rounded-md w-full focus:ring-2 focus:ring-blue-500"
            value={form.startDate}
            onChange={e => setForm({ ...form, startDate: e.target.value })}
            required
          />
        </div>

        <div>
          <label className="block text-sm mb-1 font-medium">End Date</label>
          <input
            type="date"
            className="border px-3 py-2 rounded-md w-full focus:ring-2 focus:ring-blue-500"
            value={form.endDate}
            onChange={e => setForm({ ...form, endDate: e.target.value })}
            required
          />
        </div>
      </div>

      {/* Status */}
      <div className="mt-4">
        <label className="block text-sm mb-1 font-medium">Status</label>
        <select
          className="border px-3 py-2 rounded-md w-full focus:ring-2 focus:ring-blue-500"
          value={form.status}
          onChange={e => setForm({ ...form, status: e.target.value })}
        >
          <option>Planned</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>
      </div>

      {/* Employees */}
      <div className="mt-4">
        <label className="block text-sm mb-2 font-medium">Assign Employees</label>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 border p-3 rounded-lg bg-gray-50">
          {employees.map(emp => (
            <label
              key={emp._id}
              className="flex items-center gap-2 p-2 bg-white border rounded-md shadow-sm cursor-pointer hover:bg-gray-100"
            >
              <input
                type="checkbox"
                className="w-4 h-4"
                checked={form.assignedEmployees.includes(emp._id)}
                onChange={() => toggleEmployee(emp._id)}
              />
              <span>{emp.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-6 flex gap-3">
        <button
          type="submit"
          className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 shadow-md"
        >
          {initialData ? "Update Project" : "Create Project"}
        </button>

        {initialData && (
          <button
            type="button"
            onClick={onCancel}
            className="px-5 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 shadow-md"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
  