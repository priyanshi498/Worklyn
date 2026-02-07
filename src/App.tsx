import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

/* Landing & Auth */
import Landing from "./pages/Landing";
import Auth from "./pages/Auth";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

/* Onboarding */
import OnboardingRole from "./pages/OnboardingRole";
import BProject from "./pages/BProject";
import ProjectTasks from "./pages/ProjectTasks";

/* Core App */
import Dashboard from "./pages/Dashboard";

/* Projects */
import ProjectList from "./pages/ProjectList";
import CreateProject from "./pages/CreateProject";
import ProjectBoard from "./pages/ProjectBoard";

/* Tasks */
import CreateTask from "./pages/CreateTask";

/* ---------- AUTH HELPERS ---------- */
const isAuthenticated = () => {
  return !!localStorage.getItem("user");
};

/* Protect private routes ONLY */
const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  return isAuthenticated() ? children : <Navigate to="/auth" replace />;
};

function App() {
  return (
    <Routes>
      {/* ---------------- LANDING ---------------- */}
      <Route path="/" element={<Landing />} />

      {/* ---------------- AUTH (NO GUARDS) ---------------- */}
      <Route path="/auth" element={<Auth />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* ---------------- ONBOARDING (PROTECTED) ---------------- */}
      <Route
        path="/onboarding/role"
        element={
          <PrivateRoute>
            <OnboardingRole />
          </PrivateRoute>
        }
      />
      <Route
        path="/onboarding/project"
        element={
          <PrivateRoute>
            <BProject />
          </PrivateRoute>
        }
      />
      <Route
        path="/onboarding/tasks"
        element={
          <PrivateRoute>
            <ProjectTasks />
          </PrivateRoute>
        }
      />

      {/* ---------------- DASHBOARD (PROTECTED) ---------------- */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />

      {/* ---------------- PROJECTS (PROTECTED) ---------------- */}
      <Route
        path="/projects"
        element={
          <PrivateRoute>
            <ProjectList />
          </PrivateRoute>
        }
      />
      <Route
        path="/projects/create"
        element={
          <PrivateRoute>
            <CreateProject />
          </PrivateRoute>
        }
      />
      <Route
        path="/projects/:projectId"
        element={
          <PrivateRoute>
            <ProjectBoard />
          </PrivateRoute>
        }
      />

      {/* ---------------- TASKS (PROTECTED) ---------------- */}
      <Route
        path="/tasks/create"
        element={
          <PrivateRoute>
            <CreateTask />
          </PrivateRoute>
        }
      />

      {/* ---------------- FALLBACK ---------------- */}
      <Route
        path="*"
        element={
          <div style={{ padding: 40 }}>
            <h2>404 – Page not found</h2>
          </div>
        }
      />
    </Routes>
  );
}

export default App;
