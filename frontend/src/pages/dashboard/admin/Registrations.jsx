import { useAppContext } from "../../../context/AppContext";
import Button from "../../../components/ui/Button";
import Table, { TableRow, TableCell } from "../../../components/ui/Table";
import { FaCheck, FaTimes, FaBuilding, FaUser, FaEnvelope } from "react-icons/fa";

export default function Registrations() {
  const { collegeRegistrations, approveCollegeRegistration, rejectCollegeRegistration } = useAppContext();

  const handleApprove = async (id) => {
    if (window.confirm("Are you sure you want to approve this SPOC registration?")) {
      await approveCollegeRegistration(id);
    }
  };

  const handleReject = async (id) => {
    if (window.confirm("Are you sure you want to reject and remove this registration?")) {
      await rejectCollegeRegistration(id);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-6">
      <div className="page-container max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">SPOC Registrations</h1>
        <p className="text-slate-600">Review and approve pending institutional coordinators</p>
      </div>

      {collegeRegistrations.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl shadow border border-slate-200">
          <p className="text-slate-500">No pending registrations.</p>
        </div>
      ) : (
        <Table headers={["College", "SPOC Name", "Email", "Status", "Actions"]}>
          {collegeRegistrations.map((reg) => (
            <TableRow key={reg.id}>
              <TableCell>
                <div className="flex items-center gap-2">
                  <FaBuilding className="text-slate-400" />
                  <span className="font-medium text-slate-900">{reg.college_name || "N/A"}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <FaUser className="text-slate-400" />
                  <span>{reg.name}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2 text-slate-600">
                  <FaEnvelope className="text-slate-400" />
                  <span>{reg.email}</span>
                </div>
              </TableCell>
              <TableCell>
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-amber-50 text-amber-700 rounded-full text-xs font-medium border border-amber-100">
                  Pending Approval
                </span>
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button variant="secondary" size="sm" onClick={() => handleApprove(reg.id)} className="flex items-center gap-1">
                    <FaCheck /> Approve
                  </Button>
                  <Button variant="danger" size="sm" onClick={() => handleReject(reg.id)} className="flex items-center gap-1">
                    <FaTimes /> Reject
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </Table>
      )}
      </div>
    </div>
  );
}
