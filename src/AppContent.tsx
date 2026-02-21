import { Routes, Route, Link, useLocation } from "react-router-dom";
import Clients from "./pages/Clients";
import CreateClient from "./pages/CreateClient";
import Login from "./pages/Login";
import ProtectedRoute from "./routes/ProtectedRoute";
import Register from "./pages/Register";
import Pedidos from "./pages/Pedidos"; // ✅ IMPORT ADICIONADO
import logo from "./assets/logo.png";

function AppContent() {
  const location = useLocation();
  const isLogged = localStorage.getItem("userId");

  return (
    <div className="min-h-screen bg-gray-950 text-white">

      {isLogged && (
        <nav className="bg-gray-900 px-6 py-4 flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
            <img 
              src={logo} 
              alt="RecebeAI Logo" 
              className="h-8 w-8 object-contain"
            />
            <span className="text-xl font-bold text-green-400">
              RecebeAI
            </span>
          </div>

          <div className="flex gap-6">
            <Link to="/clientes" className="hover:text-green-400 transition">
              Clientes
            </Link>

            <Link to="/clientes/novo" className="hover:text-green-400 transition">
              Cadastrar Cliente
            </Link>

            {/* ✅ NOVO LINK */}
            <Link to="/pedidos" className="hover:text-green-400 transition">
              Pedidos
            </Link>
          </div>
        </nav>
      )}
      
      <div className="p-10">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/clientes"
            element={
              <ProtectedRoute>
                <Clients />
              </ProtectedRoute>
            }
          />

          <Route
            path="/clientes/novo"
            element={
              <ProtectedRoute>
                <CreateClient />
              </ProtectedRoute>
            }
          />

          {/* ✅ NOVA ROTA PROTEGIDA */}
          <Route
            path="/pedidos"
            element={
              <ProtectedRoute>
                <Pedidos />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default AppContent;