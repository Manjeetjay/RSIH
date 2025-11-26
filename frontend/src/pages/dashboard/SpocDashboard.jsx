import { useState, useEffect } from "react";
import api from "../../services/api";
import Table, { TableRow, TableCell } from "../../components/ui/Table";
import Button from "../../components/ui/Button";
import { FaUsers, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";

export default function SpocDashboard() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      const res = await api.get("/api/spoc/teams");
      setTeams(res.data);
    } catch (err) {
      console.error(err);
      // toast.error("Failed to load teams");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTeam = async (id) => {
    if (!window.confirm("Are you sure you want to delete this team?")) return;
    try {
      await api.delete(`/api/spoc/team/${id}`);
      toast.success("Team deleted successfully");
      fetchTeams();
    } catch (err) {
      toast.error("Failed to delete team");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold text-slate-900">SPOC Dashboard</h1>
          <p className="text-slate-600">Manage your institution's teams</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <Table headers={["Team Name", "Leader", "Members", "Status", "Actions"]}>
            {teams.map((team) => (
              <TableRow key={team.id}>
                <TableCell className="font-medium text-slate-900">{team.name}</TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium">{team.member1_name}</p>
                    <p className="text-xs text-slate-500">{team.member1_email}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm text-slate-600 space-y-1">
                    <p>2. {team.member2_name}</p>
                    <p>3. {team.member3_name}</p>
                    <p>4. {team.member4_name}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                    Active
                  </span>
                </TableCell>
                <TableCell>
                  <button
                    onClick={() => handleDeleteTeam(team.id)}
                    className="text-red-600 hover:text-red-800 p-2"
                    title="Delete Team"
                  >
                    <FaTrash />
                  </button>
                </TableCell>
              </TableRow>
            ))}
            {teams.length === 0 && (
              <tr>
                <td colSpan="5" className="p-12 text-center text-slate-500">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center">
                      <FaUsers className="text-slate-400 text-xl" />
                    </div>
                    <p>No teams registered yet.</p>
                    <p className="text-xs text-slate-400">
                      Use the Register Team option from the navigation to add your first team.
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </Table>
        </div>
      </div>
    </div>
  );
}
