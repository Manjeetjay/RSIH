import AdminNavbar from "../navbars/AdminNavbar";
import SpocNavbar from "../navbars/SpocNavbar";
import TeamNavbar from "../navbars/TeamNavbar";

export default function DashboardLayout({ role, children }) {
    const renderNavbar = () => {
        switch (role) {
            case "ADMIN":
                return <AdminNavbar />;
            case "SPOC":
                return <SpocNavbar />;
            case "TEAM_LEADER":
                return <TeamNavbar />;
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-slate-50">
            {renderNavbar()}
            <main>
                {children}
            </main>
        </div>
    );
}
