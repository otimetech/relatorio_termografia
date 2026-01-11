import StatusBadge from "./StatusBadge";

interface Equipment {
  id: number;
  name: string;
  sector: string;
  status: "normal" | "alert" | "critical" | "maintenance" | "off";
  statusLabel?: string;
  observation?: string;
}

interface EquipmentTableProps {
  title: string;
  equipment: Equipment[];
  showObservation?: boolean;
}

const EquipmentTable = ({ title, equipment, showObservation = false }: EquipmentTableProps) => {
  return (
    <div className="report-section">
      <h2 className="report-title">{title}</h2>
      <div className="overflow-x-auto">
        <table className="data-table">
          <thead>
            <tr>
              <th className="w-16">Qtd.</th>
              <th>Painéis</th>
              <th>Setor</th>
              <th>Status</th>
              {showObservation && <th>Obs.</th>}
            </tr>
          </thead>
          <tbody>
            {equipment.map((item) => (
              <tr key={item.id}>
                <td className="font-mono">{item.id}</td>
                <td>{item.name}</td>
                <td>{item.sector}</td>
                <td>
                  <StatusBadge status={item.status} label={item.statusLabel} />
                </td>
                {showObservation && (
                  <td className="text-sm text-primary font-medium">
                    {item.observation}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EquipmentTable;
