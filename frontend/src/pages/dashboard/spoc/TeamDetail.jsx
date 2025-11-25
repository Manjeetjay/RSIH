import React, { useState, useEffect } from "react";
import api from "../../../services/api";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../../components/ui/Button";
import { motion } from "framer-motion";

export default function TeamDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [team, setTeam] = useState(null);
    const [submission, setSubmission] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch all teams to find the specific one (since we don't have getTeamById endpoint exposed for SPOC)
                // Ideally backend should support GET /api/spoc/team/:id
                const teamsRes = await api.get("/api/spoc/teams");
                const foundTeam = teamsRes.data.find(t => t.id === parseInt(id));

                if (foundTeam) {
                    setTeam(foundTeam);
                    // Check submission
                    const subRes = await api.get(`/api/spoc/team/${id}/submission`);
                    if (subRes.data.submitted) {
                        setSubmission(subRes.data.submission);
                    }
                } else {
                    toast.error("Team not found");
                    navigate("/dashboard/spoc");
                }
            } catch (err) {
                toast.error("Failed to fetch team details");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id, navigate]);

    if (loading) return <div className="p-12 text-center text-slate-500">Loading team details...</div>;
    if (!team) return null;

    return (
        <div className="page-container max-w-4xl mx-auto">
            <div className="mb-6">
                <Button variant="ghost" onClick={() => navigate("/dashboard/spoc")} className="mb-4 pl-0 hover:bg-transparent hover:text-blue-700">
                    ← Back to Dashboard
                </Button>
                <h2 className="text-3xl font-bold text-slate-800">{team.name}</h2>
                <p className="text-slate-500 mt-1">Team Details & Submission Status</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="card p-6 bg-white shadow-lg rounded-xl border border-slate-100 h-fit"
                >
                    <h3 className="text-xl font-semibold text-slate-800 mb-4 border-b pb-2">Team Information</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Team Leader</label>
                            <p className="text-lg font-medium text-slate-900">{team.leader_name}</p>
                        </div>
                        <div>
                            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Email</label>
                            <p className="text-lg text-slate-700">{team.leader_email}</p>
                        </div>
                        <div>
                            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</label>
                            <div className="mt-1">
                                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                                    Active
                                </span>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="card p-6 bg-white shadow-lg rounded-xl border border-slate-100 h-fit"
                >
                    <h3 className="text-xl font-semibold text-slate-800 mb-4 border-b pb-2">Submission Status</h3>
                    {submission ? (
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                                    Submitted
                                </span>
                                <span className="text-sm text-slate-500">
                                    on {new Date(submission.created_at || Date.now()).toLocaleDateString()}
                                </span>
                            </div>
                            <div>
                                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Title</label>
                                <p className="text-lg font-medium text-slate-900">{submission.title}</p>
                            </div>
                            <div>
                                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Abstract</label>
                                <p className="text-slate-700 mt-1 text-sm leading-relaxed">{submission.abstract}</p>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-8">
                            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
                                📝
                            </div>
                            <p className="text-slate-600 font-medium">No submission yet</p>
                            <p className="text-slate-400 text-sm mt-1">The team has not submitted an idea for any problem statement.</p>
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    );
}
