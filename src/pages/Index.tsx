import { useParams, useSearchParams } from "react-router-dom";
import ReportHeader from "@/components/ReportHeader";
import StatusBadge from "@/components/StatusBadge";
import EquipmentTable from "@/components/EquipmentTable";
import OperationalReport from "@/components/OperationalReport";
import TemperatureTable from "@/components/TemperatureTable";
import StatusChart from "@/components/StatusChart";
import { useRelatorio } from "@/hooks/useRelatorio";
import { mapApiStatusToStatusType, Termografia } from "@/types/relatorio";
import logoJundpred from "@/assets/logo-jundpred.jpg";
import termografiaCover from "@/assets/termografia-cover.jpg";
const Index = () => {
  const {
    idRelatorio: paramId
  } = useParams<{
    idRelatorio: string;
  }>();
  const [searchParams] = useSearchParams();
  const queryId = searchParams.get("idRelatorio");

  // Suporta tanto /relatorio/:id quanto /?idRelatorio=id
  const idRelatorio = paramId || queryId;
  const {
    data,
    isLoading,
    error
  } = useRelatorio(idRelatorio);
  const handlePrint = () => {
    window.print();
  };
  if (!idRelatorio) {
    return <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-bold text-primary mb-4">Relatório de Termografia</h1>
          <p className="text-muted-foreground mb-6">
            Informe o ID do relatório na URL para visualizar os dados.
          </p>
          <div className="bg-secondary/30 rounded-lg p-4 text-sm font-mono">
            <p>/relatorio/8</p>
            <p className="text-muted-foreground mt-2">ou</p>
            <p>/?idRelatorio=8</p>
          </div>
        </div>
      </div>;
  }
  if (isLoading) {
    return <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando relatório...</p>
        </div>
      </div>;
  }
  if (error) {
    return <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="text-destructive text-5xl mb-4">⚠️</div>
          <h1 className="text-xl font-bold text-destructive mb-2">Erro ao carregar relatório</h1>
          <p className="text-muted-foreground">{(error as Error).message}</p>
        </div>
      </div>;
  }
  if (!data) {
    return <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Nenhum dado encontrado.</p>
      </div>;
  }
  const {
    relatorio,
    cliente,
    usuario,
    termografias
  } = data;

  // Usar cliente do response ou do relatorio
  const clienteData = cliente || relatorio.cliente;
  // Usar usuario do response ou do relatorio
  const usuarioData = usuario || relatorio.usuario;

  // Filtrar termografias com problemas (alerta ou crítico)
  const criticalEquipment = termografias.filter(t => t.status.toLowerCase() !== "normal").map((t, index) => ({
    id: index + 1,
    name: `${t.localizacao} - ${t.tag}`,
    sector: t.setor,
    status: mapApiStatusToStatusType(t.status),
    observation: `VIDE R.O. ${String(index + 1).padStart(2, "0")}`
  }));

  // Todos os equipamentos
  const allEquipment = termografias.map((t, index) => ({
    id: index + 1,
    name: `${t.localizacao} - ${t.tag}`,
    sector: t.setor,
    status: mapApiStatusToStatusType(t.status),
    statusLabel: t.status.toUpperCase()
  }));

  // Calcular estatísticas de status
  const statusCounts = termografias.reduce((acc, t) => {
    const status = mapApiStatusToStatusType(t.status);
    if (status === "normal") acc.normal++;else if (status === "alert") acc.alert++;else if (status === "critical") acc.critical++;else if (status === "maintenance") acc.maintenance++;else if (status === "off") acc.off++;
    return acc;
  }, {
    normal: 0,
    alert: 0,
    critical: 0,
    maintenance: 0,
    off: 0
  });
  const total = termografias.length || 1;
  const statusData = [{
    label: "NORMAIS",
    value: Math.round(statusCounts.normal / total * 100),
    color: "bg-success"
  }, {
    label: "EM MANUTENÇÃO",
    value: Math.round(statusCounts.maintenance / total * 100),
    color: "bg-muted-foreground"
  }, {
    label: "DESLIGADOS",
    value: Math.round(statusCounts.off / total * 100),
    color: "bg-border"
  }, {
    label: "ALARME",
    value: Math.round(statusCounts.alert / total * 100),
    color: "bg-warning"
  }, {
    label: "CRÍTICO",
    value: Math.round(statusCounts.critical / total * 100),
    color: "bg-destructive"
  }];

  // Termografias com dados para relatório operacional (que têm fotos ou descrição de problema)
  const operationalReports = termografias.filter(t => t.status.toLowerCase() !== "normal" && (t.foto_painel || t.foto_camera || t.descricao_problema));

  // Formatar data
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("pt-BR");
  };
  return <div className="min-h-screen bg-background py-8 px-4 print:p-0 print:bg-white">
      {/* Print Button */}
      <div className="no-print fixed top-4 right-4 z-50">
        <button onClick={handlePrint} className="bg-primary text-primary-foreground px-6 py-3 rounded-lg shadow-lg hover:opacity-90 transition-opacity flex items-center gap-2 font-medium">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 6 2 18 2 18 9"></polyline>
            <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
            <rect x="6" y="14" width="12" height="8"></rect>
          </svg>
          Imprimir A4
        </button>
      </div>

      <div className="a4-container">
        
        {/* Cover Page */}
        <div className="report-page print-break text-center">
          <div className="flex justify-start items-start mb-8">
            <img src={logoJundpred} alt="JundPred - Manutenção Preditiva" className="cover-logo h-20 w-auto" />
          </div>

          <div className="bg-primary text-primary-foreground py-4 px-6 rounded-lg mb-8">
            <h2 className="text-2xl font-bold">RELATÓRIO DE MANUTENÇÃO PREDITIVA</h2>
            <p className="text-lg mt-2">REF. INSPEÇÃO {relatorio.tipo?.toUpperCase() || "TERMOGRÁFICA"}</p>
            <p className="text-sm mt-2 opacity-80">Nº {relatorio.n_relatorio}</p>
          </div>

          <div className="mb-8">
            <img src={termografiaCover} alt="Imagem Termográfica" className="cover-image max-w-md mx-auto rounded-lg shadow-lg" />
          </div>

          {clienteData && <div className="bg-secondary/30 rounded-lg p-4 mb-6 text-left">
              <h3 className="font-semibold text-primary mb-2">Cliente</h3>
              <p className="font-bold text-lg">{clienteData.nome}</p>
              <p className="text-sm text-muted-foreground">CNPJ: {clienteData.cnpj}</p>
            </div>}

          <div className="grid grid-cols-2 gap-8 text-left max-w-lg mx-auto">
            <div>
              <p className="text-muted-foreground text-sm">Data da Inspeção:</p>
              <p className="font-semibold">{formatDate(relatorio.dataExe)}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Status:</p>
              <p className="font-semibold">{relatorio.status}</p>
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
            Jundiaí, {formatDate(relatorio.dataExe)}.
          </div>

          <div className="mb-8">
            <p className="text-sm text-muted-foreground">A/C:</p>
            <p className="font-semibold">{clienteData?.pessoa_contato || "Departamento de Manutenção"}</p>
            {clienteData?.departamento_contato && <p className="text-sm text-muted-foreground">{clienteData.departamento_contato}</p>}
            {clienteData && <div className="mt-2 text-sm">
                <p className="font-medium">{clienteData.nome}</p>
                <p className="text-muted-foreground">{clienteData.email}</p>
                <p className="text-muted-foreground">{clienteData.telefone}</p>
              </div>}
          </div>

          <div className="mb-8">
            <h2 className="report-title">Relatório de Manutenção Preditiva por INSPEÇÃO {relatorio.tipo?.toUpperCase() || "TERMOGRÁFICA"}</h2>
            <p className="text-foreground leading-relaxed">Referente à inspeção realizada nos paineis de distribuição no dia 03/01/2026.
