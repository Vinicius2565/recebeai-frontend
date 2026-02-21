interface Props {
  status: string;
}

function StatusBadge({ status }: Props) {
  return (
    <span className="px-3 py-1 rounded bg-green-600 text-white text-sm">
      {status}
    </span>
  );
}

export default StatusBadge;