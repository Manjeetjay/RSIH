import React, { useState, useEffect } from "react";
import api from "../../../services/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import { motion } from "framer-motion";

export default function SubmitIdea() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [checkingSubmission, setCheckingSubmission] = useState(true);
    const [psList, setPsList] = useState([]);
    const [form, setForm] = useState({
        psId: "",
        title: "",
        abstract: ""
    });

    useEffect(() => {
        const checkAndFetch = async () => {
            try {
                // Check if team already has a submission
                const subsRes = await api.get("/api/team/submissions");
                if (subsRes.data && subsRes.data.length > 0) {
                    toast.error("Your team has already submitted an idea. Each team can only submit one idea.");
                    navigate("/dashboard/team");
                    return;
                }

                // Fetch problem statements
                const psRes = await api.get("/api/team/ps");
                setPsList(psRes.data);
            } catch (err) {
                toast.error("Failed to load data");
            } finally {
                setCheckingSubmission(false);
            }
        };
        checkAndFetch();
    }, [navigate]);

    const submit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.post("/api/team/submit", {
                ...form,
                // teamId is handled by backend from token
            });
            toast.success("Idea submitted successfully");
            navigate("/dashboard/team");
        } catch (err) {
            toast.error(err.response?.data?.error || "Failed to submit idea");
        } finally {
            setLoading(false);
        }
    };

    const selectedPS = psList.find(p => p.id === parseInt(form.psId));

    if (checkingSubmission) {
        return <div className="p-12 text-center text-slate-500">Checking submission status...</div>;
    }

    return (
        <div className="page-container max-w-3xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6"
            >
                <h2 className="text-3xl font-bold text-slate-800">Submit New Idea</h2>
                <p className="text-slate-500 mt-1">Propose your solution for a problem statement.</p>
            </motion.div>

            <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                onSubmit={submit}
                className="card p-8 bg-white shadow-lg rounded-xl border border-slate-100"
            >
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Problem Statement</label>
                        <select
                            className="input w-full"
                            value={form.psId}
                            onChange={(e) => setForm({ ...form, psId: e.target.value })}
                            required
                        >
                            <option value="">Select a problem statement...</option>
                            {psList.map(p => (
                                <option key={p.id} value={p.id}>
                                    {p.title} ({p.id})
                                </option>
                            ))}
                        </select>
                    </div>

                    {selectedPS && (
                        <div className="p-4 bg-blue-50 rounded-lg border border-blue-100 text-sm">
                            <p className="font-semibold text-blue-800 mb-1">{selectedPS.title}</p>
                            <p className="text-blue-600">{selectedPS.description}</p>
                            <div className="flex gap-2 mt-2">
                                <span className="px-2 py-1 bg-white rounded text-xs font-medium text-blue-600 border border-blue-200">
                                    {selectedPS.category}
                                </span>
                                <span className="px-2 py-1 bg-white rounded text-xs font-medium text-blue-600 border border-blue-200">
                                    {selectedPS.type}
                                </span>
                            </div>
                        </div>
                    )}

                    <Input
                        label="Idea Title"
                        value={form.title}
                        onChange={(e) => setForm({ ...form, title: e.target.value })}
                        required
                    />

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Abstract</label>
                        <textarea
                            className="input w-full min-h-[200px]"
                            value={form.abstract}
                            onChange={(e) => setForm({ ...form, abstract: e.target.value })}
                            required
                        />
                    </div>

                    <div className="flex justify-end gap-4 pt-4">
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={() => navigate("/dashboard/team")}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" isLoading={loading}>
                            Submit Idea
                        </Button>
                    </div>
                </div>
            </motion.form>
        </div>
    );
}
