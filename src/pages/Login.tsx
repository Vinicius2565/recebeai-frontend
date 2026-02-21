import { useState } from "react";
import { api } from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import Modal from "../componets/Modal";

function Login() {
  const [login, setLogin] = useState("");
  const [pass, setPass] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await api.post("/usuarios/login", {
        login,
        pass
      });

      localStorage.setItem("userId", response.data.id);
      navigate("/clientes");

    } catch (error) {
      setModalOpen(true);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-4 w-80 mx-auto mt-20">
        <h2 className="text-2xl font-bold text-green-400">Login</h2>

        <input
          className="p-2 rounded bg-gray-800 text-white"
          placeholder="Login"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
        />

        <input
          type="password"
          className="p-2 rounded bg-gray-800 text-white"
          placeholder="Senha"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="bg-green-500 p-2 rounded font-bold hover:bg-green-400 transition"
        >
          Entrar
        </button>

        <Link
          to="/register"
          className="text-green-400 text-sm text-center hover:underline"
        >
          Criar conta
        </Link>
      </div>

      <Modal
        open={modalOpen}
        title="Erro no Login"
        message="Login ou senha inválidos."
        type="error"
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}

export default Login;