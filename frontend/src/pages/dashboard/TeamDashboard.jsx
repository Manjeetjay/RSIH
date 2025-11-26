import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import Table, { TableRow, TableCell } from "../../components/ui/Table";
import Button from "../../components/ui/Button";
import { FaPlus, FaEye, FaDownload, FaYoutube } from "react-icons/fa";
import { toast } from "react-toastify";

export default function TeamDashboard() {
  const [activeTab, setActiveTab] = useState("problems"); // 'problems' or 'submission'
  const [problems, setProblems] = useState([]);
  const [submission, setSubmission] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [psRes, subRes] = await Promise.all([
        api.get("/api/team/ps"),
        api.get("/api/team/submissions") // This returns an array, but we expect single submission
      ]);
      setProblems(psRes.data);
      // subRes.data is an array of submissions. Team can have only 1.
      if (subRes.data && subRes.data.length > 0) {
        setSubmission(subRes.data[0]);
      }
    } catch (err) {
      console.error(err);
      // toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-6">
      <div className="space-y-6 max-w-6xl mx-auto">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-slate-800">Team Dashboard</h1>
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab("problems")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === "problems"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-slate-600 hover:bg-slate-50"
                }`}
            >
              Available Problems
            </button>
            <button
              onClick={() => setActiveTab("submission")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === "submission"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-slate-600 hover:bg-slate-50"
                }`}
            >
              My Submission
            </button>
          </div>
        </div>

      {activeTab === "problems" ? (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-200">
            <h2 className="text-lg font-semibold text-slate-800">Problem Statements</h2>
          </div>
          <Table headers={["ID", "Title", "Category", "Type", "Action"]}>
            {problems.map((p) => (
              <TableRow key={p.id}>
                <TableCell>#{p.id}</TableCell>
                <TableCell className="font-medium text-slate-900">{p.title}</TableCell>
                <TableCell>{p.category}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${p.type === "Software" ? "bg-blue-100 text-blue-700" : "bg-orange-100 text-orange-700"
                    }`}>
                    {p.type}
                  </span>
                </TableCell>
                <TableCell>
                  {submission ? (
                    <span className="text-xs text-slate-500">Already Submitted</span>
                  ) : (
                    <Link to={`/dashboard/team/submit?psId=${p.id}`}>
                      <Button size="sm" variant="outline">
                        Submit Idea
                      </Button>
                    </Link>
                  )}
                </TableCell>
              </TableRow>
            ))}
            {problems.length === 0 && (
              <tr>
                <td colSpan="5" className="p-8 text-center text-slate-500">
                  No problem statements available.
                </td>
              </tr>
            )}
          </Table>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          {submission ? (
            <div className="space-y-6">
              <div className="border-b border-slate-200 pb-4">
                <h2 className="text-xl font-bold text-slate-900">{submission.title}</h2>
                <p className="text-slate-500 text-sm mt-1">
                  Submitted for PS #{submission.ps_id}: {submission.ps_title}
                </p>
                <div className="mt-4 flex gap-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${submission.status === 'SELECTED' ? 'bg-green-100 text-green-700' :
                      submission.status === 'REJECTED' ? 'bg-red-100 text-red-700' :
                        'bg-yellow-100 text-yellow-700'
                    }`}>
                    Status: {submission.status || 'Pending Review'}
                  </span>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-semibold text-slate-900 mb-2">Abstract</h3>
                  <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-wrap">
                    {submission.abstract}
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-2">Description</h3>
                  <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-wrap">
                    {submission.description}
                  </p>
                </div>
              </div>

              <div className="flex gap-4 pt-4 border-t border-slate-200">
                {submission.ppt_url && (
                  <a
                    href={`http://localhost:5000${submission.ppt_url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
                  >
                    <FaDownload /> Download PPT
                  </a>
                )}
                {submission.yt_link && (
                  <a
                    href={submission.yt_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors"
                  >
                    <FaYoutube /> Watch Video
                  </a>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaLightbulb className="text-slate-400 text-2xl" />
              </div>
              <h3 className="text-lg font-medium text-slate-900">No Submission Yet</h3>
              <p className="text-slate-500 mt-2 mb-6">
                You haven't submitted an idea for any problem statement.
              </p>
              <Button onClick={() => setActiveTab("problems")}>
                Browse Problems
              </Button>
            </div>
          )}
        </div>
      )}
      </div>
    </div>
  );
}
