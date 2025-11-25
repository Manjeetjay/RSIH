import React, { useState, useEffect } from "react";
import api from "../../../services/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import { motion } from "framer-motion";

export default function RegisterTeam() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [checkingLimit, setCheckingLimit] = useState(true);
    const [college, setCollege] = useState(null);
    const [form, setForm] = useState({
        teamName: "",
        leaderName: "",
        leaderEmail: "",
        leaderPassword: ""
    });

    useEffect(() => {
        const checkAndFetch = async () => {
            try {
                const [collegeRes, teamsRes] = await Promise.all([
                    api.get("/api/spoc/college"),
                    api.get("/api/spoc/teams")
                ]);

                setCollege(collegeRes.data);

                // Check if team limit reached
                if (teamsRes.data && teamsRes.data.length >= 15) {
                    toast.error("Team registration limit reached. You can only register 15 teams.");
                    navigate("/dashboard/spoc");
                    return;
                }
            } catch (err) {
                toast.error("Failed to load data");
            } finally {
                setCheckingLimit(false);
            }
        };
        checkAndFetch();
    }, [navigate]);

    const submit = async (e) => {
        e.preventDefault();
        if (!college) {
            toast.error("College information missing");
            return;
        }
        setLoading(true);
        try {
            await api.post("/api/spoc/team", {
                ...form,
                collegeId: college.id
            });
            toast.success("Team registered successfully");
            navigate("/dashboard/spoc");
        } catch (err) {
            toast.error(err.response?.data?.error || "Failed to register team");
        } finally {
            setLoading(false);
        }
    };

    if (checkingLimit) {
        return <div className="p-12 text-center text-slate-500">Checking team limit...</div>;
    }

    return (
        <div className="page-container max-w-3xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6"
            >
                <h2 className="text-3xl font-bold text-slate-800">Register New Team</h2>
                <p className="text-slate-500 mt-1">Add a new team for {college?.name || "your institution"}.</p>
            </motion.div>

            <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                onSubmit={submit}
                className="card p-8 bg-white shadow-lg rounded-xl border border-slate-100"
            >
                <div className="space-y-6">
                    <Input
                        label="Team Name"
                        value={form.teamName}
                        onChange={(e) => setForm({ ...form, teamName: e.target.value })}
                        required
                    />

                    <div className="grid md:grid-cols-2 gap-6">
                        <Input
                            label="Leader Name"
                            value={form.leaderName}
                            onChange={(e) => setForm({ ...form, leaderName: e.target.value })}
                            required
                        />
                        <Input
                            label="Leader Email"
                            type="email"
                            value={form.leaderEmail}
                            onChange={(e) => setForm({ ...form, leaderEmail: e.target.value })}
                            required
                        />
                    </div>

                    <Input
                        label="Leader Password"
                        type="password"
                        value={form.leaderPassword}
                        onChange={(e) => setForm({ ...form, leaderPassword: e.target.value })}
                        required
                    />

                    <div className="flex justify-end gap-4 pt-4">
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={() => navigate("/dashboard/spoc")}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" isLoading={loading}>
                            Register Team
                        </Button>
                    </div>
                </div>
            </motion.form>
        </div>
    );
}
