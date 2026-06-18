interface StatusBadgeProps {
  status: string;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const map: Record<string, string> = {
    ABERTO: "#2563eb",
    EM_ANDAMENTO: "#f59e0b",
    RESOLVIDO: "#16a34a",
    FECHADO: "#64748b",
    REABERTO: "#dc2626",
    CANCELADO: "#991b1b",
  };

  return (
    <span
      style={{
        background: `${map[status]}20`,
        color: map[status],
        padding: "6px 12px",
        borderRadius: "999px",
        fontWeight: 700,
        fontSize: "0.85rem",
      }}
    >
      {status}
    </span>
  );
}