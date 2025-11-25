import React, { useState, useEffect } from "react";
import api from "../../../services/api";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../../components/ui/Button";
import { motion } from "framer-motion";

export default function SubmissionDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [submission, setSubmission] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSubmission = async () => {
            try {
                // Fetch all submissions to find the one (since we might not have getSubmissionById)
                // Ideally backend should support GET /api/team/submission/:id
                const res = await api.get("/api/team/submissions");
                const found = res.data.find(s => s.id === parseInt(id));

                if (found) {
                    setSubmission(found);
                } else {
                    toast.error("Submission not found");
                    navigate("/dashboard/team");
                }
            } catch (err) {
                toast.error("Failed to fetch submission details");
            } finally {
                setLoading(false);
            }
        };
        fetchSubmission();
    }, [id, navigate]);

    if (loading) return <div className="p-12 text-center text-slate-500">Loading details...</div>;
    if (!submission) return null;

    return (
        <div className="page-container max-w-4xl mx-auto">
            <div className="mb-6">
                <Button variant="ghost" onClick={() => navigate("/dashboard/team")} className="mb-4 pl-0 hover:bg-transparent hover:text-blue-700">
                    ← Back to Dashboard
                </Button>
                <div className="flex justify-between items-start">
                    <div>
                        <h2 className="text-3xl font-bold text-slate-800">{submission.title}</h2>
                        <p className="text-slate-500 mt-1">Submission Details</p>
                    </div>
                    <span className={`px-4 py-2 rounded-full text-sm font-bold ${submission.status === 'SUBMITTED' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
                        }`}>
                        {submission.status}
                    </span>
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="card p-8 bg-white shadow-lg rounded-xl border border-slate-100"
            >
                <div className="space-y-8">
                    <div>
                        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Problem Statement ID</h3>
                        <p className="text-lg font-mono text-slate-700 bg-slate-50 p-3 rounded-lg inline-block">
                            #{submission.ps_id}
                        </p>
                    </div>

                    <div>
                        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Abstract</h3>
                        <div className="prose max-w-none text-slate-700 leading-relaxed whitespace-pre-wrap bg-slate-50 p-6 rounded-xl border border-slate-100">
                            {submission.abstract}
                        </div>
                    </div>

                    <div className="pt-6 border-t border-slate-100 flex justify-between items-center text-sm text-slate-500">
                        <span>Submitted on {new Date(submission.created_at || Date.now()).toLocaleDateString()}</span>
                        <span>ID: {submission.id}</span>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
