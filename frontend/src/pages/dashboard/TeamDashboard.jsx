import { useEffect, useState } from "react";
import api from "../../services/api";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button";

export default function TeamDashboard() {
  const navigate = useNavigate();
  const [ps, setPs] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [teamId, setTeamId] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [psRes, subsRes, teamRes] = await Promise.all([
        api.get("/api/team/ps"),
        api.get("/api/team/submissions").catch(() => ({ data: [] })),
        api.get("/api/team/team").catch(() => ({ data: null }))
      ]);
      setPs(psRes.data);
      setSubmissions(subsRes.data || []);
      if (teamRes.data) setTeamId(teamRes.data.id);
    } catch (err) {
      toast.error("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  const hasSubmissionForPS = (psId) => {
    return submissions.some(sub => sub.ps_id === psId);
  };

  if (loading) return <div className="p-12 text-center text-slate-500">Loading dashboard...</div>;

  const hasSubmission = submissions.length > 0;

  return (
    <div className="page-container">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-slate-800 mb-2">Team Leader Dashboard</h1>
          <p className="text-slate-600">Manage your team's ideas and submissions.</p>
        </motion.div>

        {/* Submission Limit Notice */}
        {hasSubmission && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-8 p-4 bg-sky-50 border-l-4 border-sky-500 rounded-lg"
          >
            <div className="flex items-start gap-3">
              <h3 className="font-bold text-sky-900 mb-1">Submission Limit Reached</h3>
              <p className="text-sky-800 text-sm">
                Your team has already submitted an idea. Each team can only submit one idea for the hackathon.
              </p>
            </div>
          </motion.div>
        )}

        {/* Submissions Section */}
        {submissions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-semibold text-slate-800 mb-6">My Submission</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {submissions.map((sub, index) => (
                <motion.div
                  key={sub.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="card p-6 bg-white shadow-lg rounded-xl border border-slate-100 hover:shadow-xl transition-shadow cursor-pointer group"
                  onClick={() => navigate(`/dashboard/team/submission/${sub.id}`)}
                >
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-slate-400 font-mono text-sm">PS #{sub.ps_id}</span>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${sub.status === "SUBMITTED" ? "bg-blue-100 text-blue-700" : "bg-green-100 text-green-700"
                      }`}>
                      {sub.status}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-blue-700 transition-colors line-clamp-2">
                    {sub.title}
                  </h3>
                  <p className="text-slate-600 text-sm line-clamp-3 mb-4">
                    {sub.abstract}
                  </p>
                  <Button variant="outline" className="w-full justify-center">
                    View Details
                  </Button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Available PS Section */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-slate-800">Available Problem Statements</h2>
          <Button
            onClick={() => navigate("/dashboard/team/submit")}
            disabled={hasSubmission}
            className={hasSubmission ? "opacity-50 cursor-not-allowed" : ""}
          >
            {hasSubmission ? "✓ Already Submitted" : "+ Submit New Idea"}
          </Button>
        </div>

        <div className="card overflow-hidden bg-white shadow-lg rounded-xl border border-slate-100">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left p-4 font-semibold text-slate-600">PS ID</th>
                <th className="text-left p-4 font-semibold text-slate-600">Title</th>
                <th className="text-left p-4 font-semibold text-slate-600">Category</th>
                <th className="text-left p-4 font-semibold text-slate-600">Type</th>
                <th className="text-left p-4 font-semibold text-slate-600">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {ps.map((p) => {
                const hasSubmittedForPS = hasSubmissionForPS(p.id);
                return (
                  <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 text-slate-600 font-mono text-sm">#{p.id}</td>
                    <td className="p-4 font-medium text-slate-900">{p.title}</td>
                    <td className="p-4 text-slate-600">
                      <span className="px-2 py-1 bg-slate-100 rounded text-xs font-medium">
                        {p.category}
                      </span>
                    </td>
                    <td className="p-4 text-slate-600">{p.type}</td>
                    <td className="p-4">
                      {hasSubmittedForPS ? (
                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">
                          Submitted
                        </span>
                      ) : hasSubmission ? (
                        <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-xs font-medium">
                          Limit Reached
                        </span>
                      ) : (
                        <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded text-xs font-medium">
                          Available
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
