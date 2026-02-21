import { useState } from "react";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";

function CreateClient() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const userId = localStorage.getItem("userId");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await api.post(`/clientes/usuario/${userId}`, {
        name,
        phone,
      });

      navigate("/clientes");
    } catch (error) {
      console.error("Erro ao cadastrar cliente:", error);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-green-400">
        Novo Cliente
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 rounded bg-gray-800"
          required
        />

        <input
          type="text"
          placeholder="Telefone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full p-3 rounded bg-gray-800"
        />

        <button
          type="submit"
          className="bg-green-500 px-6 py-3 rounded text-sm hover:bg-green-600 transition"
        >
          Cadastrar
        </button>
      </form>
    </div>
  );
}

export default CreateClient;
