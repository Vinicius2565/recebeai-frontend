import { useEffect, useState } from "react";
import { api } from "../services/api";
import StatusBadge from "../componets/StatusBadge";
import { useNavigate } from "react-router-dom";

interface Client {
  id: number;
  name: string;
  phone: string;
  statusPayment?: string;
}

function Clients() {
  const navigate = useNavigate();
  const [clientes, setClientes] = useState<Client[]>([]);
  const [clientToDelete, setClientToDelete] = useState<Client | null>(null);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;

    api.get(`/clientes/usuario/${userId}`)
      .then(response => setClientes(response.data))
      .catch(error => console.error("Erro ao buscar clientes:", error));
  }, []);

  const confirmDelete = async () => {
    if (!clientToDelete) return;

    try {
      await api.delete(`/clientes/${clientToDelete.id}`);

      setClientes(prev =>
        prev.filter(cliente => cliente.id !== clientToDelete.id)
      );

      setClientToDelete(null);
    } catch (error) {
      console.error("Erro ao excluir cliente:", error);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-green-400">
        Clientes
      </h1>

      <button
        onClick={() => navigate("/clientes/novo")}
        className="mb-6 bg-green-500 px-4 py-2 rounded text-black font-semibold hover:bg-green-400 transition"
      >
        + Novo Cliente
      </button>

      <div className="space-y-4">
        {clientes.map(cliente => (
          <div
            key={cliente.id}
            onClick={() => navigate(`/clientes/${cliente.id}/pedidos`)}
            className="bg-gray-900 p-6 rounded-2xl flex justify-between items-center cursor-pointer hover:bg-gray-800 transition"
          >
            <div>
              <h3 className="font-bold text-lg">{cliente.name}</h3>
              <p className="text-sm text-gray-400">{cliente.phone}</p>
            </div>

            <div
              className="flex items-center gap-4"
              onClick={(e) => e.stopPropagation()}
            >
              {cliente.statusPayment && (
                <StatusBadge status={cliente.statusPayment} />
              )}

              <button
                onClick={() => setClientToDelete(cliente)}
                className="bg-red-600 px-3 py-1 rounded text-sm hover:bg-red-700 transition"
              >
                Excluir
              </button>
            </div>
          </div>
        ))}

        {clientes.length === 0 && (
          <p className="text-gray-500 text-center mt-10">
            Nenhum cliente cadastrado ainda.
          </p>
        )}
      </div>

      {/* MODAL */}
      {clientToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">

          <div className="bg-gray-900 p-8 rounded-2xl w-96 shadow-2xl animate-fadeIn">

            <h2 className="text-xl font-bold mb-4 text-white">
              Confirmar exclusão
            </h2>

            <p className="text-gray-300 mb-6">
              Deseja realmente excluir{" "}
              <span className="text-green-400 font-semibold">
                {clientToDelete.name}
              </span>
              ?
            </p>

            <div className="flex justify-end gap-4">
              <button
                onClick={() => setClientToDelete(null)}
                className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 transition"
              >
                Cancelar
              </button>

              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 rounded hover:bg-red-700 transition"
              >
                Excluir
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}

export default Clients;