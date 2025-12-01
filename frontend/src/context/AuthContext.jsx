import { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const u = sessionStorage.getItem("user");
    return u ? JSON.parse(u) : null;
  });
  const navigate = useNavigate();

  const login = (data) => {
    sessionStorage.setItem("token", data.token);
    sessionStorage.setItem("user", JSON.stringify(data.user));
    setUser(data.user);

    if (data.user.role === "ADMIN") navigate("/dashboard/admin");
    if (data.user.role === "SPOC") navigate("/dashboard/spoc");
    if (data.user.role === "TEAM_LEADER") navigate("/dashboard/team");
  };

  const logout = () => {
    sessionStorage.clear();
    setUser(null);
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
