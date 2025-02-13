import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Home from "./pages/home";
import Entrepreneurs from "./pages/entrepreneurs/entrepreneurs";
import Companies from "./pages/companies";
import Login from "./pages/login";
import Register from "./pages/register";
import AdminDashboard from "./pages/adminDashboard";
import Diagnostic from "./pages/Diagnostic";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import RecentLeads from "./components/Dashboard/RecentLeads";
import DiagnosticTable from "./components/Dashboard/DiagnosticTable";
import Graphic from "./components/Dashboard/Graphic";
import UnderConstruction from "./components/UnderConstruction";
import FloatingWhatsApp from "./components/FloatingWhatsApp";
import WhatsAppChat from "./components/WhatsAppChat";
import Calendar from "./components/Dashboard/Calendar";
import AboutUs from "./pages/aboutUs";
import Questions from "./pages/questions";
import Diagnostics from "./components/Dashboard/Diagnostics";
import ClientPanel from "./pages/clientPanel";


function App() {
  const location = useLocation();
  const isDashboardRoute = location.pathname.startsWith("/dashboard");

  return (
    <>
      <AuthProvider>
        {location.pathname !== "/login" &&
          location.pathname !== "/register" &&
          !isDashboardRoute && <Header />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/empresas" element={<Companies />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/aboutUs" element={<AboutUs />} />
          <Route path="/questions" element={<Questions />} />
          <Route path="/panel" element={<ClientPanel />} />
          <Route path="/dashboard" element={<AdminDashboard />}>
            <Route path="diagnostics" element={<Diagnostics />} />
            {/* <Route path='inicio' element={<Graphic/>}/> */}
            <Route path="leads" element={<RecentLeads />} />
            <Route path="services" element={<UnderConstruction />} />
            <Route path="reviews" element={<UnderConstruction />} />
            <Route path="calendar" element={<Calendar />} />
            <Route path="settings" element={<UnderConstruction />} />
            <Route path="logout" />
          </Route>
          <Route path="/emprendedores" element={<Entrepreneurs />} />
          <Route path="/wapps" element={<WhatsAppChat />} />
          <Route
            path="/diagnostic"
            element={
              <ProtectedRoute>
                <Diagnostic />
              </ProtectedRoute>
            }
          />
        </Routes>
        {/* Conditionally show FloatingWhatsApp button */}

        {location.pathname !== '/login' &&
          location.pathname !== '/register' &&
          !isDashboardRoute && <FloatingWhatsApp />}
      </AuthProvider>
    </>
  );
}

export default App;
