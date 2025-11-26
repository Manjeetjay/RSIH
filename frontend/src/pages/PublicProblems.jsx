import { useEffect, useState } from "react";
import api from "../services/api";
import Modal from "../components/ui/Modal";
import Button from "../components/ui/Button";
import { FaSearch, FaEye, FaLightbulb, FaFilter, FaLayerGroup, FaTag } from "react-icons/fa";
import PublicFooter from "../components/layouts/PublicFooter";

export default function PublicProblems() {
  const [problems, setProblems] = useState([]);
  const [filteredProblems, setFilteredProblems] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [viewingPS, setViewingPS] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProblems();
  }, []);

  useEffect(() => {
    let result = problems;
    if (search) {
      result = result.filter(p =>
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (selectedCategory !== "All") {
      result = result.filter(p => p.category === selectedCategory);
    }
    setFilteredProblems(result);
  }, [search, selectedCategory, problems]);

  const fetchProblems = async () => {
    try {
      const res = await api.get("/api/public/ps");
      setProblems(res.data);
      setFilteredProblems(res.data);
    } catch (err) {
      console.error("Failed to fetch problems", err);
    } finally {
      setLoading(false);
    }
  };

  const categories = ["All", ...new Set(problems.map(p => p.category))];

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-slate-50 via-white to-white">
      <header className="bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <p className="text-sm uppercase tracking-[0.3em] text-blue-200 mb-4">Explore Challenges</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Problem Statements Library</h1>
          <p className="text-slate-200 max-w-2xl text-lg">
            Discover curated challenges across technology, healthcare, sustainability, finance, and more.
            Filter by category and dive deep into the opportunities that align with your team&apos;s strengths.
          </p>
        </div>
      </header>

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-6 py-12 space-y-10">
          {/* Search + Filters */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 space-y-4">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="relative w-full md:w-2/3">
                <label className="sr-only" htmlFor="ps-search">Search problem statements</label>
                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  id="ps-search"
                  type="text"
                  placeholder="Search by title or description..."
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <FaLayerGroup />
                <span>{filteredProblems.length} challenges</span>
              </div>
            </div>

            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex items-center gap-2 text-slate-500 text-sm">
                <FaFilter />
                <span>Filter by category</span>
              </div>
              <div className="flex gap-2 flex-wrap">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all border ${selectedCategory === cat
                      ? "bg-blue-600 border-blue-600 text-white shadow-md"
                      : "bg-white border-slate-200 text-slate-600 hover:border-blue-400"
                      }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Problem Cards */}
          {loading ? (
            <div className="text-center py-12 text-slate-500">Loading problem statements...</div>
          ) : filteredProblems.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-slate-200">
              <p className="text-slate-600 text-lg">No problem statements match your criteria.</p>
              <p className="text-sm text-slate-400 mt-2">Try a different keyword or category.</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {filteredProblems.map((p) => (
                <div
                  key={p.id}
                  className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg transition-shadow flex flex-col"
                >
                  <div className="p-6 flex-1">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-semibold text-blue-600 tracking-[0.2em]">
                        PS #{p.id}
                      </span>
                      <div className="flex gap-2 flex-wrap justify-end">
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-medium">
                          <FaTag /> {p.category || "Uncategorized"}
                        </span>
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-medium">
                          <FaLayerGroup /> {p.type || "N/A"}
                        </span>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{p.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">
                      {p.description}
                    </p>
                    {showSubmissionBadge(p) && (
                      <div className="mt-4 inline-flex items-center gap-2 text-purple-700 text-sm bg-purple-50 px-3 py-1 rounded-full">
                        <FaLightbulb /> {p.submission_count} submissions
                      </div>
                    )}
                  </div>
                  <div className="p-6 border-t border-slate-100 flex justify-end">
                    <Button variant="outline" size="sm" onClick={() => setViewingPS(p)} className="flex items-center gap-2">
                      <FaEye /> View Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

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
              <div className="flex gap-2 mb-4 flex-wrap">
                <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-medium">
                  {viewingPS.type}
                </span>
                <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium border border-blue-100">
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
  );

  function showSubmissionBadge(problem) {
    return typeof problem.submission_count === "number" && problem.submission_count > 0;
  }
}
