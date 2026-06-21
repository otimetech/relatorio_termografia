import StatusBadge from "./StatusBadge";
import ReportHeader from "./ReportHeader";
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
  showCurrentMeasurements?: boolean;
  a1?: string | number | null;
  a2?: string | number | null;
  a3?: string | number | null;
  b1?: string | number | null;
  b2?: string | number | null;
  b3?: string | number | null;
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
  showCurrentMeasurements,
  a1,
  a2,
  a3,
  b1,
  b2,
  b3,
  readings,
  problem,
  classification,
  recommendations
}: OperationalReportProps) => {
  const formatCurrentMeasurement = (phase: string, value?: string | number | null) => {
    if (value === null || value === undefined || value === "") return `${phase} N/A`;
    const normalizedValue = typeof value === "string" ? value.trim() : String(value);
    return `${phase} ${normalizedValue}(A)`;
  };

  const getTempClass = (temp: string, maxAdmissible: string) => {
    const tempNum = parseFloat(temp.replace(/[^0-9.,]/g, "").replace(",", "."));
    const maxNum = parseFloat(maxAdmissible.replace(/[^0-9.,]/g, "").replace(",", "."));
    if (tempNum >= maxNum) return "temperature-high";
    if (tempNum >= maxNum * 0.8) return "temperature-medium";
    return "temperature-normal";
  };

  const getTableClass = () => {
    return status === "critical" ? "operational-report-table-critical" : "operational-report-table";
  };

  const getClassificationBadgeClass = () => {
    return status === "critical" ? "classification-badge-critical" : "classification-badge-alert";
  };

  return <div className="report-page print-break">
      <ReportHeader />
      <div className="flex items-center justify-between mb-4 pt-4 border-b border-border">
        <h2 className="report-title text-lg">RELATÓRIO OPERACIONAL – {id}</h2>
        <StatusBadge status={status} />
      </div>

      {/* Info Table */}
      <div className="overflow-x-auto mb-6">
        <table className={getTableClass()}>
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
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3 print:mb-2">
        <div className="info-card">
          <p className="text-xs text-muted-foreground mb-1">Emissividade</p>
          <p className="font-mono font-semibold">{emissivity}</p>
        </div>
        <div className="info-card">
          <p className="text-xs text-muted-foreground mb-1">Temp. Medida</p>
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
      <div className="grid grid-cols-2 gap-8 mb-2 print:gap-6 print:mb-1 print:break-inside-avoid">
        <div className="thermogram-card flex flex-col items-center">
          {thermalImage ? (
            <img src={thermalImage} alt="Imagem Termográfica" className="report-image h-[150px] object-contain w-full" />
          ) : (
            <div className="image-placeholder h-[150px] w-full">
              <span className="text-xs text-muted-foreground">Sem imagem</span>
            </div>
          )}
          <div className="px-2 pb-2 pt-[0.1rem] print:px-1 print:pb-1 print:pt-[0.1rem] bg-secondary/30 w-full text-center">
            <h4 className="text-xs font-semibold print:text-[10px]">Foto painel</h4>
          </div>
        </div>
        <div className="thermogram-card flex flex-col items-center">
          {realImage ? (
            <img src={realImage} alt="Imagem Real" className="report-image h-[150px] object-contain w-full" />
          ) : (
            <div className="image-placeholder h-[150px] w-full">
              <span className="text-xs text-muted-foreground">Sem imagem</span>
            </div>
          )}
          <div className="px-2 pb-2 pt-[0.1rem] print:px-1 print:pb-1 print:pt-[0.1rem] bg-secondary/30 w-full text-center">
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

      {showCurrentMeasurements && <div className="grid grid-cols-2 gap-4 mb-4 print:gap-3 print:mb-2 print:break-inside-avoid">
        <div className="info-card">
          <h4 className="text-xs font-semibold mb-1 print:text-[10px]">Medição de Corrente (A) ANTES:</h4>
          <div className="flex flex-wrap gap-x-3 gap-y-1 print:gap-x-2">
            <span className="font-mono text-xs print:text-[9px] font-medium">{formatCurrentMeasurement("L1:", a1)}</span>
            <span className="font-mono text-xs print:text-[9px] font-medium">{formatCurrentMeasurement("L2:", a2)}</span>
            <span className="font-mono text-xs print:text-[9px] font-medium">{formatCurrentMeasurement("L3:", a3)}</span>
          </div>
        </div>
        <div className="info-card">
          <h4 className="text-xs font-semibold mb-1 print:text-[10px]">Medição de Corrente (A) DEPOIS da intervenção:</h4>
          <div className="flex flex-wrap gap-x-3 gap-y-1 print:gap-x-2">
            <span className="font-mono text-xs print:text-[9px] font-medium">{formatCurrentMeasurement("L1:", b1)}</span>
            <span className="font-mono text-xs print:text-[9px] font-medium">{formatCurrentMeasurement("L2:", b2)}</span>
            <span className="font-mono text-xs print:text-[9px] font-medium">{formatCurrentMeasurement("L3:", b3)}</span>
          </div>
        </div>
      </div>}

      {/* Problem Description */}
      <div className="report-section">
        <h3 className="report-subtitle">DESCRIÇÃO DO PROBLEMA:</h3>
        <p className="text-foreground mb-4">{problem}</p>
        <div className={`classification-badge ${getClassificationBadgeClass()}`}>
          <span className="text-sm font-medium">Classificação:</span>
          <span className="font-semibold">{classification}</span>
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