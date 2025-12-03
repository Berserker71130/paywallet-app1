import Topbar from "./components/Topbar";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import TransactionsPage from "./pages/TransactionsPage";
import SettingsPage from "./pages/SettingsPage";
import Sidebar from "./components/Sidebar";
import PaymentsPage from "./pages/PaymentsPage";
import HomePage from "./pages/HomePage";
import MockLogin from "./components/MockLogin";
import { useState } from "react";

const ProtectedRoute = ({ children, isAuthenticated }) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const getPageTitle = (pathname) => {
  if (pathname === "/") return null;

  const parts = pathname.split("/").filter((p) => p.length > 0);
  if (parts.length === 0) return "";

  return parts[0].charAt(0).toUpperCase() + parts[0].slice(1).replace("-", "");
};

const AppLayout = ({ title }) => {
  return (
    <div className="h-screen flex bg-gray-50 overflow-hidden">
      <div className="md:block flex-shrink-0">
        <Sidebar />
      </div>

      <div className="flex-1 flex flex-col">
        <Topbar title={title} />

        <main className="flex-1 flex flex-col h-full">
          <div className="flex-1 overflow-y-auto min-h-0">
            <div className="max-w-7xl w-full mx-auto">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/transactions" element={<TransactionsPage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/payments" element={<PaymentsPage />} />
              </Routes>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

const AppContent = ({ isAuthenticated, setIsAuthenticated }) => {
  const location = useLocation();
  const title = getPageTitle(location.pathname);

  return (
    <Routes>
      <Route
        path="/login"
        element={<MockLogin setIsAuthenticated={setIsAuthenticated} />}
      />

      <Route
        path="/*"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <AppLayout title={title} />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const storedAuth = localStorage.getItem("isAuthenticated");
    return storedAuth === "true";
  });
  return (
    <Router>
      <AppContent
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
      />
    </Router>
  );
}

export default App;
