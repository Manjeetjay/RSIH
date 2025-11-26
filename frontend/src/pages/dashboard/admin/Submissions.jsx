import { useState, useEffect } from "react";
import api from "../../../services/api";
import Table, { TableRow, TableCell } from "../../../components/ui/Table";
import Button from "../../../components/ui/Button";
import Modal from "../../../components/ui/Modal";
import { FaEye, FaDownload, FaYoutube, FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";

export default function Submissions() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewingSub, setViewingSub] = useState(null);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      const res = await api.get("/api/admin/submissions");
      setSubmissions(res.data);
    } catch (err) {
      console.error(err);
      // toast.error("Failed to load submissions");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-6">
      <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-800">Submissions</h1>
        <div className="text-sm text-slate-500">
          Total Submissions: <span className="font-semibold text-slate-900">{submissions.length}</span>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <Table headers={["ID", "Team Name", "Problem Statement", "Title", "Status", "Actions"]}>
          {submissions.map((sub) => (
            <TableRow key={sub.id}>
              <TableCell>#{sub.id}</TableCell>
              <TableCell className="font-medium text-slate-900">{sub.team_name}</TableCell>
              <TableCell>
                <div className="max-w-xs truncate" title={sub.ps_title}>
                  {sub.ps_title}
                </div>
              </TableCell>
              <TableCell>
                <div className="max-w-xs truncate" title={sub.title}>
                  {sub.title}
                </div>
              </TableCell>
              <TableCell>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${sub.status === 'SELECTED' ? 'bg-green-100 text-green-700' :
                    sub.status === 'REJECTED' ? 'bg-red-100 text-red-700' :
                      'bg-yellow-100 text-yellow-700'
                  }`}>
                  {sub.status || 'Pending'}
                </span>
              </TableCell>
              <TableCell>
                <Button size="sm" variant="outline" onClick={() => setViewingSub(sub)}>
                  <FaEye /> View
                </Button>
              </TableCell>
            </TableRow>
          ))}
          {submissions.length === 0 && (
            <tr>
              <td colSpan="6" className="p-8 text-center text-slate-500">
                No submissions found.
              </td>
            </tr>
          )}
        </Table>
      </div>

      {/* View Submission Modal */}
      <Modal
        isOpen={!!viewingSub}
        onClose={() => setViewingSub(null)}
        title="Submission Details"
      >
        {viewingSub && (
          <div className="space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h3 className="text-xl font-bold text-slate-900">{viewingSub.title}</h3>
              <p className="text-slate-500 text-sm mt-1">
                Submitted by <span className="font-semibold text-slate-700">{viewingSub.team_name}</span> for PS #{viewingSub.ps_id}
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Abstract</h4>
                <p className="text-slate-700 text-sm whitespace-pre-wrap bg-slate-50 p-3 rounded border border-slate-100">
                  {viewingSub.abstract}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Description</h4>
                <p className="text-slate-700 text-sm whitespace-pre-wrap bg-slate-50 p-3 rounded border border-slate-100 max-h-60 overflow-y-auto">
                  {viewingSub.description}
                </p>
              </div>

              <div className="flex gap-3 pt-2">
                {viewingSub.ppt_url && (
                  <a
                    href={`http://localhost:5000${viewingSub.ppt_url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-2 bg-blue-50 text-blue-700 rounded hover:bg-blue-100 text-sm font-medium"
                  >
                    <FaDownload /> Download PPT
                  </a>
                )}
                {viewingSub.yt_link && (
                  <a
                    href={viewingSub.yt_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-2 bg-red-50 text-red-700 rounded hover:bg-red-100 text-sm font-medium"
                  >
                    <FaYoutube /> Watch Video
                  </a>
                )}
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
              <Button variant="ghost" onClick={() => setViewingSub(null)}>Close</Button>
            </div>
          </div>
        )}
      </Modal>
      </div>
    </div>
  );
}
