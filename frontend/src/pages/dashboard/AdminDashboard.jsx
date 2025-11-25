import { useEffect, useState } from "react";
import api from "../../services/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Button from "../../components/ui/Button";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalPS: 0,
    totalSPOCs: 0,
    pendingSPOCs: 0,
    totalSubmissions: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const [psRes, spocsRes, subsRes] = await Promise.all([
        api.get("/api/admin/ps"),
        api.get("/api/admin/spocs"),
        api.get("/api/admin/submissions")
      ]);

      setStats({
        totalPS: psRes.data.length,
        totalSPOCs: spocsRes.data.length,
        pendingSPOCs: spocsRes.data.filter(s => !s.verified).length,
        totalSubmissions: subsRes.data.length
      });
    } catch (err) {
      toast.error("Failed to fetch dashboard data");
    } finally {
      setLoading(false);
    }
  };

  const quickActions = [
    {
      title: "Problem Statements",
      description: "Manage hackathon challenges and definitions",
      icon: "📋",
      path: "/dashboard/admin/problems",
      color: "blue",
      stat: stats.totalPS,
      statLabel: "Total PS"
    },
    {
      title: "SPOC Management",
      description: "View and verify institutional coordinators",
      icon: "👥",
      path: "/dashboard/admin/spocs",
      color: "green",
      stat: stats.totalSPOCs,
      statLabel: "Total SPOCs",
      badge: stats.pendingSPOCs > 0 ? `${stats.pendingSPOCs} Pending` : null
    },
    {
      title: "Registrations",
      description: "Review and approve SPOC registrations",
      icon: "📝",
      path: "/dashboard/admin/registrations",
      color: "sky",
      stat: stats.pendingSPOCs,
      statLabel: "Pending"
    },
    {
      title: "Submissions",
      description: "View all team submissions and ideas",
      icon: "💡",
      path: "/dashboard/admin/submissions",
      color: "purple",
      stat: stats.totalSubmissions,
      statLabel: "Total Submissions"
    }
  ];

  const colorClasses = {
    blue: "from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700",
    green: "from-green-500 to-green-600 hover:from-green-600 hover:to-green-700",
    sky: "from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700",
    purple: "from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700"
  };

  if (loading) {
    return <div className="p-12 text-center text-slate-500">Loading dashboard...</div>;
  }

  return (
    <div className="page-container">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-bold text-slate-800 mb-2">Admin Dashboard</h1>
          <p className="text-slate-600">Manage the Smart India Hackathon portal</p>
        </motion.div>

        {/* Statistics Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="card p-6 bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-xl shadow-lg"
          >
            <div className="text-3xl mb-2">📋</div>
            <div className="text-3xl font-bold mb-1">{stats.totalPS}</div>
            <div className="text-blue-100 text-sm font-medium">Problem Statements</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="card p-6 bg-gradient-to-br from-green-600 to-green-700 text-white rounded-xl shadow-lg"
          >
            <div className="text-3xl mb-2">👥</div>
            <div className="text-3xl font-bold mb-1">{stats.totalSPOCs}</div>
            <div className="text-green-100 text-sm font-medium">Total SPOCs</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="card p-6 bg-gradient-to-br from-sky-500 to-sky-600 text-white rounded-xl shadow-lg"
          >
            <div className="text-3xl mb-2">⏳</div>
            <div className="text-3xl font-bold mb-1">{stats.pendingSPOCs}</div>
            <div className="text-sky-100 text-sm font-medium">Pending Approvals</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="card p-6 bg-gradient-to-br from-purple-600 to-purple-700 text-white rounded-xl shadow-lg"
          >
            <div className="text-3xl mb-2">💡</div>
            <div className="text-3xl font-bold mb-1">{stats.totalSubmissions}</div>
            <div className="text-purple-100 text-sm font-medium">Total Submissions</div>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-6">Quick Actions</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {quickActions.map((action, index) => (
              <motion.div
                key={action.path}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                onClick={() => navigate(action.path)}
                className="card p-6 bg-white rounded-xl shadow-md border border-slate-100 hover:shadow-xl transition-all cursor-pointer group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${colorClasses[action.color]} flex items-center justify-center text-3xl shadow-lg group-hover:scale-110 transition-transform`}>
                      {action.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-800 group-hover:text-blue-700 transition-colors">
                        {action.title}
                      </h3>
                      <p className="text-slate-500 text-sm mt-1">{action.description}</p>
                    </div>
                  </div>
                  {action.badge && (
                    <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-bold">
                      {action.badge}
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-slate-800">{action.stat}</span>
                    <span className="text-sm text-slate-500">{action.statLabel}</span>
                  </div>
                  <Button variant="outline" size="sm" className="group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all">
                    Manage →
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Recent Activity Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 card p-6 bg-slate-50 rounded-xl border border-slate-200"
        >
          <h3 className="text-lg font-bold text-slate-800 mb-3">💡 Quick Tips</h3>
          <ul className="space-y-2 text-slate-600 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-0.5">•</span>
              <span>Review pending SPOC registrations regularly to keep the process moving</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-0.5">•</span>
              <span>Create problem statements with clear descriptions and categories</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-0.5">•</span>
              <span>Monitor submissions to track team participation and engagement</span>
            </li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
}
