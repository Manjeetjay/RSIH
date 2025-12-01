import React from "react";
import { useAppContext } from "../../../context/AppContext";

export default function Registrations() {
  const { collegeRegistrations, approveCollegeRegistration, rejectCollegeRegistration } = useAppContext();

  return (
    <div className="page-container">
      <div className="flex items-center justify-between mb-6">
        <h2 className="section-title">Pending Registrations</h2>
      </div>

      <div className="card overflow-hidden">
        <table className="w-full">
          <thead className="bg-white/60">
            <tr>
              <th className="text-left p-4">Institution</th>
              <th className="text-left p-4">SPOC Name</th>
              <th className="text-left p-4">Email</th>
              <th className="text-left p-4">Phone</th>
              <th className="text-left p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {collegeRegistrations.length === 0 ? (
              <tr><td className="p-8 text-center muted" colSpan={5}>No pending registrations</td></tr>
            ) : (
              collegeRegistrations.map(r => (
                <tr key={r.id} className="border-t">
                  <td className="p-4">{r.institution_name}</td>
                  <td className="p-4">{r.name}</td>
                  <td className="p-4">{r.email}</td>
                  <td className="p-4">{r.phone}</td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button className="px-3 py-1 bg-green-50 text-green-700 rounded-md border" onClick={() => approveCollegeRegistration(r.id)}>Approve</button>
                      <button className="px-3 py-1 bg-red-50 text-red-700 rounded-md border" onClick={() => rejectCollegeRegistration(r.id)}>Reject</button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
