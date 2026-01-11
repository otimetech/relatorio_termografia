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
  { label: "EM MANUTENÇÃO", value: 1, color: "bg-muted-foreground" },
  { label: "DESLIGADOS", value: 1, color: "bg-border" },
  { label: "ALARME", value: 3, color: "bg-warning" },
  { label: "CRÍTICO", value: 3, color: "bg-destructive" },
];

const StatusChart = ({ statusData = defaultStatusData }: StatusChartProps) => {
  return (
    <div className="report-section">
      <h2 className="report-title">STATUS DOS EQUIPAMENTOS</h2>
      
      <div className="flex flex-wrap gap-4 mb-6">
        {statusData.map((item, index) => (
          <div 
            key={index} 
            className="flex-1 min-w-[120px] bg-card border border-border rounded-lg p-4 text-center"
          >
            <div className={`w-4 h-4 rounded-full ${item.color} mx-auto mb-2`}></div>
            <p className="text-2xl font-bold font-mono">{item.value}%</p>
            <p className="text-xs text-muted-foreground uppercase">{item.label}</p>
          </div>
        ))}
      </div>

      {/* Visual Bar */}
      <div className="h-8 rounded-lg overflow-hidden flex">
        {statusData.map((item, index) => (
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
