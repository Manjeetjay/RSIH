import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-400 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                                S
                            </div>
                            <span className="font-bold text-xl text-white tracking-tight">
                                SIH <span className="text-blue-400">Portal</span>
                            </span>
                        </div>
                        <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
                            Empowering innovation through the Smart India Hackathon.
                            Connecting students, institutions, and industries to solve real-world problems.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link to="/" className="hover:text-blue-400 transition-colors">Home</Link></li>
                            <li><Link to="/about" className="hover:text-blue-400 transition-colors">About Us</Link></li>
                            <li><Link to="/guidelines" className="hover:text-blue-400 transition-colors">Guidelines</Link></li>
                            <li><Link to="/problems" className="hover:text-blue-400 transition-colors">Problem Statements</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Contact</h3>
                        <ul className="space-y-2 text-sm">
                            <li>Help Desk: +91 11 2958 1316</li>
                            <li>Email: sih@aicte-india.org</li>
                            <li className="pt-2">
                                <span className="block text-xs text-slate-500">Powered by</span>
                                <span className="font-medium text-white">Ministry of Education</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
                    <p>&copy; {new Date().getFullYear()} Smart India Hackathon. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link to="#" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link to="#" className="hover:text-white transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
