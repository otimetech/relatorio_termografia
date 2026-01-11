import StatusBadge from "./StatusBadge";
import { StatusType } from "@/types/relatorio";
interface OperationalReportProps {
  id: string;
  area: string;
  equipment: string;
  components: string;
  date: string;
  status: StatusType;
  emissivity: string;
  maxTemp: string;
  maxAdmissibleTemp: string;
  distance: string;
  thermalImage: string;
  realImage: string;
  readings: {
    label: string;
    value: string;
  }[];
  problem: string;
  classification: string;
  recommendations: string[];
}
const OperationalReport = ({
  id,
  area,
  equipment,
  components,
  date,
  status,
  emissivity,
  maxTemp,
  maxAdmissibleTemp,
  distance,
  thermalImage,
  realImage,
  readings,
  problem,
  classification,
  recommendations
}: OperationalReportProps) => {
  const getTempClass = (temp: string, maxAdmissible: string) => {
    const tempNum = parseFloat(temp.replace(/[^0-9.,]/g, "").replace(",", "."));
    const maxNum = parseFloat(maxAdmissible.replace(/[^0-9.,]/g, "").replace(",", "."));
    if (tempNum >= maxNum) return "temperature-high";
    if (tempNum >= maxNum * 0.8) return "temperature-medium";
    return "temperature-normal";
  };
  return <div className="report-page print-break">
      <div className="flex items-center justify-between mb-6">
        <h2 className="report-title">RELATÓRIO OPERACIONAL – {id}</h2>
        <StatusBadge status={status} />
      </div>

      {/* Info Table */}
      <div className="overflow-x-auto mb-6">
        <table className="data-table">
          <thead>
            <tr>
              <th>Área</th>
              <th>Equipamento / TAG</th>
              <th>Componentes</th>
              <th>Data</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{area}</td>
              <td>{equipment}</td>
              <td>{components}</td>
              <td>{date}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Technical Data */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="info-card">
          <p className="text-xs text-muted-foreground mb-1">Emissividade</p>
          <p className="font-mono font-semibold">{emissivity}</p>
        </div>
        <div className="info-card">
          <p className="text-xs text-muted-foreground mb-1">Temp. Máxima</p>
          <p className={`temperature-reading ${getTempClass(maxTemp, maxAdmissibleTemp)}`}>
            {maxTemp}
          </p>
        </div>
        <div className="info-card">
          <p className="text-xs text-muted-foreground mb-1">Temp. Máx. Admissível</p>
          <p className="font-mono font-semibold">{maxAdmissibleTemp}</p>
        </div>
        <div className="info-card">
          <p className="text-xs text-muted-foreground mb-1">Distância</p>
          <p className="font-mono font-semibold">{distance}</p>
        </div>
      </div>

      {/* Images */}
      <div className="grid grid-cols-2 gap-4 mb-2 print:gap-2 print:mb-1 print:break-inside-avoid items-center">
        <div className="thermogram-card flex flex-col items-center">
          <img src={thermalImage} alt="Imagem Termográfica" className="report-image h-[150px] object-contain mx-auto" />
          <div className="p-2 print:p-1 bg-secondary/30 w-full text-center">
            <h4 className="text-xs font-semibold print:text-[10px]">Foto painel</h4>
          </div>
        </div>
        <div className="thermogram-card flex flex-col items-center">
          <img src={realImage} alt="Imagem Real" className="report-image h-[150px] object-contain mx-auto" />
          <div className="p-2 print:p-1 bg-secondary/30 w-full text-center">
            <h4 className="text-xs font-semibold mb-1 print:text-[10px] print:mb-0">Foto termográfica</h4>
            <div className="flex flex-wrap gap-3 print:gap-1 justify-center">
              {readings.map((reading, index) => <div key={index} className="flex items-center gap-1">
                  <span className="text-xs print:text-[9px] text-muted-foreground">{reading.label}:</span>
                  <span className="font-mono text-xs print:text-[9px] font-medium">{reading.value}</span>
                </div>)}
            </div>
          </div>
        </div>
      </div>

      {/* Problem Description */}
      <div className="report-section">
        <h3 className="report-subtitle">DESCRIÇÃO DO PROBLEMA:</h3>
        <p className="text-foreground mb-4">{problem}</p>
        <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-lg">
          <span className="text-sm font-medium">Classificação:</span>
          <span className="font-semibold text-primary">{classification}</span>
        </div>
      </div>

      {/* Recommendations */}
      <div className="report-section">
        <h3 className="report-subtitle">RECOMENDAÇÕES:</h3>
        <ul className="recommendation-list">
          {recommendations.map((rec, index) => <li key={index}>{rec}</li>)}
        </ul>
      </div>

      {/* Feedback Section */}
      <div className="feedback-section print:mt-2 print:pt-2 print:border-t print:border-border print:break-inside-avoid">
        <div className="mb-4 print:mb-2">
          <label className="text-sm font-medium print:text-[10px]">Observações/Feedback:</label>
          <div className="mt-2 print:mt-1 h-16 print:h-10 border-b-2 border-dashed border-border"></div>
        </div>
        <div className="flex items-center gap-4 print:gap-2">
          <span className="text-sm font-medium print:text-[10px]">Manutenção realizada:</span>
          <div className="flex-1 border-b-2 border-dashed border-border"></div>
          <span className="text-sm text-muted-foreground print:text-[10px]">Data: ___/___/___</span>
        </div>
      </div>
    </div>;
};
export default OperationalReport;