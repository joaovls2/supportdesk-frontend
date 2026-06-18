interface PriorityBadgeProps {
  prioridade: string;
}

export function PriorityBadge({
  prioridade,
}: PriorityBadgeProps) {
  const map: Record<string, string> = {
    BAIXA: "#16a34a",
    MEDIA: "#f59e0b",
    ALTA: "#ea580c",
    CRITICA: "#dc2626",
  };

  return (
    <span
      style={{
        background: `${map[prioridade]}20`,
        color: map[prioridade],
        padding: "6px 12px",
        borderRadius: "999px",
        fontWeight: 700,
        fontSize: "0.85rem",
      }}
    >
      {prioridade}
    </span>
  );
}