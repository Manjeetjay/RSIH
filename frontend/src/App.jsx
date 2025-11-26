import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import About from "./pages/About";
import Guidelines from "./pages/Guidelines";
import Login from "./pages/Login";
import AdminDashboard from "./pages/dashboard/AdminDashboard";
import ProblemStatements from "./pages/dashboard/admin/ProblemStatements";
import SPOCManagement from "./pages/dashboard/admin/SPOCManagement";
import Registrations from "./pages/dashboard/admin/Registrations";
import Submissions from "./pages/dashboard/admin/Submissions";
import SpocDashboard from "./pages/dashboard/SpocDashboard";
import TeamDashboard from "./pages/dashboard/TeamDashboard";
import TeamDetail from "./pages/dashboard/spoc/TeamDetail";
import RegisterTeam from "./pages/dashboard/spoc/RegisterTeam";
import SubmitIdea from "./pages/dashboard/team/SubmitIdea";
import SubmissionDetail from "./pages/dashboard/team/SubmissionDetail";
import ProtectedRoute from "./components/ProtectedRoutes";
import { AuthProvider } from "./context/AuthContext";
import { AppProvider } from "./context/AppContext";
import SpocRegistration from "./pages/SpocRegistration";
import PublicProblems from "./pages/PublicProblems";
import PublicLayout from "./components/layouts/PublicLayout";
import DashboardLayout from "./components/layouts/DashboardLayout";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppProvider>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<PublicLayout><Landing /></PublicLayout>} />
            <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
            <Route path="/guidelines" element={<PublicLayout><Guidelines /></PublicLayout>} />
            <Route path="/problems" element={<PublicLayout><PublicProblems /></PublicLayout>} />
            <Route path="/login" element={<PublicLayout><Login /></PublicLayout>} />
            <Route path="/spoc-registration" element={<PublicLayout><SpocRegistration /></PublicLayout>} />

            {/* Admin Routes */}
            <Route
              path="/dashboard/admin"
              element={
                <ProtectedRoute role="ADMIN">
                  <DashboardLayout role="ADMIN">
                    <AdminDashboard />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/admin/problems"
              element={
                <ProtectedRoute role="ADMIN">
                  <DashboardLayout role="ADMIN">
                    <ProblemStatements />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/admin/spocs"
              element={
                <ProtectedRoute role="ADMIN">
                  <DashboardLayout role="ADMIN">
                    <SPOCManagement />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/admin/registrations"
              element={
                <ProtectedRoute role="ADMIN">
                  <DashboardLayout role="ADMIN">
                    <Registrations />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/admin/submissions"
              element={
                <ProtectedRoute role="ADMIN">
                  <DashboardLayout role="ADMIN">
                    <Submissions />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />

            {/* SPOC Routes */}
            <Route
              path="/dashboard/spoc"
              element={
                <ProtectedRoute role="SPOC">
                  <DashboardLayout role="SPOC">
                    <SpocDashboard />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/spoc/teams/register"
              element={
                <ProtectedRoute role="SPOC">
                  <DashboardLayout role="SPOC">
                    <RegisterTeam />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/spoc/teams/:id"
              element={
                <ProtectedRoute role="SPOC">
                  <DashboardLayout role="SPOC">
                    <TeamDetail />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />

            {/* Team Routes */}
            <Route
              path="/dashboard/team"
              element={
                <ProtectedRoute role="TEAM_LEADER">
                  <DashboardLayout role="TEAM_LEADER">
                    <TeamDashboard />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/team/problems"
              element={
                <ProtectedRoute role="TEAM_LEADER">
                  <DashboardLayout role="TEAM_LEADER">
                    <TeamDashboard view="problems" />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/team/submission"
              element={
                <ProtectedRoute role="TEAM_LEADER">
                  <DashboardLayout role="TEAM_LEADER">
                    <TeamDashboard view="submission" />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/team/submit"
              element={
                <ProtectedRoute role="TEAM_LEADER">
                  <DashboardLayout role="TEAM_LEADER">
                    <SubmitIdea />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/team/submission/:id"
              element={
                <ProtectedRoute role="TEAM_LEADER">
                  <DashboardLayout role="TEAM_LEADER">
                    <SubmissionDetail />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
          </Routes>
        </AppProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
