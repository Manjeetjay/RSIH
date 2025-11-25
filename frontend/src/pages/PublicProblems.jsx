import { useEffect, useState } from "react";
import api from "../services/api";
import Modal from "../components/ui/Modal";
import Button from "../components/ui/Button";
import Pagination from "../components/ui/Pagination";
import { motion, AnimatePresence } from "framer-motion";

export default function PublicProblems() {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 9;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("/api/public/ps");
        setProblems(res.data);
      } catch (err) {
        console.error("Failed to fetch problem statements:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filtered = problems.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.description.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination calculations
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentProblems = filtered.slice(startIndex, endIndex);

  // Reset to page 1 when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Skeleton loader component
  const SkeletonCard = () => (
    <div className="card p-6 bg-white rounded-xl shadow-md border border-slate-100 animate-pulse">
      <div className="flex items-center justify-between mb-4">
        <div className="h-8 w-20 bg-slate-200 rounded-lg"></div>
        <div className="h-6 w-16 bg-slate-200 rounded"></div>
      </div>
      <div className="h-6 bg-slate-200 rounded mb-3 w-3/4"></div>
      <div className="h-4 bg-slate-200 rounded mb-2"></div>
      <div className="h-4 bg-slate-200 rounded mb-2 w-5/6"></div>
      <div className="h-4 bg-slate-200 rounded mb-4 w-2/3"></div>
      <div className="flex items-center justify-between pt-4 border-t border-slate-100">
        <div className="h-6 w-24 bg-slate-200 rounded-full"></div>
        <div className="h-8 w-28 bg-slate-200 rounded-lg"></div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white px-6 py-12">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-extrabold text-slate-900 mb-4">
            Problem Statements
          </h1>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Explore the challenges for this year's hackathon. Click on any problem statement to view full details.
          </p>
        </motion.div>

        {/* Enhanced Search Input */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="max-w-2xl mx-auto mb-12"
        >
          <div className="relative">
            <div className="absolute left-5 top-1/2 transform -translate-y-1/2 text-slate-400 text-xl">
              🔍
            </div>
            <input
              type="text"
              placeholder="Search by title, description, or category..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full p-4 pl-14 pr-6 rounded-2xl border-2 border-slate-200 shadow-lg focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all text-lg"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-5 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
              >
                ✕
              </button>
            )}
          </div>
          {filtered.length > 0 && (
            <p className="text-center mt-3 text-sm text-slate-500">
              Showing {startIndex + 1}-{Math.min(endIndex, filtered.length)} of {filtered.length} problem statements
            </p>
          )}
        </motion.div>

        {/* Problem Cards */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-slate-800 mb-2">No problem statements found</h3>
            <p className="text-slate-500">Try adjusting your search terms</p>
            {search && (
              <Button onClick={() => setSearch("")} className="mt-4" variant="outline">
                Clear Search
              </Button>
            )}
          </motion.div>
        ) : (
          <>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPage}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {currentProblems.map((p, index) => (
                  <motion.div
                    key={p.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ y: -8, scale: 1.02 }}
                    onClick={() => setSelectedProblem(p)}
                    className="card p-6 bg-white rounded-xl shadow-md border-2 border-slate-100 hover:border-blue-300 hover:shadow-2xl transition-all cursor-pointer group relative overflow-hidden"
                  >
                    {/* Hover gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>

                    <div className="relative z-10">
                      {/* PS ID Badge */}
                      <div className="flex items-center justify-between mb-4">
                        <span className="px-3 py-1.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg text-sm font-bold shadow-md group-hover:shadow-lg group-hover:scale-105 transition-all">
                          PS #{p.id}
                        </span>
                        <div className="flex gap-2">
                          <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-xs font-medium">
                            {p.type}
                          </span>
                        </div>
                      </div>

                      <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-blue-700 transition-colors line-clamp-2">
                        {p.title}
                      </h3>
                      <p className="text-slate-600 text-sm line-clamp-3 mb-4 leading-relaxed">
                        {p.description}
                      </p>

                      <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                        <span className="px-3 py-1 bg-gradient-to-r from-sky-100 to-sky-50 text-sky-700 rounded-full text-xs font-semibold border border-sky-200">
                          {p.category}
                        </span>
                        <div className="flex items-center gap-2 text-blue-600 font-medium text-sm group-hover:gap-3 transition-all">
                          View Details
                          <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </>
        )}
      </div>

      {/* Problem Detail Modal */}
      <Modal
        isOpen={!!selectedProblem}
        onClose={() => setSelectedProblem(null)}
        title={
          <div className="flex items-center gap-3">
            <span className="px-3 py-1.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg text-sm font-bold">
              PS #{selectedProblem?.id}
            </span>
            <span className="text-slate-800">{selectedProblem?.title}</span>
          </div>
        }
      >
        {selectedProblem && (
          <div className="space-y-6">
            <div className="flex gap-3">
              <span className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium">
                {selectedProblem.type}
              </span>
              <span className="px-3 py-1.5 bg-gradient-to-r from-sky-100 to-sky-50 text-sky-700 rounded-lg text-sm font-semibold border border-sky-200">
                {selectedProblem.category}
              </span>
            </div>

            <div>
              <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Description</h4>
              <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">
                {selectedProblem.description}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <Button onClick={() => setSelectedProblem(null)}>Close</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
