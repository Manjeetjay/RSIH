import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Button from "./ui/Button";
import { motion } from "framer-motion";
import logo from "../assets/logo.png";

export default function DashboardNavbar() {
    const { user, logout } = useContext(AuthContext);
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    const NavLink = ({ to, children }) => (
        <Link
            to={to}
            className={`relative px-3 py-2 text-sm font-medium transition-colors duration-200 ${isActive(to) ? "text-sky-400" : "text-slate-300 hover:text-white"
                }`}
        >
            {children}
            {isActive(to) && (
                <motion.div
                    layoutId="navbar-indicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-sky-400"
                />
            )}
        </Link>
    );

    return (
        <nav className="bg-slate-900 border-b border-slate-900 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-blue-500/20">
                            <img src={logo} alt="logo" className="object-cover w-full h-full" />
                        </div>
                        <span className="font-bold text-xl text-white tracking-tight">
                            SIH <span className="text-blue-400">Dashboard</span>
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-6">
                        {user?.role === "ADMIN" && (
                            <>
                                <NavLink to="/dashboard/admin">Overview</NavLink>
                                {/* Add more admin links here if needed */}
                            </>
                        )}
                        {user?.role === "SPOC" && (
                            <>
                                <NavLink to="/dashboard/spoc">My Teams</NavLink>
                                {/* Add more SPOC links here if needed */}
                            </>
                        )}
                        {user?.role === "TEAM_LEADER" && (
                            <>
                                <NavLink to="/dashboard/team">My Team</NavLink>
                                {/* Add more Team links here if needed */}
                            </>
                        )}
                    </div>

                    {/* Auth Buttons */}
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-4">
                            <span className="text-slate-400 text-sm hidden sm:block">
                                {user?.role} : <span className="text-white font-medium">{user?.name || 'User'}</span>
                            </span>
                            <Button variant="danger" size="sm" onClick={logout}>Logout</Button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
