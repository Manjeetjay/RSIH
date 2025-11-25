import { motion } from "framer-motion";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
    const getPageNumbers = () => {
        const pages = [];
        const maxVisible = 5;

        if (totalPages <= maxVisible) {
            // Show all pages if total is less than max
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            // Always show first page
            pages.push(1);

            if (currentPage > 3) {
                pages.push("...");
            }

            // Show pages around current page
            const start = Math.max(2, currentPage - 1);
            const end = Math.min(totalPages - 1, currentPage + 1);

            for (let i = start; i <= end; i++) {
                pages.push(i);
            }

            if (currentPage < totalPages - 2) {
                pages.push("...");
            }

            // Always show last page
            if (totalPages > 1) {
                pages.push(totalPages);
            }
        }

        return pages;
    };

    const pageNumbers = getPageNumbers();

    return (
        <div className="flex items-center justify-center gap-2 mt-8">
            {/* Previous Button */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${currentPage === 1
                        ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                        : "bg-white text-blue-700 border-2 border-blue-700 hover:bg-blue-700 hover:text-white shadow-md hover:shadow-lg"
                    }`}
            >
                ← Previous
            </motion.button>

            {/* Page Numbers */}
            <div className="flex items-center gap-1">
                {pageNumbers.map((page, index) => {
                    if (page === "...") {
                        return (
                            <span key={`ellipsis-${index}`} className="px-3 py-2 text-slate-400">
                                ...
                            </span>
                        );
                    }

                    return (
                        <motion.button
                            key={page}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => onPageChange(page)}
                            className={`w-10 h-10 rounded-lg font-semibold transition-all ${currentPage === page
                                    ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg"
                                    : "bg-white text-slate-700 border border-slate-200 hover:border-blue-500 hover:text-blue-600 hover:shadow-md"
                                }`}
                        >
                            {page}
                        </motion.button>
                    );
                })}
            </div>

            {/* Next Button */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${currentPage === totalPages
                        ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                        : "bg-white text-blue-700 border-2 border-blue-700 hover:bg-blue-700 hover:text-white shadow-md hover:shadow-lg"
                    }`}
            >
                Next →
            </motion.button>
        </div>
    );
}
