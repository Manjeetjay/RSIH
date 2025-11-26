import { createContext, useState, useEffect, useContext } from "react";
import api from "../services/api";
import { toast } from "react-toastify";

const AppContext = createContext();

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useAppContext must be used within an AppProvider");
    }
    return context;
};

export const AppProvider = ({ children }) => {
    // Problem Statements State
    const [problemStatements, setProblemStatements] = useState([]);

    // SPOC Credentials State
    const [spocCredentials, setSpocCredentials] = useState([]);

    // College Registrations State
    const [collegeRegistrations, setCollegeRegistrations] = useState([]);

    // Team Submissions State
    const [teamSubmissions, setTeamSubmissions] = useState([]);

    // Fetch all data on mount
    useEffect(() => {
        fetchAllData();
    }, []);

    const fetchAllData = async () => {
        await Promise.all([
            fetchProblemStatements(),
            fetchSPOCCredentials(),
            fetchCollegeRegistrations(),
            fetchTeamSubmissions()
        ]);
    };

    // Problem Statements Functions
    const fetchProblemStatements = async () => {
        try {
            const res = await api.get("/api/admin/ps");
            setProblemStatements(res.data);
        } catch (err) {
            console.error("Failed to fetch problem statements:", err);
        }
    };

    const addProblemStatement = async (data) => {
        try {
            const res = await api.post("/api/admin/ps", data);
            setProblemStatements([...problemStatements, res.data]);
            toast.success("Problem statement created successfully");
        } catch (err) {
            toast.error("Failed to create problem statement");
        }
    };

    const updateProblemStatement = async (id, data) => {
        try {
            const res = await api.put(`/api/admin/ps/${id}`, data);
            setProblemStatements(problemStatements.map(ps => ps.id === id ? res.data : ps));
            toast.success("Problem statement updated successfully");
        } catch (err) {
            toast.error("Failed to update problem statement");
        }
    };

    const deleteProblemStatement = async (id) => {
        try {
            await api.delete(`/api/admin/ps/${id}`);
            setProblemStatements(problemStatements.filter(ps => ps.id !== id));
            toast.success("Problem statement deleted successfully");
        } catch (err) {
            toast.error("Failed to delete problem statement");
        }
    };

    // SPOC Credentials Functions
    const fetchSPOCCredentials = async () => {
        try {
            const res = await api.get("/api/admin/spocs");
            setSpocCredentials(res.data);
        } catch (err) {
            console.error("Failed to fetch SPOC credentials:", err);
        }
    };

    const addSPOCCredential = async (data) => {
        try {
            const res = await api.post("/api/admin/spocs", data);
            setSpocCredentials([...spocCredentials, res.data]);
            toast.success("SPOC created successfully");
        } catch (err) {
            toast.error("Failed to create SPOC");
        }
    };

    const updateSPOCCredential = async (id, data) => {
        try {
            const res = await api.put(`/api/admin/spocs/${id}`, data);
            setSpocCredentials(spocCredentials.map(spoc => spoc.id === id ? res.data : spoc));
            toast.success("SPOC updated successfully");
        } catch (err) {
            toast.error("Failed to update SPOC");
        }
    };

    const deleteSPOCCredential = async (id) => {
        try {
            await api.delete(`/api/admin/spocs/${id}`);
            setSpocCredentials(spocCredentials.filter(spoc => spoc.id !== id));
            toast.success("SPOC deleted successfully");
        } catch (err) {
            toast.error("Failed to delete SPOC");
        }
    };

    // College Registrations Functions
    const fetchCollegeRegistrations = async () => {
        try {
            const res = await api.get("/api/admin/registrations");
            setCollegeRegistrations(res.data);
        } catch (err) {
            console.error("Failed to fetch college registrations:", err);
        }
    };

    const approveCollegeRegistration = async (id) => {
        try {
            const res = await api.put(`/api/admin/registrations/${id}/approve`);
            setCollegeRegistrations(collegeRegistrations.map(reg => reg.id === id ? res.data : reg));
            toast.success("Registration approved successfully");
        } catch (err) {
            toast.error("Failed to approve registration");
        }
    };

    const rejectCollegeRegistration = async (id) => {
        try {
            await api.delete(`/api/admin/registrations/${id}`);
            setCollegeRegistrations(collegeRegistrations.filter(reg => reg.id !== id));
            toast.success("Registration rejected successfully");
        } catch (err) {
            toast.error("Failed to reject registration");
        }
    };

    // Team Submissions Functions
    const fetchTeamSubmissions = async () => {
        try {
            const res = await api.get("/api/admin/submissions");
            setTeamSubmissions(res.data);
        } catch (err) {
            console.error("Failed to fetch team submissions:", err);
        }
    };

    const value = {
        // Problem Statements
        problemStatements,
        addProblemStatement,
        updateProblemStatement,
        deleteProblemStatement,

        // SPOC Credentials
        spocCredentials,
        addSPOCCredential,
        updateSPOCCredential,
        deleteSPOCCredential,

        // College Registrations
        collegeRegistrations,
        approveCollegeRegistration,
        rejectCollegeRegistration,

        // Team Submissions
        teamSubmissions,

        // Refresh function
        refreshData: fetchAllData
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
