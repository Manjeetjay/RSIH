import React, { useState } from "react";
import { useAppContext } from "../../../context/AppContext";

export default function ProblemStatements() {
  const { problemStatements, addProblemStatement, updateProblemStatement, deleteProblemStatement } = useAppContext();
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ title: "", description: "", type: "Software", category: "Technology" });

  const startCreate = () => { setEditing(null); setForm({ title: "", description: "", type: "Software", category: "Technology" }); setShowForm(true); }
  const startEdit = (p) => { setEditing(p); setForm({ title: p.title, description: p.description, type: p.type || 'Software', category: p.category || 'Technology' }); setShowForm(true); }

  const submit = async (e) => {
    e && e.preventDefault();
    if (editing) {
      await updateProblemStatement(editing.id, form);
    } else {
      await addProblemStatement(form);
    }
    setShowForm(false);
  }

  return (
    <div className="page-container">
      <div className="flex items-center justify-between mb-6">
        <h2 className="section-title">Problem Statements</h2>
        <button className="btn-primary" onClick={startCreate}>{showForm ? 'Close' : '+ Create'}</button>
      </div>

      {showForm && (
        <form onSubmit={submit} className="card p-6 mb-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium muted">Title</label>
              <input className="input mt-1" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
            </div>
            <div>
              <label className="block text-sm font-medium muted">Type</label>
              <select className="input mt-1" value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
                <option>Software</option>
                <option>Hardware</option>
                <option>Student Innovation</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium muted">Description</label>
              <textarea className="input mt-1" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={6} />
            </div>
            <div>
              <label className="block text-sm font-medium muted">Category</label>
              <select className="input mt-1" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                <option>Technology</option>
                <option>Healthcare</option>
                <option>Agriculture</option>
                <option>Education</option>
                <option>Environment</option>
                <option>Finance</option>
                <option>Transportation</option>
                <option>Other</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <button type="submit" className="btn-primary">{editing ? 'Update' : 'Create'}</button>
            </div>
          </div>
        </form>
      )}

      <div className="card overflow-hidden">
        <table className="w-full">
          <thead className="bg-white/60">
            <tr>
              <th className="text-left p-4">ID</th>
              <th className="text-left p-4">Title</th>
              <th className="text-left p-4">Category</th>
              <th className="text-left p-4">Type</th>
              <th className="text-left p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {problemStatements.map(p => (
              <tr key={p.id} className="border-t">
                <td className="p-4">{p.id}</td>
                <td className="p-4 font-semibold">{p.title}</td>
                <td className="p-4">{p.category}</td>
                <td className="p-4">{p.type}</td>
                <td className="p-4">
                  <div className="flex gap-2">
                    <button className="px-3 py-1 bg-white rounded-md border" onClick={() => startEdit(p)}>Edit</button>
                    <button className="px-3 py-1 bg-red-50 text-red-700 rounded-md border" onClick={() => deleteProblemStatement(p.id)}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
