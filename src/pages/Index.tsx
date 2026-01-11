import ReportHeader from "@/components/ReportHeader";
import StatusBadge from "@/components/StatusBadge";
import EquipmentTable from "@/components/EquipmentTable";
import OperationalReport from "@/components/OperationalReport";
import TemperatureTable from "@/components/TemperatureTable";
import StatusChart from "@/components/StatusChart";

import logoJundpred from "@/assets/logo-jundpred.jpg";
import termografiaCover from "@/assets/termografia-cover.jpg";
import termografiaRo01 from "@/assets/termografia-ro01.jpg";
import termografiaRo01Real from "@/assets/termografia-ro01-real.jpg";
import termografiaRo02 from "@/assets/termografia-ro02.jpg";
import termografiaRo02Real from "@/assets/termografia-ro02-real.jpg";
import termografiaRo03 from "@/assets/termografia-ro03.jpg";
import termografiaRo03Real from "@/assets/termografia-ro03-real.jpg";
import termografiaRo04 from "@/assets/termografia-ro04.jpg";
import termografiaRo04Real from "@/assets/termografia-ro04-real.jpg";

const criticalEquipment = [
  { id: 15, name: "QD Iluminação (ao lado QL Inferior)", sector: "Logística", status: "alert" as const, observation: "VIDE R.O. 01" },
  { id: 29, name: "QGBT 440V", sector: "Líquidos", status: "alert" as const, observation: "VIDE R.O. 02" },
  { id: 43, name: "Extrusora AX", sector: "Laboratório", status: "critical" as const, observation: "VIDE R.O. 03" },
  { id: 65, name: "Painel exaustor sólidos", sector: "Sólidos", status: "alert" as const, observation: "VIDE R.O. 04" },
];

