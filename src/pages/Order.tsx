import { useEffect, useState } from "react";
import { api } from "../services/api";
import { useNavigate, useParams } from "react-router-dom";

interface Order {
  id: number;
  description: string;
  status: "PENDENTE" | "FINALIZADO";
}

function Orders() {
  const { clientId } = useParams();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [pedidoParaExcluir, setPedidoParaExcluir] = useState<number | null>(null);

  useEffect(() => {
    if (!clientId) return;
    carregarPedidos();
  }, [clientId]);

  async function carregarPedidos() {
    try {
      const response = await api.get(`/pedidos/cliente/${clientId}`);
      setOrders(response.data);
    } catch (error) {
      console.error("Erro ao carregar pedidos:", error);
    }
  }

  async function alterarStatus(id: number, statusAtual: string) {
    if (statusAtual === "FINALIZADO") return;

    try {
      await api.patch(`/pedidos/${id}/finalizar`);
      carregarPedidos();
    } catch (error) {
      console.error("Erro ao alterar status:", error);
    }
  }

  async function confirmarExclusao() {
    if (!pedidoParaExcluir) return;

    try {
      await api.delete(`/pedidos/${pedidoParaExcluir}`);
      setPedidoParaExcluir(null);
      carregarPedidos();
    } catch (error) {
      console.error("Erro ao excluir pedido:", error);
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-green-400">
        Pedidos
      </h1>

      <button
        onClick={() => navigate(`/clientes/${clientId}/pedidos/novo`)}
        className="mb-4 bg-green-500 px-4 py-2 rounded text-black"
      >
        + Novo Pedido
      </button>

      <div className="space-y-4">
        {orders.length === 0 && (
          <p className="text-gray-400">
            Nenhum pedido cadastrado.
          </p>
        )}

        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-gray-900 p-6 rounded-2xl flex justify-between items-start"
          >
            <div className="whitespace-pre-line text-white">
              {order.description}
            </div>

            <div className="flex flex-col gap-2">
              <button
                onClick={() => alterarStatus(order.id, order.status)}
                className={`px-4 py-2 rounded text-sm text-white ${
                  order.status === "FINALIZADO"
                    ? "bg-green-600 cursor-default"
                    : "bg-yellow-600 hover:bg-yellow-700"
                }`}
              >
                {order.status}
              </button>

              {order.status === "FINALIZADO" && (
                <button
                  onClick={() => setPedidoParaExcluir(order.id)}
                  className="px-4 py-2 rounded text-sm text-white bg-red-600 hover:bg-red-700"
                >
                  Excluir
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* MODAL BONITO */}
      {pedidoParaExcluir && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60">
          <div className="bg-gray-800 p-6 rounded-2xl w-96 text-center">
            <h2 className="text-xl font-bold mb-4 text-white">
              Confirmar Exclusão
            </h2>

            <p className="text-gray-300 mb-6">
              Tem certeza que deseja excluir este pedido?
            </p>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => setPedidoParaExcluir(null)}
                className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-700 text-white"
              >
                Cancelar
              </button>

              <button
                onClick={confirmarExclusao}
                className="px-4 py-2 bg-red-600 rounded hover:bg-red-700 text-white"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Orders;