import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Button from "./ui/Button";

export default function DashboardNav() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    // Role-specific navigation links
    const getNavLinks = () => {
        if (user?.role === "ADMIN") {
            return [
                { path: "/dashboard/admin", label: "Dashboard" },
                { path: "/dashboard/admin/problems", label: "Problem Statements" },
                { path: "/dashboard/admin/spocs", label: "SPOCs" },
                { path: "/dashboard/admin/registrations", label: "Registrations" },
                { path: "/dashboard/admin/submissions", label: "Submissions" }
            ];
        } else if (user?.role === "SPOC") {
            return [
                { path: "/dashboard/spoc", label: "Dashboard" },
                { path: "/dashboard/spoc/teams/register", label: "Register Team" }
            ];
        } else if (user?.role === "TEAM_LEADER") {
            return [
                { path: "/dashboard/team", label: "Dashboard" },
                { path: "/dashboard/team/submit", label: "Submit Idea" }
            ];
        }
        return [];
    };

    const navLinks = getNavLinks();
    const isActive = (path) => location.pathname === path;

    return (
        <nav className="bg-gradient-to-r from-blue-700 to-blue-800 shadow-lg sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex items-center justify-between h-16">
                    {/* Logo & Brand */}
                    <div className="flex items-center gap-3">
                        <Link to={navLinks[0]?.path || "/"} className="flex items-center gap-2 text-white font-bold text-xl hover:text-sky-300 transition-colors">
                            <span className="text-2xl">🎯</span>
                            <span>SIH Portal</span>
                        </Link>
                        <span className="px-3 py-1 bg-sky-500 text-white text-xs font-bold rounded-full">
                            {user?.role?.replace("_", " ")}
                        </span>
                    </div>

                    {/* Navigation Links */}
                    <div className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${isActive(link.path)
                                    ? "bg-white text-blue-700 shadow-md"
                                    : "text-white hover:bg-blue-600"
                                    }`}
                            >
                                <span>{link.icon}</span>
                                <span>{link.label}</span>
                            </Link>
                        ))}
                    </div>

                    {/* User Info & Logout */}
                    <div className="flex items-center gap-4">
                        <div className="hidden md:block text-white text-sm">
                            <div className="font-medium">{user?.name || user?.email}</div>
                        </div>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handleLogout}
                            className="bg-white text-blue-700 border-white hover:bg-sky-500 hover:text-white hover:border-sky-500"
                        >
                            Logout
                        </Button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                <div className="md:hidden pb-4 flex gap-2 overflow-x-auto">
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all flex items-center gap-1.5 ${isActive(link.path)
                                ? "bg-white text-blue-700"
                                : "text-white bg-blue-600"
                                }`}
                        >
                            <span>{link.icon}</span>
                            <span>{link.label}</span>
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    );
}