Relatório Nº 123.<strong>{formatDate(relatorio.dataExe)}</strong>.
              <br />
              Relatório Nº <strong>{relatorio.n_relatorio}</strong>.
            </p>
          </div>

          <div className="mb-8">
            <p className="mb-4">Atenciosamente,</p>
            <div className="border-l-4 border-primary pl-4">
              <p className="font-semibold">Luís Henrique Guimarães Stefani</p>
              <p className="text-muted-foreground text-sm">Diretor Comercial</p>
              <p className="text-sm mt-2">luis@jundpred.com.br</p>
              <p className="text-sm">Tel.: (11) 2817-0616</p>
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
        </div>

        {/* Temperature Table Page */}
        <div className="report-page print-break">
          <ReportHeader />
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
        {criticalEquipment.length > 0 && <div className="report-page print-break">
            <ReportHeader />
            <EquipmentTable title="LISTAGEM DOS BARRAMENTOS EM ALARME / CRÍTICOS" equipment={criticalEquipment} showObservation={true} />
          </div>}

        {/* Full Equipment List */}
        <div className="report-page print-break">
          <ReportHeader />
          <EquipmentTable title="LISTAGEM DOS PAINÉIS E EQUIPAMENTOS" equipment={allEquipment} />
        </div>

        {/* Status Overview */}
        <div className="report-page print-break">
          <ReportHeader />
          <StatusChart statusData={statusData} />
        </div>

        {/* Operational Reports Header */}
        {operationalReports.length > 0 && <>
            <div className="report-page flex flex-col">
              <ReportHeader />
              <div className="flex-1 flex flex-col items-center justify-center">
                <h2 className="report-title text-center text-3xl">RELATÓRIOS OPERACIONAIS</h2>
                <p className="text-center text-muted-foreground">
                  Detalhamento das ocorrências encontradas durante a inspeção termográfica
                </p>
              </div>
            </div>

            {/* Operational Reports */}
            {operationalReports.map((termo, index) => <OperationalReport key={termo.id} id={String(index + 1).padStart(2, "0")} area={termo.setor} equipment={`${termo.localizacao} - ${termo.tag}`} components={termo.componente || "N/A"} date={formatDate(relatorio.dataExe)} status={mapApiStatusToStatusType(termo.status)} emissivity="0.95" maxTemp={termo.temp_aquecimento ? `${termo.temp_aquecimento} °C` : "N/A"} maxAdmissibleTemp={termo.temp_admissivel ? `${termo.temp_admissivel}°C` : "N/A"} distance="≈1 m" thermalImage={termo.foto_painel || ""} realImage={termo.foto_camera || ""} readings={termo.temp_aquecimento ? [{
          label: "Temp. Medida",
          value: `${termo.temp_aquecimento} °C`
        }, {
          label: "Temp. Admissível",
          value: `${termo.temp_admissivel} °C`
        }] : []} problem={termo.descricao_problema || termo.observacao || "Verificar equipamento"} classification={termo.status.toLowerCase() === "crítico" ? "INTERVENÇÃO IMEDIATA" : "INTERVENÇÃO PROGRAMADA"} recommendations={termo.recomendacao ? [termo.recomendacao] : ["Realizar manutenção preventiva"]} />)}
          </>}

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
              <p className="font-semibold">{usuarioData?.nome || 'Nome do Responsável'}</p>
              <p className="text-muted-foreground text-sm">{usuarioData?.departamento || 'DEPTO. DE PREDITIVA'}</p>
              <p className="text-sm mt-2">{usuarioData?.email || 'email@jundpred.com.br'}</p>
              <p className="text-sm">{usuarioData?.telefone || 'Tel.: (11) 2817-0616'}</p>
            </div>
          </div>
        </div>

        {/* Services Page */}
        <div className="report-page">
          <ReportHeader />
          
          <h2 className="report-title">OUTROS SERVIÇOS</h2>
          
          <div className="grid md:grid-cols-2 print:grid-cols-2 gap-4 mb-8">
            {[{
            title: "Análise de Vibrações",
            desc: "Off-line e on-line, solo e estrutural"
          }, {
            title: "Inspeção Termográfica",
            desc: "Painéis, cabines, fornos, mancais, etc."
          }, {
            title: "Alinhamento a Laser",
            desc: "De eixos e polias + calços calibrados"
          }, {
            title: "Balanceamento Dinâmico",
            desc: "Realizado no local – 1 a 4 planos"
          }, {
            title: "Ultrassom – Caça Vazamentos",
            desc: "Ar comprimido, vapor, gases e elétrica"
          }, {
            title: "MCA – Inspeção Elétrica",
            desc: "Avaliação de circuitos em motores elétricos"
          }, {
            title: "Análise de Óleo",
            desc: "Lubrificante / pacote industrial"
          }, {
            title: "PLANOS DE MANUTENÇÃO",
            desc: "Consultoria e criação de plano personalizado"
          }, {
            title: "TREINAMENTOS DE PREDITIVA",
            desc: "Análise de vibração e Termografia – N1"
          }].map((service, index) => <div key={index} className="info-card hover:shadow-md transition-shadow">
                <h4 className="font-semibold text-primary">{service.title}</h4>
                <p className="text-sm text-muted-foreground">{service.desc}</p>
              </div>)}
          </div>

          <div className="text-center mt-8 pt-6 border-t border-border">
            <p className="text-lg font-semibold text-primary">www.jundpred.com.br</p>
            <p className="text-muted-foreground">Tel.: (11) 2817-0616</p>
          </div>
        </div>

      </div>
    </div>;
};
export default Index;