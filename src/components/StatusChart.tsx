interface StatusData {
  label: string;
  value: number;
  color: string;
}

interface StatusChartProps {
  statusData?: StatusData[];
}

const defaultStatusData: StatusData[] = [
  { label: "NORMAIS", value: 92, color: "bg-success" },
  { label: "CRÍTICO", value: 3, color: "bg-destructive" },
  { label: "ALARME", value: 3, color: "bg-warning" },
  { label: "EM MANUTENÇÃO", value: 1, color: "bg-muted-foreground" },
  { label: "DESLIGADOS", value: 1, color: "bg-border" },
];

const StatusChart = ({ statusData = defaultStatusData }: StatusChartProps) => {
  // Reordenar para: NORMAIS, CRÍTICO, ALARME, EM MANUTENÇÃO, DESLIGADOS
  const orderedLabels = ["NORMAIS", "CRÍTICO", "ALARME", "EM MANUTENÇÃO", "DESLIGADOS"];
  const orderedData = orderedLabels
    .map(label => statusData.find(item => item.label === label))
    .filter((item): item is StatusData => item !== undefined);

  const firstRow = orderedData.slice(0, 3);
  const secondRow = orderedData.slice(3, 5);

  return (
    <div className="report-section">
      <h2 className="report-title">STATUS DOS EQUIPAMENTOS</h2>
      
      {/* First Row: NORMAIS, CRÍTICO, ALARME */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        {firstRow.map((item, index) => (
          <div 
            key={index} 
            className="bg-card border border-border rounded-lg p-4 text-center"
          >
            <div className={`w-4 h-4 rounded-full ${item.color} mx-auto mb-2`}></div>
            <p className="text-2xl font-bold font-mono">{item.value}%</p>
            <p className="text-xs text-muted-foreground uppercase">{item.label}</p>
          </div>
        ))}
      </div>

      {/* Second Row: EM MANUTENÇÃO, DESLIGADOS */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {secondRow.map((item, index) => (
          <div 
            key={index} 
            className="bg-card border border-border rounded-lg p-4 text-center"
          >
            <div className={`w-4 h-4 rounded-full ${item.color} mx-auto mb-2`}></div>
            <p className="text-2xl font-bold font-mono">{item.value}%</p>
            <p className="text-xs text-muted-foreground uppercase">{item.label}</p>
          </div>
        ))}
      </div>

      {/* Visual Bar */}
      <div className="h-8 rounded-lg overflow-hidden flex">
        {orderedData.map((item, index) => (
          <div 
            key={index}
            className={`${item.color} transition-all duration-300`}
            style={{ width: `${item.value}%` }}
            title={`${item.label}: ${item.value}%`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default StatusChart;
