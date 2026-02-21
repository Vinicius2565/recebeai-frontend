interface ModalProps {
  open: boolean;
  title: string;
  message: string;
  type?: "success" | "error";
  onClose: () => void;
}

function Modal({ open, title, message, type = "error", onClose }: ModalProps) {
  if (!open) return null;

  const bgColor =
    type === "success" ? "bg-green-600" : "bg-red-600";

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
      <div className="bg-gray-900 p-6 rounded-2xl w-96 text-center shadow-2xl">
        <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 ${bgColor}`}>
          <span className="text-white text-2xl font-bold">
            {type === "success" ? "✓" : "!"}
          </span>
        </div>

        <h2 className="text-xl font-bold mb-2 text-white">
          {title}
        </h2>

        <p className="text-gray-300 mb-6">
          {message}
        </p>

        <button
          onClick={onClose}
          className="bg-white text-black px-6 py-2 rounded hover:bg-gray-200 transition"
        >
          Fechar
        </button>
      </div>
    </div>
  );
}

export default Modal;