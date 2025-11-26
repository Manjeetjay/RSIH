import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaYoutube } from "react-icons/fa";

export default function PublicFooter() {
  const navLinks = [
    { label: "Home", to: "/" },
    { label: "Guidelines", to: "/guidelines" },
    { label: "Problem Statements", to: "/problems" },
    { label: "SPOC Registration", to: "/spoc-registration" },
  ];

  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid gap-8 md:grid-cols-3">
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">IIMT Regional Hackathon</h3>
          <p className="text-sm text-slate-400 leading-relaxed">
            A collaborative platform for students, institutions, and industry partners to build
            impactful solutions for real-world challenges.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-white uppercase tracking-widest mb-4">Explore</h4>
          <ul className="space-y-2 text-sm">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="hover:text-white transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-white uppercase tracking-widest mb-4">
            Stay Connected
          </h4>
          <p className="text-sm text-slate-400 mb-4">
            Follow the conversation and get the latest updates.
          </p>
          <div className="flex gap-3">
            {[FaFacebookF, FaTwitter, FaLinkedinIn, FaYoutube].map((Icon, idx) => (
              <a
                key={idx}
                href="#"
                className="w-10 h-10 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center transition-colors"
                aria-label="Social link"
              >
                <Icon className="text-white text-sm" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} IIMT University Regional Hackathon. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

