import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Button from "../ui/Button";
import { motion } from "framer-motion";

export default function TeamNavbar() {
    const { user, logout } = useContext(AuthContext);
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    const NavLink = ({ to, children }) => (
        <Link
            to={to}
            className={`relative px-3 py-2 text-sm font-medium transition-colors duration-200 ${isActive(to) ? "text-blue-600" : "text-slate-600 hover:text-slate-900"
                }`}
        >
            {children}
            {isActive(to) && (
                <motion.div
                    layoutId="team-navbar-indicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
                />
            )}
        </Link>
    );

    return (
        <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    {/* Logo */}
                    <Link to="/dashboard/team" className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                            T
                        </div>
                        <span className="font-bold text-xl text-slate-900 tracking-tight">
                            Team <span className="text-blue-600">Portal</span>
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-6">
                        <NavLink to="/dashboard/team">Dashboard</NavLink>
                        <NavLink to="/dashboard/team/problems">Available Problems</NavLink>
                        <NavLink to="/dashboard/team/submission">My Submission</NavLink>
                    </div>

                    {/* Auth Buttons */}
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-4">
                            <span className="text-slate-500 text-sm hidden sm:block">
                                <span className="font-medium text-slate-900">{user?.name}</span>
                            </span>
                            <Button variant="outline" size="sm" onClick={logout}>Logout</Button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
