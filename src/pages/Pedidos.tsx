import { useEffect, useState } from "react";
import axios from "axios";

interface Pedido {
  id: number;
  clienteNome: string | null;
  data: string | null;
  total: number | null;
  descricao: string | null;
  status: "PENDENTE" | "PAGO";
}

export default function Pedidos() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarPedidos();
  }, []);

  async function carregarPedidos() {
    try {
      const response = await axios.get("http://localhost:8080/pedidos");

      // Garante que sempre será um array válido
      const dados = Array.isArray(response.data) ? response.data : [];
      setPedidos(dados);
    } catch (error) {
      console.error("Erro ao carregar pedidos:", error);
      setPedidos([]);
    } finally {
      setLoading(false);
    }
  }

  async function alterarStatus(id: number, statusAtual: string) {
    const novoStatus = statusAtual === "PENDENTE" ? "PAGO" : "PENDENTE";

    try {
      await axios.patch(
        `http://localhost:8080/pedidos/${id}/status?status=${novoStatus}`
      );

      carregarPedidos();
    } catch (error) {
      console.error("Erro ao alterar status:", error);
    }
  }

  async function excluirPedido(id: number) {
    const confirmar = window.confirm("Deseja realmente excluir este pedido?");
    if (!confirmar) return;

    try {
      await axios.delete(`http://localhost:8080/pedidos/${id}`);
      carregarPedidos();
    } catch (error) {
      console.error("Erro ao excluir pedido:", error);
    }
  }

  if (loading) {
    return <p className="text-gray-400">Carregando pedidos...</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-green-400">Pedidos</h1>

      <div className="space-y-4">
        {pedidos.length === 0 && (
          <p className="text-gray-400">Nenhum pedido cadastrado.</p>
        )}

        {pedidos
          .filter((pedido) => pedido != null)
          .map((pedido) => (
            <div
              key={pedido.id}
              className="bg-gray-900 border border-gray-800 rounded-2xl p-5"
            >
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <p className="font-semibold text-white text-lg">
                    {pedido.clienteNome ?? "Cliente não informado"}
                  </p>

                  <div className="text-sm text-gray-300 space-y-1">
                    <p>
                      Valor: R${" "}
                      {Number(pedido.total ?? 0).toFixed(2)}
                    </p>

                    <p>
                      Data:{" "}
                      {pedido.data
                        ? new Date(pedido.data).toLocaleDateString("pt-BR")
                        : "-"}
                    </p>

                    <p>Detalhes:</p>

                    <pre className="text-gray-400 whitespace-pre-wrap">
                      {pedido.descricao ?? "-"}
                    </pre>
                  </div>

                  <button
                    onClick={() =>
                      alterarStatus(pedido.id, pedido.status)
                    }
                    className={`inline-block mt-2 px-3 py-1 text-xs rounded-full transition cursor-pointer ${
                      pedido.status === "PENDENTE"
                        ? "bg-yellow-500 hover:bg-yellow-600 text-white"
                        : "bg-green-600 hover:bg-green-700 text-white"
                    }`}
                  >
                    {pedido.status}
                  </button>
                </div>

                <button
                  onClick={() => excluirPedido(pedido.id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg text-sm transition"
                >
                  Excluir
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}