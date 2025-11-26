import { useState } from "react";
import { useAppContext } from "../../../context/AppContext";
import Modal from "../../../components/ui/Modal";
import Button from "../../../components/ui/Button";
import Table, { TableRow, TableCell } from "../../../components/ui/Table";
import { FaEdit, FaTrash, FaEye, FaPlus } from "react-icons/fa";

export default function ProblemStatements() {
  const { problemStatements, addProblemStatement, updateProblemStatement, deleteProblemStatement } = useAppContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPS, setEditingPS] = useState(null);
  const [viewingPS, setViewingPS] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "Software",
    category: "Smart Education"
  });

  const handleOpen = (ps = null) => {
    if (ps) {
      setEditingPS(ps);
      setFormData({
        title: ps.title,
        description: ps.description,
        type: ps.type,
        category: ps.category
      });
    } else {
      setEditingPS(null);
      setFormData({
        title: "",
        description: "",
        type: "Software",
        category: "Smart Education"
      });
    }
    setIsModalOpen(true);
  };

  const handleView = (ps) => {
    setViewingPS(ps);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingPS) {
      await updateProblemStatement(editingPS.id, formData);
    } else {
      await addProblemStatement(formData);
    }
    setIsModalOpen(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this problem statement?")) {
      await deleteProblemStatement(id);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-6">
      <div className="page-container max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Problem Statements</h1>
          <p className="text-slate-600">Manage hackathon challenges</p>
        </div>
        <Button onClick={() => handleOpen()} className="flex items-center gap-2">
          <FaPlus /> Add New Problem
        </Button>
      </div>

      {problemStatements.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl shadow border border-slate-200">
          <p className="text-slate-500 mb-4">No problem statements found.</p>
          <Button onClick={() => handleOpen()} className="flex items-center gap-2 mx-auto">
            <FaPlus /> Create First Problem
          </Button>
        </div>
      ) : (
        <Table headers={["ID", "Title", "Category", "Type", "Actions"]}>
          {problemStatements.map((ps) => (
            <TableRow key={ps.id}>
              <TableCell className="font-mono text-xs text-slate-500">#{ps.id}</TableCell>
              <TableCell className="font-medium text-slate-900">{ps.title}</TableCell>
              <TableCell>
                <span className="px-2 py-1 bg-sky-50 text-sky-700 rounded-full text-xs font-medium border border-sky-100">
                  {ps.category}
                </span>
              </TableCell>
              <TableCell>{ps.type}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleView(ps)} title="View Details">
                    <FaEye />
                  </Button>
                  <Button variant="secondary" size="sm" onClick={() => handleOpen(ps)} title="Edit">
                    <FaEdit />
                  </Button>
                  <Button variant="danger" size="sm" onClick={() => handleDelete(ps.id)} title="Delete">
                    <FaTrash />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </Table>
      )}

      {/* Edit/Create Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingPS ? "Edit Problem Statement" : "Add Problem Statement"}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
            <input
              type="text"
              required
              className="input"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
            <textarea
              required
              rows="4"
              className="input"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Type</label>
              <select
                className="input"
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              >
                <option value="Software">Software</option>
                <option value="Hardware">Hardware</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
              <select
                className="input"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                <option value="Smart Education">Smart Education</option>
                <option value="Clean Water">Clean Water</option>
                <option value="Agriculture">Agriculture</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Robotics">Robotics</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">
              {editingPS ? "Update Problem" : "Create Problem"}
            </Button>
          </div>
        </form>
      </Modal>

      {/* View Details Modal */}
      <Modal
        isOpen={!!viewingPS}
        onClose={() => setViewingPS(null)}
        title={
          <div className="flex items-center gap-3">
            <span className="px-2 py-1 bg-blue-600 text-white rounded text-xs font-bold">
              PS #{viewingPS?.id}
            </span>
            <span>Problem Details</span>
          </div>
        }
      >
        {viewingPS && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">{viewingPS.title}</h3>
              <div className="flex gap-2 mb-4">
                <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-xs font-medium">
                  {viewingPS.type}
                </span>
                <span className="px-2 py-1 bg-sky-50 text-sky-700 rounded text-xs font-medium border border-sky-100">
                  {viewingPS.category}
                </span>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Description</h4>
              <p className="text-slate-700 whitespace-pre-wrap leading-relaxed">
                {viewingPS.description}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <Button onClick={() => setViewingPS(null)}>Close</Button>
            </div>
          </div>
        )}
      </Modal>
      </div>
    </div>
  );
}
