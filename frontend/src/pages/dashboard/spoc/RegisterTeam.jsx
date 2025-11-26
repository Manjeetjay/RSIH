import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../services/api";
import Button from "../../../components/ui/Button";
import { FaUsers, FaUser, FaEnvelope, FaPhone, FaGraduationCap, FaCodeBranch, FaStream } from "react-icons/fa";
import { toast } from "react-toastify";

export default function RegisterTeam() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [teamName, setTeamName] = useState("");

    // Initialize state for 4 members
    const [members, setMembers] = useState([
        { name: "", email: "", phone: "", branch: "", stream: "", year: "" }, // Member 1 (Leader)
        { name: "", email: "", phone: "", branch: "", stream: "", year: "" },
        { name: "", email: "", phone: "", branch: "", stream: "", year: "" },
        { name: "", email: "", phone: "", branch: "", stream: "", year: "" }
    ]);

    const handleMemberChange = (index, field, value) => {
        const newMembers = [...members];
        newMembers[index][field] = value;
        setMembers(newMembers);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const payload = {
                name: teamName,
                // Flatten member data for backend
                member1_name: members[0].name, member1_email: members[0].email, member1_phone: members[0].phone, member1_branch: members[0].branch, member1_stream: members[0].stream, member1_year: members[0].year,
                member2_name: members[1].name, member2_email: members[1].email, member2_phone: members[1].phone, member2_branch: members[1].branch, member2_stream: members[1].stream, member2_year: members[1].year,
                member3_name: members[2].name, member3_email: members[2].email, member3_phone: members[2].phone, member3_branch: members[2].branch, member3_stream: members[2].stream, member3_year: members[2].year,
                member4_name: members[3].name, member4_email: members[3].email, member4_phone: members[3].phone, member4_branch: members[3].branch, member4_stream: members[3].stream, member4_year: members[3].year,
            };

            await api.post("/api/spoc/team", payload);
            toast.success("Team registered successfully!");
            navigate("/dashboard/spoc");
        } catch (err) {
            toast.error(err.response?.data?.error || "Failed to register team");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="page-container">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-800">Register New Team</h1>
                <p className="text-slate-600">Add a team of 4 members including the leader</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">
                {/* Team Details */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                    <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <FaUsers className="text-blue-600" /> Team Information
                    </h2>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Team Name</label>
                        <div className="relative">
                            <FaUsers className="absolute left-3 top-3 text-slate-400" />
                            <input
                                type="text"
                                required
                                className="pl-10 input"
                                value={teamName}
                                onChange={(e) => setTeamName(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                {/* Members */}
                <div className="grid md:grid-cols-2 gap-6">
                    {members.map((member, index) => (
                        <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 relative">
                            <div className="absolute top-4 right-4 text-slate-200 text-6xl font-bold opacity-20 pointer-events-none">
                                {index + 1}
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                                {index === 0 ? "Team Leader (Member 1)" : `Member ${index + 1}`}
                            </h3>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-medium text-slate-500 uppercase mb-1">Full Name</label>
                                    <div className="relative">
                                        <FaUser className="absolute left-3 top-2.5 text-slate-400 text-xs" />
                                        <input
                                            type="text"
                                            required
                                            className="pl-8 input py-1.5 text-sm"
                                            value={member.name}
                                            onChange={(e) => handleMemberChange(index, "name", e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-slate-500 uppercase mb-1">Email</label>
                                    <div className="relative">
                                        <FaEnvelope className="absolute left-3 top-2.5 text-slate-400 text-xs" />
                                        <input
                                            type="email"
                                            required
                                            className="pl-8 input py-1.5 text-sm"
                                            value={member.email}
                                            onChange={(e) => handleMemberChange(index, "email", e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-slate-500 uppercase mb-1">Phone</label>
                                    <div className="relative">
                                        <FaPhone className="absolute left-3 top-2.5 text-slate-400 text-xs" />
                                        <input
                                            type="tel"
                                            required
                                            className="pl-8 input py-1.5 text-sm"
                                            value={member.phone}
                                            onChange={(e) => handleMemberChange(index, "phone", e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-xs font-medium text-slate-500 uppercase mb-1">Branch</label>
                                        <div className="relative">
                                            <FaCodeBranch className="absolute left-3 top-2.5 text-slate-400 text-xs" />
                                            <input
                                                type="text"
                                                required
                                                className="pl-8 input py-1.5 text-sm"
                                                value={member.branch}
                                                onChange={(e) => handleMemberChange(index, "branch", e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-slate-500 uppercase mb-1">Year</label>
                                        <div className="relative">
                                            <FaGraduationCap className="absolute left-3 top-2.5 text-slate-400 text-xs" />
                                            <select
                                                required
                                                className="pl-8 input py-1.5 text-sm"
                                                value={member.year}
                                                onChange={(e) => handleMemberChange(index, "year", e.target.value)}
                                            >
                                                <option value="">Select</option>
                                                <option value="1">1st</option>
                                                <option value="2">2nd</option>
                                                <option value="3">3rd</option>
                                                <option value="4">4th</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-slate-500 uppercase mb-1">Stream</label>
                                    <div className="relative">
                                        <FaStream className="absolute left-3 top-2.5 text-slate-400 text-xs" />
                                        <input
                                            type="text"
                                            required
                                            className="pl-8 input py-1.5 text-sm"
                                            value={member.stream}
                                            onChange={(e) => handleMemberChange(index, "stream", e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex justify-end gap-4 pt-4">
                    <Button type="button" variant="ghost" onClick={() => navigate("/dashboard/spoc")}>
                        Cancel
                    </Button>
                    <Button type="submit" size="lg" disabled={loading}>
                        {loading ? "Registering Team..." : "Register Team"}
                    </Button>
                </div>
            </form>
        </div>
    );
}
