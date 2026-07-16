import {
  Activity,
  Cpu,
  Crosshair,
  Droplets,
  Eye,
  Gauge,
  GraduationCap,
  Orbit,
  Radio,
  Thermometer,
  Waves,
  Zap,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";

export type ReportService = {
  title: string;
  desc: string;
  icon: LucideIcon;
};

export const reportServices: ReportService[] = [
  {
    title: "Análise de Vibrações",
    icon: Activity,
    desc: "Off-line e on-line, solo e estrutural",
  },
  {
    title: "Inspeção Termográfica",
    icon: Thermometer,
    desc: "Painéis, cabines, fornos, mancais, etc.",
  },
  {
    title: "Alinhamento a Laser",
    icon: Crosshair,
    desc: "De eixos com laser e calços calibrados",
  },
  {
    title: "Balanceamento Dinâmico",
    icon: Gauge,
    desc: "Realizado no local – 1 a 4 planos",
  },
  {
    title: "ODS (Estrutural)",
    icon: Orbit,
    desc: "Análise de torção de base com correção",
  },
  {
    title: "MCA – Inspeção Elétrica",
    icon: Zap,
    desc: "Avaliação de circuitos em motores elétricos",
  },
  {
    title: "Análise de Óleo",
    icon: Droplets,
    desc: "Lubrificante / pacote industrial",
  },
  {
    title: "Técnicas Multiparâmetro",
    icon: Cpu,
    desc: "Aplicação de diversas técnicas preditivas",
  },
  {
    title: "Treinamentos de Preditiva",
    icon: GraduationCap,
    desc: "Análise de vibração e Termografia – N1",
  },
  {
    title: "Monitoramento Online",
    icon: Radio,
    desc: "Sensor online de vibração",
  },
  {
    title: "Inspeção Ultrassônica",
    icon: Waves,
    desc: "Ar comprimido, vapor, gases e elétrica",
  },
  {
    title: "Inspeção Sensitiva",
    icon: Eye,
    desc: "Abordagem para identificar falhas incipientes",
  },
];

type ServicesGridProps = {
  services?: ReportService[];
  className?: string;
};

const ServicesGrid = ({
  services = reportServices,
  className,
}: ServicesGridProps) => {
  return (
    <div className={cn("grid grid-cols-2 gap-4 mb-8", className)}>
      {services.map((service) => (
        <div key={service.title} className="info-card hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-1">
            <service.icon className="h-5 w-5 text-primary shrink-0" />
            <h4 className="font-semibold text-primary leading-none">{service.title}</h4>
          </div>
          <p className="text-sm text-muted-foreground">{service.desc}</p>
        </div>
      ))}
    </div>
  );
};

export default ServicesGrid;