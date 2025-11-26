import { useState, useEffect } from "react";
import api from "../../../services/api";
import Table, { TableRow, TableCell } from "../../../components/ui/Table";
import Button from "../../../components/ui/Button";
import { FaCheck, FaTimes, FaFilePdf, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";

export default function SPOCManagement() {
  const [spocs, setSpocs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSPOCs();
  }, []);

  const fetchSPOCs = async () => {
    try {
      const res = await api.get("/api/admin/spocs");
      setSpocs(res.data);
    } catch (err) {
      console.error(err);
      // toast.error("Failed to load SPOCs");
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (id) => {
    try {
      await api.put(`/api/admin/spoc/${id}/verify`);
      toast.success("SPOC verified successfully");
      fetchSPOCs();
    } catch (err) {
      toast.error("Failed to verify SPOC");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this SPOC?")) return;
    try {
      await api.delete(`/api/admin/user/${id}`); // Assuming generic user delete endpoint exists or create one
      toast.success("SPOC deleted successfully");
      fetchSPOCs();
    } catch (err) {
      toast.error("Failed to delete SPOC");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-6">
      <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-800">SPOC Management</h1>
        <div className="text-sm text-slate-500">
          Total SPOCs: <span className="font-semibold text-slate-900">{spocs.length}</span>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <Table headers={["Name", "Contact", "Institution", "ID Document", "Status", "Actions"]}>
          {spocs.map((spoc) => (
            <TableRow key={spoc.id}>
              <TableCell className="font-medium text-slate-900">{spoc.name}</TableCell>
              <TableCell>
                <div className="text-sm">
                  <p>{spoc.email}</p>
                  <p className="text-slate-500">{spoc.phone}</p>
                </div>
              </TableCell>
              <TableCell>{spoc.institution_name || "N/A"}</TableCell>
              <TableCell>
                {spoc.identification_doc ? (
                  <a
                    href={`http://localhost:5000${spoc.identification_doc}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-blue-600 hover:underline"
                  >
                    <FaFilePdf /> View Doc
                  </a>
                ) : (
                  <span className="text-slate-400 text-xs">Not Uploaded</span>
                )}
              </TableCell>
              <TableCell>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${spoc.verified
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                  }`}>
                  {spoc.verified ? "Verified" : "Pending"}
                </span>
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  {!spoc.verified && (
                    <Button size="sm" onClick={() => handleVerify(spoc.id)} title="Verify SPOC">
                      <FaCheck />
                    </Button>
                  )}
                  <button
                    onClick={() => handleDelete(spoc.id)}
                    className="text-red-600 hover:text-red-800 p-2"
                    title="Delete SPOC"
                  >
                    <FaTrash />
                  </button>
                </div>
              </TableCell>
            </TableRow>
          ))}
          {spocs.length === 0 && (
            <tr>
              <td colSpan="6" className="p-8 text-center text-slate-500">
                No SPOCs registered yet.
              </td>
            </tr>
          )}
        </Table>
      </div>
      </div>
    </div>
  );
}
