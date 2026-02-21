import { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function CreateOrder() {
  const navigate = useNavigate();
  const { clientId } = useParams();

  const [clienteNome, setClienteNome] = useState("");
  const [nomeProduto, setNomeProduto] = useState("");
  const [quantidade, setQuantidade] = useState(1);
  const [valorUnitario, setValorUnitario] = useState("");
  const [date, setDate] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const total = Number(valorUnitario) * quantidade;

    const descricaoFormatada = `
Nome do Produto: ${nomeProduto}
Quantidade: ${quantidade}
Valor Unitário: R$ ${Number(valorUnitario).toFixed(2)}
Valor Total: R$ ${total.toFixed(2)}
Data: ${new Date(date).toLocaleDateString("pt-BR")}
    `;

    try {
      await axios.post(
        `http://localhost:8080/pedidos/cliente/${clientId}`,
        {
          clienteNome,
          description: descricaoFormatada,
          total,
          date,
        }
      );

      navigate("/pedidos");
    } catch (error) {
      console.error("Erro ao criar pedido:", error);
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-green-400">
        Novo Pedido
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">

        <input
          type="text"
          placeholder="Nome do Cliente"
          value={clienteNome}
          onChange={(e) => setClienteNome(e.target.value)}
          required
          className="w-full p-3 rounded bg-gray-900 border border-gray-700"
        />

        <input
          type="text"
          placeholder="Nome do Produto"
          value={nomeProduto}
          onChange={(e) => setNomeProduto(e.target.value)}
          required
          className="w-full p-3 rounded bg-gray-900 border border-gray-700"
        />

        <input
          type="number"
          placeholder="Quantidade"
          value={quantidade}
          onChange={(e) => setQuantidade(Number(e.target.value))}
          min={1}
          required
          className="w-full p-3 rounded bg-gray-900 border border-gray-700"
        />

        <input
          type="number"
          placeholder="Valor Unitário"
          value={valorUnitario}
          onChange={(e) => setValorUnitario(e.target.value)}
          step="0.01"
          required
          className="w-full p-3 rounded bg-gray-900 border border-gray-700"
        />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          className="w-full p-3 rounded bg-gray-900 border border-gray-700"
        />

        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-white"
        >
          Criar Pedido
        </button>
      </form>
    </div>
  );
}