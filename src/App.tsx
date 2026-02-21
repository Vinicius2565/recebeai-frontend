import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import Clients from "./pages/Clients";
import CreateClient from "./pages/CreateClient";
import Login from "./pages/Login";
import ProtectedRoute from "./routes/ProtectedRoute";
import Register from "./pages/Register";
import logo from "./assets/logo.png";
import Orders from "./pages/Order";
import CreateOrder from "./pages/CreateOrder";
import Pedidos from "./pages/Pedidos";

function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

function App() {
  const location = useLocation();
  const isLogged = localStorage.getItem("userId");

  return (
    <div className="min-h-screen bg-gray-950 text-white">

      {/* Navbar só aparece se estiver logado */}
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

            <button
              onClick={() => {
                localStorage.removeItem("userId");
                window.location.href = "/";
              }}
              className="hover:text-red-400 transition"
            >
              Sair
            </button>
          </div>

        </nav>
      )}

      <div className="p-10">
        <Routes>

          {/* Rotas públicas */}
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Rotas protegidas */}
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

        <Route
  path="/clientes/:clientId/pedidos"
  element={
    <ProtectedRoute>
      <Orders />
    </ProtectedRoute>
  }
/>

<Route
  path="/clientes/:clientId/pedidos/novo"
  element={
    <ProtectedRoute>
      <CreateOrder />
    </ProtectedRoute>
  }
/>
<Route path="/pedidos" element={<Pedidos />} />
        </Routes>
      </div>

    </div>
  );
}

export default AppWrapper;
