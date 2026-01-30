export interface Cliente {
  id: number;
  cnpj: string;
  logo: string | null;
  nome: string;
  ativo: boolean;
  email: string;
  cidade: string;
  estado: string;
  endereco: string;
  telefone: string;
  pessoa_contato: string;
  departamento_contato: string;
}

export interface Usuario {
  id: number;
  nome: string;
  ativo: boolean;
  email: string;
  funcao: string | null;
  telefone: string | null;
  foto_perfil: string | null;
  departamento: string | null;
  foto_assinatura: string | null;
}

export interface Relatorio {
  id: number;
  created_at: string;
  tipo: string;
  dataExe: string;
  id_cliente: number;
  status: string;
  n_relatorio: string;
  id_user: number;
  tipoVazamento: string | null;
  cliente?: Cliente;
  usuario?: Usuario;
}

export interface Termografia {
  id: number;
  created_at: string;
  id_cliente: number;
  id_relatorio: number;
  localizacao: string;
  setor: string;
  status: "Normal" | "Alerta" | "Crítico" | string;
  observacao: string;
  temp_aquecimento: string;
  temp_admissivel: string;
  foto_painel: string | null;
  foto_camera: string | null;
  componente: string;
  descricao_problema: string;
  recomendacao: string;
  tag: string;
  id_user: number;
}

export interface RelatorioResponse {
  relatorio: Relatorio;
  cliente?: Cliente;
  usuario?: Usuario;
  termografias: Termografia[];
}

export type StatusType = "normal" | "alert" | "critical" | "maintenance" | "off";

export const mapApiStatusToStatusType = (status: string): StatusType => {
  const statusLower = status.toLowerCase();
  if (statusLower === "normal") return "normal";
  if (statusLower === "alerta") return "alert";
  if (statusLower === "crítico" || statusLower === "critico") return "critical";
  if (statusLower === "manutenção" || statusLower === "manutencao") return "maintenance";
  if (statusLower === "desligado") return "off";
  return "normal";
};
