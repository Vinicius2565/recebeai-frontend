import { useState } from "react";
import { api } from "../services/api";
import { useNavigate, useParams } from "react-router-dom";

function CreateOrder() {
  const { clientId } = useParams();
  const navigate = useNavigate();

  const [nomeProduto, setNomeProduto] = useState("");
  const [quantidade, setQuantidade] = useState(1);
  const [valorUnitario, setValorUnitario] = useState("");
  const [date, setDate] = useState("");

  function formatarData(data: string) {
    const [ano, mes, dia] = data.split("-");
    return `${dia}/${mes}/${ano}`;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!clientId) return;

    const total = Number(valorUnitario) * quantidade;

    const description = `
Nome do Produto: ${nomeProduto}
Quantidade: ${quantidade}
Valor Unitário: R$ ${Number(valorUnitario).toFixed(2)}
Valor Total: R$ ${total.toFixed(2)}
Data: ${formatarData(date)}
    `;

    try {
      await api.post(`/pedidos/cliente/${clientId}`, {
        total,
        date, // envia no formato YYYY-MM-DD para o backend
        description
      });

      navigate(`/clientes/${clientId}/pedidos`);
    } catch (error) {
      console.error("Erro ao criar pedido:", error);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-green-400">
        Novo Pedido
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">

        <input
          type="text"
          placeholder="Nome do Produto"
          value={nomeProduto}
          onChange={(e) => setNomeProduto(e.target.value)}
          required
          className="w-full p-3 rounded bg-gray-800 text-white"
        />

        <input
          type="number"
          placeholder="Quantidade"
          value={quantidade}
          onChange={(e) => setQuantidade(Number(e.target.value))}
          min={1}
          required
          className="w-full p-3 rounded bg-gray-800 text-white"
        />

        <input
          type="number"
          placeholder="Valor Unitário"
          value={valorUnitario}
          onChange={(e) => setValorUnitario(e.target.value)}
          step="0.01"
          required
          className="w-full p-3 rounded bg-gray-800 text-white"
        />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          className="w-full p-3 rounded bg-gray-800 text-white"
        />

        <button
          type="submit"
          className="bg-green-500 px-6 py-3 rounded text-black font-bold hover:bg-green-400 transition"
        >
          Salvar Pedido
        </button>

      </form>
    </div>
  );
}

export default CreateOrder;