import React from "react";
import { useAppContext } from "../../../context/AppContext";

export default function Submissions(){
  const { teamSubmissions } = useAppContext();

  return (
    <div className="page-container">
      <div className="flex items-center justify-between mb-6">
        <h2 className="section-title">All Submissions</h2>
      </div>

      <div className="card overflow-hidden">
        <table className="w-full">
          <thead className="bg-white/60">
            <tr>
              <th className="text-left p-4">ID</th>
              <th className="text-left p-4">Title</th>
              <th className="text-left p-4">Team</th>
              <th className="text-left p-4">Problem</th>
              <th className="text-left p-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {teamSubmissions.length === 0 ? (
              <tr><td className="p-8 text-center muted" colSpan={5}>No submissions yet</td></tr>
            ) : (
              teamSubmissions.map(s=> (
                <tr key={s.id} className="border-t">
                  <td className="p-4">{s.id}</td>
                  <td className="p-4 font-semibold">{s.title}</td>
                  <td className="p-4">{s.team_name || s.teamName}</td>
                  <td className="p-4">{s.ps_title || s.problemTitle}</td>
                  <td className="p-4">{s.status}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
