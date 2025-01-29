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

function App() {
  const location = useLocation();
  return (
    <>
      <AuthProvider>
        {location.pathname !== "/login" &&
          location.pathname !== "/register" && <Header />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/empresas" element={<Companies />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<AdminDashboard />} />
          <Route path="/emprendedores" element={<Entrepreneurs />} />
          <Route path="/diagnostic" element={<Diagnostic />} />
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
