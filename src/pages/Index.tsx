import { useParams, useSearchParams } from "react-router-dom";
import ReportHeader from "@/components/ReportHeader";
import ReportFooter from "@/components/ReportFooter";
import StatusBadge from "@/components/StatusBadge";
import EquipmentTable from "@/components/EquipmentTable";
import OperationalReport from "@/components/OperationalReport";
import TemperatureTable from "@/components/TemperatureTable";
import StatusChart from "@/components/StatusChart";
import { useRelatorio } from "@/hooks/useRelatorio";
import { mapApiStatusToStatusType, Termografia } from "@/types/relatorio";

const Index = () => {
  const { idRelatorio: paramId } = useParams<{
    idRelatorio?: string;
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
    aprovador,
    termografias
  } = data;
  const relatorioNumero = [relatorio.id, relatorio.num_revisao]
    .filter(value => value !== null && value !== undefined && String(value).trim() !== "")
    .join(" ");

  // Usar cliente do response ou do relatorio
  const clienteData = cliente || relatorio.cliente;
  // Usar usuario do response ou do relatorio
  const usuarioData = usuario || relatorio.usuario;
  // Usar aprovador do response ou do relatorio
  const aprovadorData = aprovador || relatorio.aprovador;

  // Filtrar termografias com problemas (alerta ou critico)
  const criticalEquipment = termografias.filter(t => {
    const status = mapApiStatusToStatusType(t.status);
    return status === "alert" || status === "critical";
  }).map((t, index) => ({
    id: index + 1,
    name: `${t.localizacao} - ${t.tag}`,
    sector: t.setor,
    tag: t.tag,
    status: mapApiStatusToStatusType(t.status),
    observation: `VIDE R.O. ${String(index + 1).padStart(2, "0")}`
  }));

  // Todos os equipamentos
  const allEquipment = termografias.map((t, index) => ({
    id: index + 1,
    name: `${t.localizacao} - ${t.tag}`,
    sector: t.setor,
    tag: t.tag,
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

  // Termografias com dados para relatorio operacional (apenas alerta ou critico)
  const operationalReports = termografias.filter(t => {
    const status = mapApiStatusToStatusType(t.status);
    return status === "alert" || status === "critical";
  });

  const chunkEquipment = <T,>(items: T[], pageSize: number) => {
    if (pageSize <= 0) return [items];
    const chunks: T[][] = [];
    for (let i = 0; i < items.length; i += pageSize) {
      chunks.push(items.slice(i, i + pageSize));
    }
    return chunks.length > 0 ? chunks : [[]];
  };

  const rowsPerPage = {
    withObservation: 13,
    default: 15
  };

  const criticalEquipmentPages = chunkEquipment(criticalEquipment, rowsPerPage.withObservation);
  const allEquipmentPages = chunkEquipment(allEquipment, rowsPerPage.default);

  // Formatar data
  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "";
    const cleaned = dateStr.trim();
    const brExact = cleaned.match(/^\d{2}\/\d{2}\/\d{4}$/);
    if (brExact) {
      return cleaned;
    }
    const parsed = new Date(cleaned);
    if (!Number.isNaN(parsed.getTime())) {
      return parsed.toLocaleDateString("pt-BR");
    }
    const brMatch = cleaned.match(/(\d{2})[\/\-](\d{2})[\/\-](\d{4})/);
    if (brMatch) {
      const day = Number(brMatch[1]);
      const month = Number(brMatch[2]) - 1;
      const year = Number(brMatch[3]);
      const fallback = new Date(year, month, day);
      if (!Number.isNaN(fallback.getTime())) {
        return fallback.toLocaleDateString("pt-BR");
      }
    }
    const isoMatch = cleaned.match(/(\d{4})[\/\-](\d{2})[\/\-](\d{2})/);
    if (isoMatch) {
      const year = Number(isoMatch[1]);
      const month = Number(isoMatch[2]) - 1;
      const day = Number(isoMatch[3]);
      const fallback = new Date(year, month, day);
      if (!Number.isNaN(fallback.getTime())) {
        return fallback.toLocaleDateString("pt-BR");
      }
    }
    return "";
  };

  // Formatar data como mês/ano
  const formatMonthYear = (dateStr?: string) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toLocaleDateString("pt-BR", { month: "long", year: "numeric" }).replace(/de /g, "");
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
        <div className="report-page print-break flex flex-col text-center">
          <div className="flex-1">
            <div className="flex justify-between items-start mb-4">
              <img src="/logo-jundpred.jpg" alt="JundPred - Manutenção Preditiva" className="cover-logo h-8 w-auto" />
              <img src="/logo_brasil.jpg" alt="Logo Brasil" className="cover-logo h-8 w-auto" />
            </div>

            <div className="bg-primary text-primary-foreground py-4 px-6 rounded-lg mb-8">
              <h2 className="text-2xl font-bold">RELATÓRIO DE MANUTENÇÃO PREDITIVA</h2>
              <p className="text-lg mt-2">REF. INSPEÇÃO {relatorio.tipo?.toUpperCase() || "TERMOGRÁFICA"}</p>
              <p className="text-sm mt-2 opacity-80">Nº {relatorioNumero}</p>
            </div>

            <div className="mb-8 flex justify-center items-center">
              <img src="/termografia-cover.jpg" alt="Imagem Termográfica" className="cover-image rounded-lg shadow-lg" style={{ width: "320px", height: "240px", objectFit: "cover" }} />
            </div>

            {clienteData?.logo && <div className="mb-8">
              <img src={clienteData.logo} alt={clienteData.nome} className="cover-logo h-20 w-auto mx-auto" />
            </div>}

            {clienteData && <div className="bg-secondary/30 rounded-lg p-4 mb-6 text-center">
                <h3 className="font-semibold text-primary mb-2">Cliente / Unidade</h3>
                <p className="font-bold text-lg">{clienteData.nome} - {clienteData.cidade}/{clienteData.estado}</p>
                
              </div>}

            <div className="grid grid-cols-1 gap-8 text-center max-w-lg mx-auto">
              <div>
                <p className="text-muted-foreground text-sm">Mês de Referência</p>
                <p className="font-semibold">{formatMonthYear(relatorio.dataExe)}</p>
              </div>
              
            </div>
          </div>

          <ReportFooter />
        </div>

        {/* Letter Page */}
        <div className="report-page print-break flex flex-col">
          <div className="flex-1">
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
            
            <p className="text-foreground leading-relaxed">Referente à inspeção realizada nos equipamentos na data de <strong>{relatorio.data_execucao || (relatorio as { data_Execucao?: string }).data_Execucao || relatorio.dataExe}</strong>.
              <br />
              Relatório Nº <strong>{relatorioNumero}</strong>.
            </p>
          </div>

          <div className="mb-8">
            <p className="mb-4">Atenciosamente,</p>
            <div className="border-l-4 border-primary pl-4">
              <p className="font-semibold">Luís Henrique Guimarães Stefani</p>
              <p className="text-muted-foreground text-sm">Diretor Comercial</p>
              <p className="text-sm mt-2">luis@jundpred.com.br</p>
              <p className="text-sm">Tel.: (11) 2817-0616</p>
              <p className="text-sm">Cel: (11) 98112-2244</p>
            </div>
          </div>
          </div>
          <ReportFooter />
        </div>

        {/* Technical Info Page */}
        <div className="report-page print-break flex flex-col">
          <div className="flex-1">
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
          <ReportFooter />
        </div>

        {/* Temperature Table Page */}
        <div className="report-page print-break flex flex-col">
          <div className="flex-1">
            <ReportHeader />
            <TemperatureTable />
          </div>
          <ReportFooter />
        </div>

        {/* Critical Equipment List */}
        {criticalEquipmentPages.map((pageEquipment, pageIndex) => (
          <div key={`critical-equipment-${pageIndex}`} className="report-page print-break flex flex-col">
            <div className="flex-1">
              <ReportHeader />
              <EquipmentTable title="RESUMO DOS EQUIPAMENTOS EM ALARME / CRÍTICOS" equipment={pageEquipment} showObservation={true} />
            </div>
            <ReportFooter />
          </div>
        ))}

        {/* Full Equipment List */}
        {allEquipmentPages.map((pageEquipment, pageIndex) => (
          <div key={`all-equipment-${pageIndex}`} className="report-page print-break flex flex-col">
            <div className="flex-1">
              <ReportHeader />
              <EquipmentTable title="LISTAGEM GERAL DOS EQUIPAMENTOS" equipment={pageEquipment} />
            </div>
            <ReportFooter />
          </div>
        ))}

        {/* Status Overview */}
        <div className="report-page print-break flex flex-col">
          <div className="flex-1">
            <ReportHeader />
            <StatusChart statusData={statusData} />
          </div>
          <ReportFooter />
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
        <div className="report-page print-break flex flex-col">
          <div className="flex-1">
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

          {aprovadorData && (
            <div className="mb-8">
              <p className="mb-4">Aprovado por,</p>
              <div className="border-l-4 border-primary pl-4">
                <p className="font-semibold">{aprovadorData.nome}</p>
                <p className="text-muted-foreground text-sm">{aprovadorData.departamento}</p>
                <p className="text-sm mt-2">{aprovadorData.email}</p>
                <p className="text-sm">{aprovadorData.telefone}</p>
              </div>
            </div>
          )}
          </div>
          <ReportFooter />
        </div>

        {/* Services Page */}
        <div className="report-page flex flex-col">
          <div className="flex-1">
            <ReportHeader />
            
            <h2 className="report-title">NOSSOS SERVIÇOS</h2>
            
            <div className="grid grid-cols-2 gap-4 mb-8">
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
              title: "ODS (Estrutural)",
              desc: "Análise de torção de base com correção"
            }, {
              title: "MCA – Inspeção Elétrica",
              desc: "Avaliação de circuitos em motores elétricos"
            }, {
              title: "Análise de Óleo",
              desc: "Lubrificante / pacote industrial"
            }, {
              title: "Técnicas Multiparâmetro",
              desc: "Aplicação de diversas técnicas preditivas"
            }, {
              title: "Treinamentos de Preditiva",
              desc: "Análise de vibração e Termografia – N1"
            }, {
              title: "Monitoramento Online",
              desc: "Sensor online de vibração"
            }, {
              title: "Inspeção Ultrassônica",
              desc: "Ar comprimido, vapor, gases e elétrica"
            }, {
              title: "Inspeção Sensitiva",
              desc: "Abordagem para identificar falhas incipientes"
            }].map((service, index) => <div key={index} className="info-card hover:shadow-md transition-shadow">
                  <h4 className="font-semibold text-primary">{service.title}</h4>
                  <p className="text-sm text-muted-foreground">{service.desc}</p>
                </div>)}
            </div>
            <ReportFooter />
          </div>
        </div>

      </div>
    </div>
};
export default Index;