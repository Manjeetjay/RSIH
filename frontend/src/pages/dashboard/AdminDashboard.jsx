import { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import api from "../../services/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Button from "../../components/ui/Button";
import {
  FaClipboardList,
  FaUsersCog,
  FaUserCheck,
  FaRegLightbulb,
  FaLightbulb,
  FaCheckCircle
} from "react-icons/fa";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { problemStatements, spocCredentials, collegeRegistrations, teamSubmissions, refreshData } = useAppContext();
  const [showSubmissionCounts, setShowSubmissionCounts] = useState(false);
  const [loadingSetting, setLoadingSetting] = useState(true);

  useEffect(() => {
    refreshData();
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await api.get("/api/settings");
      setShowSubmissionCounts(res.data.show_submission_counts === 'true');
    } catch (err) {
      console.error("Failed to fetch settings", err);
    } finally {
      setLoadingSetting(false);
    }
  };

  const toggleSubmissionCounts = async () => {
    const newValue = !showSubmissionCounts;
    try {
      await api.put("/api/settings", { key: "show_submission_counts", value: newValue });
      setShowSubmissionCounts(newValue);
      toast.success(`Submission counts ${newValue ? "enabled" : "disabled"} on public page`);
    } catch (err) {
      toast.error("Failed to update setting");
    }
  };

  const stats = {
    totalPS: problemStatements.length,
    totalSPOCs: spocCredentials.length,
    pendingSPOCs: collegeRegistrations.length, // Assuming collegeRegistrations are pending
    totalSubmissions: teamSubmissions.length
  };

  const quickActions = [
    {
      title: "Problem Statements",
      description: "Manage hackathon challenges and definitions",
      icon: FaClipboardList,
      path: "/dashboard/admin/problems",
      color: "blue",
      stat: stats.totalPS,
      statLabel: "Total PS"
    },
    {
      title: "SPOC Management",
      description: "View and verify institutional coordinators",
      icon: FaUsersCog,
      path: "/dashboard/admin/spocs",
      color: "green",
      stat: stats.totalSPOCs,
      statLabel: "Total SPOCs"
    },
    {
      title: "Registrations",
      description: "Review and approve SPOC registrations",
      icon: FaUserCheck,
      path: "/dashboard/admin/registrations",
      color: "sky",
      stat: stats.pendingSPOCs,
      statLabel: "Pending",
      badge: stats.pendingSPOCs > 0 ? `${stats.pendingSPOCs} Pending` : null
    },
    {
      title: "Submissions",
      description: "View all team submissions and ideas",
      icon: FaLightbulb,
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

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="page-container max-w-7xl space-y-6">
        <div className="flex justify-between items-start mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl font-bold text-slate-800 mb-2">Admin Dashboard</h1>
            <p className="text-slate-600">Manage the Smart India Hackathon portal</p>
          </motion.div>

          {/* Settings Toggle */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex items-center gap-4"
          >
            <div>
              <p className="font-semibold text-slate-800 text-sm">Public Page Settings</p>
              <p className="text-xs text-slate-500">Show submission counts</p>
            </div>
            <button
              onClick={toggleSubmissionCounts}
              disabled={loadingSetting}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${showSubmissionCounts ? 'bg-blue-600' : 'bg-slate-200'
                }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${showSubmissionCounts ? 'translate-x-6' : 'translate-x-1'
                  }`}
              />
            </button>
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
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${colorClasses[action.color]} flex items-center justify-center text-3xl shadow-lg group-hover:scale-110 transition-transform text-white`}>
                      <action.icon className="text-2xl" />
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
          <div className="flex items-center gap-2 text-slate-800 mb-3">
            <FaRegLightbulb className="text-blue-600" />
            <h3 className="text-lg font-bold">Quick Tips</h3>
          </div>
          <ul className="space-y-2 text-slate-600 text-sm">
            <li className="flex items-start gap-2">
              <FaCheckCircle className="text-blue-500 mt-0.5" />
              <span>Review pending SPOC registrations regularly to keep the process moving</span>
            </li>
            <li className="flex items-start gap-2">
              <FaCheckCircle className="text-blue-500 mt-0.5" />
              <span>Create problem statements with clear descriptions and categories</span>
            </li>
            <li className="flex items-start gap-2">
              <FaCheckCircle className="text-blue-500 mt-0.5" />
              <span>Monitor submissions to track team participation and engagement</span>
            </li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
}
