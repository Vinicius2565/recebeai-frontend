import { useState } from "react";
import { api } from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import Modal from "../componets/Modal";

function Register() {
  const [login, setLogin] = useState("");
  const [pass, setPass] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"success" | "error">("success");
  const [modalMessage, setModalMessage] = useState("");

  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await api.post("/usuarios/cadastrar", {
        login,
        pass
      });

      setModalType("success");
      setModalMessage("Usuário criado com sucesso!");
      setModalOpen(true);

      // Redireciona depois de 2 segundos
      setTimeout(() => {
        navigate("/");
      }, 2000);

    } catch (error: any) {
      setModalType("error");
      setModalMessage("Erro ao cadastrar usuário.");
      setModalOpen(true);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-4 w-80 mx-auto mt-20">
        <h2 className="text-2xl font-bold text-green-400">
          Criar Conta
        </h2>

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
          onClick={handleRegister}
          className="bg-green-500 p-2 rounded font-bold hover:bg-green-400 transition"
        >
          Cadastrar
        </button>

        <Link
          to="/"
          className="text-green-400 text-sm text-center hover:underline"
        >
          Já tenho conta
        </Link>
      </div>

      <Modal
        open={modalOpen}
        title={modalType === "success" ? "Sucesso" : "Erro"}
        message={modalMessage}
        type={modalType}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}

export default Register;