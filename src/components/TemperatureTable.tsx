interface TemperatureLimit {
  component: string;
  maxTemp: string;
}

const temperatureLimits: TemperatureLimit[] = [
  { component: "Fios encapados", maxTemp: "70°C" },
  { component: "Régua de borne", maxTemp: "70°C" },
  { component: "Cabos isolados até 15 K", maxTemp: "70°C" },
  { component: "Conexões mediante parafusos", maxTemp: "90°C" },
  { component: "Conexões e barramentos de baixa tensão", maxTemp: "90°C" },
  { component: "Conexões de linha de transmissão aérea", maxTemp: "70°C" },
  { component: "Conexões recobertas de prata ou níquel", maxTemp: "90°C" },
  { component: "Fusíveis (corpo)", maxTemp: "100°C" },
  { component: "Seccionadoras", maxTemp: "50°C" },
  { component: "Conexões", maxTemp: "60°C" },
  { component: "Transformadores a óleo - ponto mais quente – (núcleo)", maxTemp: "80°C" },
  { component: "Transformadores a óleo (óleo)", maxTemp: "65°C" },
  { component: "Transformadores a seco", maxTemp: "De 115°C a 180°C*" },
];

const TemperatureTable = () => {
  return (
    <div className="report-section" style={{ breakInside: 'avoid', pageBreakInside: 'avoid' }}>
      <h3 className="report-subtitle">3.4 - Máxima Temperatura Admissível (MTA)</h3>
      <p className="text-xs text-muted-foreground mb-2">
        Utilizam-se como máxima temperatura admissível de componentes de diversos fabricantes, 
        valores indicativos obtidos através de ensaios e experiência em campo:
      </p>
      <table className="data-table w-full text-xs" style={{ breakInside: 'avoid', pageBreakInside: 'avoid' }}>
        <thead>
          <tr>
            <th className="text-left py-1 px-2">Componente</th>
            <th className="text-right py-1 px-2 w-32">Temperatura Máxima</th>
          </tr>
        </thead>
        <tbody>
          {temperatureLimits.map((item, index) => (
            <tr key={index}>
              <td className="py-0.5 px-2">{item.component}</td>
              <td className="py-0.5 px-2 text-right font-mono">{item.maxTemp}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="text-[10px] text-muted-foreground mt-1 italic">
        *De acordo com a classe de isolação do transformador em questão.
      </p>
    </div>
  );
};

export default TemperatureTable;
