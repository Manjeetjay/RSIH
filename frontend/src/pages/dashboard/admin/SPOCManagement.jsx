import React, { useState } from "react";
import { useAppContext } from "../../../context/AppContext";

export default function SPOCManagement(){
  const { spocCredentials, addSPOCCredential, updateSPOCCredential, deleteSPOCCredential } = useAppContext();
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ collegeName: '', spocName: '', email: '', password: '', phone: '', address: '' });

  const startCreate = () => { setEditing(null); setForm({ collegeName: '', spocName: '', email: '', password: '', phone: '', address: '' }); setShowForm(true); }
  const startEdit = (s) => { setEditing(s); setForm({ collegeName: s.collegeName || '', spocName: s.spocName || '', email: s.email || '', password: s.password || '', phone: s.phone || '', address: s.address || '' }); setShowForm(true); }

  const submit = async (e) => { e && e.preventDefault(); if(editing){ await updateSPOCCredential(editing.id, form); } else { await addSPOCCredential(form); } setShowForm(false); }

  return (
    <div className="page-container">
      <div className="flex items-center justify-between mb-6">
        <h2 className="section-title">SPOC Management</h2>
        <button className="btn-primary" onClick={startCreate}>{showForm? 'Close' : '+ Add SPOC'}</button>
      </div>

      {showForm && (
        <form onSubmit={submit} className="card p-6 mb-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium muted">College Name</label>
              <input className="input mt-1" value={form.collegeName} onChange={e=>setForm({...form, collegeName:e.target.value})} required />
            </div>
            <div>
              <label className="block text-sm font-medium muted">SPOC Name</label>
              <input className="input mt-1" value={form.spocName} onChange={e=>setForm({...form, spocName:e.target.value})} required />
            </div>
            <div>
              <label className="block text-sm font-medium muted">Email</label>
              <input className="input mt-1" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} required />
            </div>
            <div>
              <label className="block text-sm font-medium muted">Password</label>
              <input className="input mt-1" value={form.password} onChange={e=>setForm({...form, password:e.target.value})} required />
            </div>
            <div>
              <label className="block text-sm font-medium muted">Phone</label>
              <input className="input mt-1" value={form.phone} onChange={e=>setForm({...form, phone:e.target.value})} />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium muted">Address</label>
              <textarea className="input mt-1" value={form.address} onChange={e=>setForm({...form, address:e.target.value})} rows={3} />
            </div>
            <div className="md:col-span-2">
              <button className="btn-primary" type="submit">{editing? 'Update' : 'Create'}</button>
            </div>
          </div>
        </form>
      )}

      <div className="card overflow-hidden">
        <table className="w-full">
          <thead className="bg-white/60">
            <tr>
              <th className="text-left p-4">College</th>
              <th className="text-left p-4">SPOC</th>
              <th className="text-left p-4">Email</th>
              <th className="text-left p-4">Teams</th>
              <th className="text-left p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {spocCredentials.map(s=> (
              <tr key={s.id} className="border-t">
                <td className="p-4">{s.collegeName}</td>
                <td className="p-4">{s.spocName}</td>
                <td className="p-4">{s.email}</td>
                <td className="p-4">{s.teams || 0}</td>
                <td className="p-4">
                  <div className="flex gap-2">
                    <button className="px-3 py-1 bg-white rounded-md border" onClick={()=>startEdit(s)}>Edit</button>
                    <button className="px-3 py-1 bg-red-50 text-red-700 rounded-md border" onClick={()=>deleteSPOCCredential(s.id)}>Delete</button>
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
