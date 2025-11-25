import { useEffect, useState } from "react";
import api from "../../services/api";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button";

export default function SpocDashboard() {
  const navigate = useNavigate();
  const [teams, setTeams] = useState([]);
  const [college, setCollege] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [teamsRes, collegeRes] = await Promise.all([
        api.get("/api/spoc/teams"),
        api.get("/api/spoc/college")
      ]);
      setTeams(teamsRes.data);
      setCollege(collegeRes.data);
    } catch (err) {
      toast.error("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="p-12 text-center text-slate-500">Loading dashboard...</div>;

  const teamLimit = 15;
  const hasReachedLimit = teams.length >= teamLimit;

  return (
    <div className="page-container">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-slate-800 mb-2">SPOC Dashboard</h1>
          <p className="text-slate-600">Manage teams for {college?.name || "your institution"}</p>
        </motion.div>

        {/* Team Limit Notice */}
        {hasReachedLimit && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-8 p-4 bg-sky-50 border-l-4 border-sky-500 rounded-lg"
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl">⚠️</span>
              <div>
                <h3 className="font-bold text-sky-900 mb-1">Team Registration Limit Reached</h3>
                <p className="text-sky-800 text-sm">
                  You have registered {teams.length} teams. Each SPOC can register a maximum of {teamLimit} teams.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-slate-800">
            Registered Teams ({teams.length}/{teamLimit})
          </h2>
          <Button
            onClick={() => navigate("/dashboard/spoc/teams/register")}
            disabled={hasReachedLimit}
            className={hasReachedLimit ? "opacity-50 cursor-not-allowed" : ""}
          >
            {hasReachedLimit ? `✓ Limit Reached (${teamLimit}/${teamLimit})` : "+ Register New Team"}
          </Button>
        </div>

        {teams.length === 0 ? (
          <div className="card p-12 text-center bg-white shadow-lg rounded-xl border border-slate-100">
            <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">
              👥
            </div>
            <h3 className="text-xl font-semibold text-slate-800 mb-2">No Teams Yet</h3>
            <p className="text-slate-500 mb-6">Start by registering your first team for the hackathon.</p>
            <Button onClick={() => navigate("/dashboard/spoc/teams/register")}>
              Register Team
            </Button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teams.map((team, index) => (
              <motion.div
                key={team.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="card p-6 bg-white shadow-lg rounded-xl border border-slate-100 hover:shadow-xl transition-shadow cursor-pointer group"
                onClick={() => navigate(`/dashboard/spoc/teams/${team.id}`)}
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-slate-800 group-hover:text-blue-700 transition-colors">
                    {team.name}
                  </h3>
                  <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-semibold">
                    Active
                  </span>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-slate-600">
                    <span className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-sm">👤</span>
                    <div>
                      <p className="text-xs text-slate-400 uppercase tracking-wider">Leader</p>
                      <p className="font-medium">{team.leader_name}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-slate-600">
                    <span className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-sm">📧</span>
                    <div>
                      <p className="text-xs text-slate-400 uppercase tracking-wider">Email</p>
                      <p className="font-medium text-sm">{team.leader_email}</p>
                    </div>
                  </div>
                </div>

                <Button variant="outline" className="w-full justify-center">
                  View Details
                </Button>
              </motion.div>
            ))}
          </div>
        )}

        {/* Stats */}
        {teams.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-12 grid md:grid-cols-3 gap-6"
          >
            <div className="card p-6 bg-blue-600 text-white rounded-xl shadow-lg">
              <p className="text-4xl font-bold mb-1">{teams.length}</p>
              <p className="text-blue-100 font-medium">Total Teams Registered</p>
            </div>
            <div className="card p-6 bg-white border border-slate-100 rounded-xl shadow-md">
              <p className="text-4xl font-bold text-slate-800 mb-1">{college?.name ? 1 : 0}</p>
              <p className="text-slate-500 font-medium">Institutions Managed</p>
            </div>
            <div className="card p-6 bg-white border border-slate-100 rounded-xl shadow-md">
              <p className="text-4xl font-bold text-green-600 mb-1">100%</p>
              <p className="text-slate-500 font-medium">Active Status</p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
