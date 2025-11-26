import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "../../../services/api";
import Button from "../../../components/ui/Button";
import { FaLightbulb, FaFileUpload, FaYoutube, FaAlignLeft } from "react-icons/fa";
import { toast } from "react-toastify";

export default function SubmitIdea() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const psId = searchParams.get("psId");

    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        abstract: "",
        yt_link: "",
        ppt_file: null
    });

    useEffect(() => {
        if (!psId) {
            toast.error("No problem statement selected");
            navigate("/dashboard/team/problems");
        }
    }, [psId, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Word count validation
        const descWords = formData.description.trim().split(/\s+/).length;
        const abstractWords = formData.abstract.trim().split(/\s+/).length;

        if (descWords > 1000) {
            toast.error(`Description exceeds 1000 words (Current: ${descWords})`);
            return;
        }
        if (abstractWords > 500) {
            toast.error(`Abstract exceeds 500 words (Current: ${abstractWords})`);
            return;
        }

        setLoading(true);

        try {
            const data = new FormData();
            data.append("ps_id", psId);
            data.append("title", formData.title);
            data.append("description", formData.description);
            data.append("abstract", formData.abstract);
            data.append("yt_link", formData.yt_link);
            if (formData.ppt_file) {
                data.append("ppt_file", formData.ppt_file);
            }

            await api.post("/api/team/submit", data, {
                headers: { "Content-Type": "multipart/form-data" }
            });

            toast.success("Idea submitted successfully!");
            navigate("/dashboard/team/submission");
        } catch (err) {
            toast.error(err.response?.data?.error || "Failed to submit idea");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="page-container max-w-3xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-800">Submit Your Idea</h1>
                <p className="text-slate-600">Provide detailed information about your solution for PS #{psId}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-xl shadow-sm border border-slate-200">
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Project Title</label>
                    <div className="relative">
                        <FaLightbulb className="absolute left-3 top-3 text-slate-400" />
                        <input
                            type="text"
                            required
                            className="pl-10 input"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                        Detailed Description <span className="text-slate-400 font-normal">(Max 1000 words)</span>
                    </label>
                    <div className="relative">
                        <FaAlignLeft className="absolute left-3 top-3 text-slate-400" />
                        <textarea
                            required
                            rows="6"
                            className="pl-10 input"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        />
                    </div>
                    <p className="text-xs text-right text-slate-500 mt-1">
                        {formData.description.trim().split(/\s+/).filter(w => w).length} / 1000 words
                    </p>
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                        Abstract <span className="text-slate-400 font-normal">(Max 500 words)</span>
                    </label>
                    <div className="relative">
                        <FaAlignLeft className="absolute left-3 top-3 text-slate-400" />
                        <textarea
                            required
                            rows="4"
                            className="pl-10 input"
                            value={formData.abstract}
                            onChange={(e) => setFormData({ ...formData, abstract: e.target.value })}
                        />
                    </div>
                    <p className="text-xs text-right text-slate-500 mt-1">
                        {formData.abstract.trim().split(/\s+/).filter(w => w).length} / 500 words
                    </p>
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Presentation (PPT/PPTX)</label>
                    <div className="relative">
                        <FaFileUpload className="absolute left-3 top-3 text-slate-400" />
                        <input
                            type="file"
                            required
                            accept=".ppt,.pptx"
                            className="pl-10 input py-2"
                            onChange={(e) => setFormData({ ...formData, ppt_file: e.target.files[0] })}
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">YouTube Video Link <span className="text-slate-400 font-normal">(Optional)</span></label>
                    <div className="relative">
                        <FaYoutube className="absolute left-3 top-3 text-slate-400" />
                        <input
                            type="url"
                            className="pl-10 input"
                            value={formData.yt_link}
                            onChange={(e) => setFormData({ ...formData, yt_link: e.target.value })}
                        />
                    </div>
                </div>

                <div className="flex justify-end gap-4 pt-4">
                    <Button type="button" variant="ghost" onClick={() => navigate("/dashboard/team/problems")}>
                        Cancel
                    </Button>
                    <Button type="submit" size="lg" disabled={loading}>
                        {loading ? "Submitting..." : "Submit Idea"}
                    </Button>
                </div>
            </form>
        </div>
    );
}