const allEquipment = [
  { id: 1, name: "Painel bomba de incêndio", sector: "Externa", status: "normal" as const, statusLabel: "ENERGIZADO - NORMAL" },
  { id: 2, name: "Painel caixa de água", sector: "Externa", status: "normal" as const, statusLabel: "ENERGIZADO - NORMAL" },
  { id: 3, name: "Portaria", sector: "Externa", status: "normal" as const },
  { id: 4, name: "Poste", sector: "Externa", status: "normal" as const },
  { id: 5, name: "Cubículo Entrada", sector: "Cabine Primária", status: "normal" as const },
  { id: 6, name: "Cubículo Saída", sector: "Cabine Primária", status: "normal" as const },
  { id: 7, name: "Caixa de passagem (atrás da cabine)", sector: "Cabine Primária", status: "normal" as const },
  { id: 8, name: "Cubículo alta", sector: "Cabine secundária", status: "normal" as const },
  { id: 9, name: "Transformador", sector: "Cabine secundária", status: "normal" as const },
  { id: 10, name: "QL Superior", sector: "ADM", status: "normal" as const },
  { id: 11, name: "Painel RH", sector: "ADM", status: "normal" as const },
  { id: 12, name: "QNB 1 Servidor", sector: "ADM", status: "normal" as const },
  { id: 13, name: "QD Disj NoBreak", sector: "ADM", status: "normal" as const },
  { id: 14, name: "NoBreak ADM", sector: "ADM", status: "normal" as const },
  { id: 15, name: "QD Iluminação (ao lado QL Inferior)", sector: "Logística", status: "alert" as const, statusLabel: "ALERTA (VIDE R.O. 01)" },
  { id: 16, name: "QL Inferior", sector: "Logística", status: "normal" as const },
  { id: 17, name: "QTN 01", sector: "Logística", status: "normal" as const },
  { id: 18, name: "QTE 01", sector: "Logística", status: "normal" as const },
  { id: 19, name: "HS 70", sector: "QGBT Líquidos", status: "normal" as const },
  { id: 20, name: "MO 81", sector: "QGBT Líquidos", status: "normal" as const },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-5xl mx-auto">
        
        {/* Cover Page */}
        <div className="report-page print-break text-center">
          <div className="mb-8">
            <img 
              src={logoJundpred} 
              alt="JundPred - Manutenção Preditiva" 
              className="h-24 mx-auto mb-6"
            />
            <h1 className="text-3xl font-bold text-primary mb-2">MANUTENÇÃO PREDITIVA</h1>
          </div>

          <div className="bg-primary text-primary-foreground py-4 px-6 rounded-lg mb-8">
            <h2 className="text-2xl font-bold">RELATÓRIO DE MANUTENÇÃO PREDITIVA</h2>
            <p className="text-lg mt-2">REF. INSPEÇÃO TERMOGRÁFICA</p>
          </div>

          <div className="mb-8">
            <img 
              src={termografiaCover} 
              alt="Imagem Termográfica" 
              className="max-w-md mx-auto rounded-lg shadow-lg"
            />
          </div>

          <div className="grid grid-cols-2 gap-8 text-left max-w-lg mx-auto">
            <div>
              <p className="text-muted-foreground text-sm">Local:</p>
              <p className="font-semibold">Jundiaí - SP</p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Aplicação:</p>
              <p className="font-semibold">Painéis de distribuição</p>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-border">
            <p className="text-sm text-muted-foreground">www.jundpred.com.br</p>
          </div>
        </div>

        {/* Letter Page */}
        <div className="report-page print-break">
          <ReportHeader />
          
          <div className="text-right text-sm text-muted-foreground mb-8">
            Jundiaí, 25 de julho de 2025.
          </div>

          <div className="mb-8">
            <p className="text-sm text-muted-foreground">A/C:</p>
            <p className="font-semibold">Seu nome aqui</p>
            <p className="text-muted-foreground">Departamento de Manutenção</p>
          </div>

          <div className="mb-8">
            <h2 className="report-title">Relatório de Manutenção Preditiva por INSPEÇÃO TERMOGRÁFICA</h2>
            <p className="text-foreground leading-relaxed">
              da planta da fábrica da <strong>Sua empresa aqui</strong> (Itupeva / SP), 
              referente à inspeção realizada no dia <strong>15 de Julho de 2025</strong> nos painéis de distribuição.
            </p>
          </div>

          <div className="mb-8">
            <p className="mb-4">Atenciosamente,</p>
            <div className="border-l-4 border-primary pl-4">
              <p className="font-semibold">Luís Henrique Guimarães Stefani</p>
              <p className="text-muted-foreground text-sm">Diretor Comercial</p>
              <p className="text-sm mt-2">luis@jundpred.com.br</p>
              <p className="text-sm">Tel.: (11) 2817-0616</p>
              <p className="text-sm">Cel.: (11) 98112-2244</p>
            </div>
          </div>
        </div>

        {/* Technical Info Page */}
        <div className="report-page print-break">
          <ReportHeader />
          
          <h2 className="report-title">RELATÓRIO DE INSPEÇÃO TERMOGRÁFICA</h2>

          <div className="report-section">
            <h3 className="report-subtitle">1 - PRINCÍPIOS DA TERMOGRAFIA:</h3>
            <p className="text-sm text-foreground leading-relaxed">
              A técnica de inspeção empregada é um tipo de ensaio não destrutivo que permite a determinação 
              de temperaturas e o exame das distribuições de calor em componentes ou equipamentos de processos 
              a partir da radiação infravermelha emitida pelos mesmos. As imagens térmicas resultantes, 
              denominadas termogramas, são mostradas a cores neste relatório.
            </p>
          </div>

          <div className="report-section">
            <h3 className="report-subtitle">2 - APLICAÇÕES</h3>
            <p className="text-sm text-foreground leading-relaxed">
              A Termografia se aplica aos programas de manutenção preventiva e preditiva nas mais diversas 
              indústrias, tais como: Papel, Plásticos, Têxtil, Celulose, Siderúrgica, Petroquímica, Vidreira, 
              Cimento, Concessionárias de Energia Elétrica, Mineração, etc.
            </p>
          </div>

          <div className="report-section">
            <h3 className="report-subtitle">3 - CRITÉRIOS DE LOCALIZAÇÃO DE PONTOS AQUECIDOS</h3>
            
            <div className="space-y-4 text-sm">
              <div>
                <p className="font-medium text-primary">3.1</p>
                <p className="text-foreground">
                  No instante em que inspeciona um componente elétrico, o inspetor da Jundpred realiza uma 
                  rigorosa seleção preliminar para determinar se este componente se encontra em situação 
                  normal ou não.
                </p>
              </div>
              <div>
                <p className="font-medium text-primary">3.2</p>
                <p className="text-foreground">
                  Esta pré-seleção é feita utilizando-se equipamentos Termovisores de última geração e 
                  equipamentos adicionais tais como Anemômetro e Alicate Amperímetro de alta precisão.
                </p>
              </div>
              <div>
                <p className="font-medium text-primary">3.3</p>
                <p className="text-foreground">
                  Nesta fase, são anotadas a temperatura do componente, a temperatura ambiente, a temperatura 
                  máxima admissível do componente, a velocidade do vento, a carga nominal e a carga do 
                  componente no momento da medição.
                </p>
              </div>
            </div>
          </div>

          <TemperatureTable />
        </div>

        {/* Methodology Page */}
        <div className="report-page print-break">
          <ReportHeader />

          <div className="space-y-6 text-sm">
            <div>
              <p className="font-medium text-primary">3.5</p>
              <p className="text-foreground">
                As falhas elétricas detectadas são classificadas segundo critérios de prioridades de 
                manutenção, calculando-se a temperatura que o componente teria em condição padrão de funcionamento.
              </p>
            </div>
            <div>
              <p className="font-medium text-primary">3.6</p>
              <p className="text-foreground">
                Entende-se por manutenção não apenas a troca do componente, como também a limpeza e/ou reaperto. 
                A observação de um componente envolve a verificação periódica da evolução térmica.
              </p>
            </div>
            <div>
              <p className="font-medium text-primary">3.7</p>
              <p className="text-foreground">
                Por uma questão de aproveitamento de tempo de inspeção, a execução de termogramas e imagens 
                térmicas que ilustram o relatório é reservada apenas aos equipamentos anormalmente aquecidos 
                de maior importância ou a critério do contratante.
              </p>
            </div>
          </div>

          <div className="report-section mt-8">
            <h3 className="report-subtitle">4 - CONCLUSÃO</h3>
            <div className="space-y-4 text-sm">
              <div>
                <p className="font-medium text-primary">4.1</p>
                <p className="text-foreground">
                  Recomendamos que sejam realizadas as manutenções nos equipamentos com temperaturas anormais 
                  listados neste relatório.
                </p>
              </div>
              <div>
                <p className="font-medium text-primary">4.2</p>
                <p className="text-foreground">
                  Colocamo-nos à disposição para esclarecer quaisquer dúvidas a respeito de nossos serviços.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Critical Equipment List */}
        <div className="report-page print-break">
          <ReportHeader />
          <EquipmentTable 
            title="LISTAGEM DOS BARRAMENTOS EM ALARME / CRÍTICOS" 
            equipment={criticalEquipment}
            showObservation={true}
          />
        </div>

        {/* Full Equipment List */}
        <div className="report-page print-break">
          <ReportHeader />
          <EquipmentTable 
            title="LISTAGEM DOS PAINÉIS E EQUIPAMENTOS" 
            equipment={allEquipment}
          />
        </div>

        {/* Status Overview */}
        <div className="report-page print-break">
          <ReportHeader />
          <StatusChart />
        </div>

        {/* Operational Reports Header */}
        <div className="report-page">
          <ReportHeader />
          <h2 className="report-title text-center text-3xl">RELATÓRIOS OPERACIONAIS</h2>
          <p className="text-center text-muted-foreground">
            Detalhamento das ocorrências encontradas durante a inspeção termográfica
          </p>
        </div>

        {/* R.O. 01 */}
        <OperationalReport
          id="01"
          area="Logística"
          equipment="QD Iluminação (ao lado QL Inferior)"
          components="Conexões"
          date="15/07/2025"
          status="alert"
          emissivity="0.95"
          maxTemp="41,6 °C"
          maxAdmissibleTemp="70°C"
          distance="≈1 m"
          thermalImage={termografiaRo01}
          realImage={termografiaRo01Real}
          readings={[
            { label: "Sp1", value: "35,1 °C" },
            { label: "Sp2", value: "41,6 °C" },
            { label: "FLIR", value: "25,2 °C" },
          ]}
          problem="A conexão em destaque encontra-se com diferença de temperatura entre as fases."
          classification="INTERVENÇÃO PROGRAMADA"
          recommendations={[
            "Limpeza e reaperto das conexões",
            "Verificar distribuição neste sistema",
            "Verificar a integridade dos cabos e contatores",
            "Caso necessário, efetuar a troca dos componentes danificados",
            "Após intervenção realizar nova medição para verificar a eficácia do procedimento",
          ]}
        />

        {/* R.O. 02 */}
        <OperationalReport
          id="02"
          area="Líquidos"
          equipment="QGBT 440V"
          components="Conexões"
          date="15/07/2025"
          status="alert"
          emissivity="0.95"
          maxTemp="56,2 °C"
          maxAdmissibleTemp="70°C"
          distance="≈1 m"
          thermalImage={termografiaRo02}
          realImage={termografiaRo02Real}
          readings={[
            { label: "Sp1", value: "56,2 °C" },
            { label: "Sp2", value: "47,6 °C" },
            { label: "Sp3", value: "41,4 °C" },
            { label: "FLIR", value: "19,0 °C" },
          ]}
          problem="As conexões em destaque encontram-se com diferença de temperatura entre as fases."
          classification="INTERVENÇÃO PROGRAMADA"
          recommendations={[
            "Limpeza e reaperto das conexões",
            "Verificar distribuição neste sistema",
            "Verificar a integridade dos cabos e contatores",
            "Caso necessário, efetuar a troca dos componentes danificados",
            "Após intervenção realizar nova medição para verificar a eficácia do procedimento",
          ]}
        />

        {/* R.O. 03 */}
        <OperationalReport
          id="03"
          area="Laboratório"
          equipment="Extrusora AX"
          components="Conexões"
          date="15/07/2025"
          status="critical"
          emissivity="0.95"
          maxTemp="87,6 °C"
          maxAdmissibleTemp="70°C"
          distance="≈1 m"
          thermalImage={termografiaRo03}
          realImage={termografiaRo03Real}
          readings={[
            { label: "Sp1", value: "87,6 °C" },
            { label: "Sp2", value: "63,1 °C" },
            { label: "Sp3", value: "82,1 °C" },
            { label: "Sp4", value: "68,4 °C" },
            { label: "FLIR", value: "22,9 °C" },
          ]}
          problem="As conexões em destaque encontram-se com diferença de temperatura entre as fases."
          classification="INTERVENÇÃO IMEDIATA"
          recommendations={[
            "Limpeza e reaperto das conexões",
            "Verificar distribuição neste sistema",
            "Verificar a integridade das chaves, fusíveis e conexões",
            "Caso necessário, efetuar a troca dos componentes danificados",
            "Após intervenção realizar nova medição para verificar a eficácia do procedimento",
          ]}
        />

        {/* R.O. 04 */}
        <OperationalReport
          id="04"
          area="Sólidos"
          equipment="Painel exaustor sólidos 440V"
          components="Fan"
          date="15/07/2025"
          status="alert"
          emissivity="0.95"
          maxTemp="76,4 °C"
          maxAdmissibleTemp="50°C"
          distance="≈1 m"
          thermalImage={termografiaRo04}
          realImage={termografiaRo04Real}
          readings={[
            { label: "Sp1", value: "76,4 °C" },
            { label: "FLIR", value: "30,3 °C" },
          ]}
          problem="A fan da fonte chaveada se encontra travada."
          classification="INTERVENÇÃO PROGRAMADA"
          recommendations={[
            "Realizar a troca da fan fonte chaveada, caso não haja a possibilidade, realizar a troca da fonte",
          ]}
        />

        {/* Final Considerations */}
        <div className="report-page print-break">
          <ReportHeader />
          
          <h2 className="report-title">CONSIDERAÇÕES FINAIS</h2>
          
          <div className="bg-secondary/30 rounded-lg p-6 mb-8">
            <p className="text-foreground leading-relaxed mb-4">
              Afirmamos que são boas as condições gerais dos painéis e equipamentos que foram objeto desta inspeção. 
              Ressaltamos que é importante que as recomendações, por nós apresentadas neste relatório, sejam 
              devidamente seguidas para que os problemas atuais que detectamos não se agravem e para que se 
              evitem outros problemas.
            </p>
            <p className="text-primary font-semibold">
              Muito obrigado pela confiança.
            </p>
          </div>

          <div className="mb-8">
            <p className="mb-4">Atenciosamente,</p>
            <div className="border-l-4 border-primary pl-4">
              <p className="font-semibold">Paulo dos Santos Filho</p>
              <p className="text-muted-foreground text-sm">DEPTO. DE PREDITIVA</p>
              <p className="text-sm mt-2">paulo.santos@jundpred.com.br</p>
              <p className="text-sm">Tel.: (11) 2817-0616</p>
            </div>
          </div>
        </div>

        {/* Services Page */}
        <div className="report-page">
          <ReportHeader />
          
          <h2 className="report-title">OUTROS SERVIÇOS</h2>
          
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            {[
              { title: "Análise de Vibrações", desc: "Off-line e on-line, solo e estrutural" },
              { title: "Inspeção Termográfica", desc: "Painéis, cabines, fornos, mancais, etc." },
              { title: "Alinhamento a Laser", desc: "De eixos e polias + calços calibrados" },
              { title: "Balanceamento Dinâmico", desc: "Realizado no local – 1 a 4 planos" },
              { title: "Ultrassom – Caça Vazamentos", desc: "Ar comprimido, vapor, gases e elétrica" },
              { title: "MCA – Inspeção Elétrica", desc: "Avaliação de circuitos em motores elétricos" },
              { title: "Análise de Óleo", desc: "Lubrificante / pacote industrial" },
            ].map((service, index) => (
              <div key={index} className="info-card hover:shadow-md transition-shadow">
                <h4 className="font-semibold text-primary">{service.title}</h4>
                <p className="text-sm text-muted-foreground">{service.desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-primary text-primary-foreground rounded-lg p-6 text-center">
            <h3 className="text-xl font-bold mb-2">PLANOS DE MANUTENÇÃO</h3>
            <p className="text-sm opacity-90">Consultoria e criação de plano personalizado</p>
            <div className="mt-4">
              <h4 className="font-semibold">TREINAMENTOS DE PREDITIVA</h4>
              <p className="text-sm opacity-90">Análise de vibração e Termografia – N1</p>
            </div>
          </div>

          <div className="text-center mt-8 pt-6 border-t border-border">
            <p className="text-lg font-semibold text-primary">www.jundpred.com.br</p>
            <p className="text-muted-foreground">Tel.: (11) 2817-0616</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Index;
