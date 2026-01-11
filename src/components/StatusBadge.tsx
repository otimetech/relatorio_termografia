interface StatusBadgeProps {
  status: "normal" | "alert" | "critical" | "maintenance" | "off";
  label?: string;
}

const StatusBadge = ({ status, label }: StatusBadgeProps) => {
  const getStatusConfig = () => {
    switch (status) {
      case "normal":
        return { className: "status-normal", text: label || "NORMAL" };
      case "alert":
        return { className: "status-alert", text: label || "ALERTA" };
      case "critical":
        return { className: "status-critical", text: label || "CRÍTICO" };
      case "maintenance":
        return { className: "status-maintenance", text: label || "EM MANUTENÇÃO" };
      case "off":
        return { className: "status-maintenance", text: label || "DESLIGADO" };
      default:
        return { className: "status-normal", text: label || "NORMAL" };
    }
  };

  const config = getStatusConfig();

  return (
    <span className={`status-badge ${config.className}`}>
      {config.text}
    </span>
  );
};

export default StatusBadge;
