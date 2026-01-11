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
  { component: "Transformadores a óleo (núcleo)", maxTemp: "80°C" },
  { component: "Transformadores a óleo (óleo)", maxTemp: "65°C" },
  { component: "Transformadores a seco", maxTemp: "115°C a 180°C*" },
];

const TemperatureTable = () => {
  return (
    <div className="report-section">
      <h3 className="report-subtitle">3.4 - Máxima Temperatura Admissível (MTA)</h3>
      <p className="text-sm text-muted-foreground mb-4">
        Utilizam-se como máxima temperatura admissível de componentes de diversos fabricantes, 
        valores indicativos obtidos através de ensaios e experiência em campo:
      </p>
      <div className="overflow-x-auto">
        <table className="data-table">
          <thead>
            <tr>
              <th>Componente</th>
              <th className="w-40">Temperatura Máxima</th>
            </tr>
          </thead>
          <tbody>
            {temperatureLimits.map((item, index) => (
              <tr key={index}>
                <td>{item.component}</td>
                <td className="font-mono font-medium">{item.maxTemp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-muted-foreground mt-2 italic">
        *De acordo com a classe de isolação do transformador em questão.
      </p>
    </div>
  );
};

export default TemperatureTable;
