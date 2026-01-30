import { useQuery } from "@tanstack/react-query";
import { RelatorioResponse } from "@/types/relatorio";

const API_URL = "https://ayfkjjdgrbymmlkuzbig.supabase.co/functions/v1/get-relatorio-termo";

export const fetchRelatorio = async (idRelatorio: string): Promise<RelatorioResponse> => {
  const response = await fetch(`${API_URL}?idRelatorio=${idRelatorio}`);
  
  if (!response.ok) {
    throw new Error(`Erro ao buscar relatório: ${response.status}`);
  }
  
  return response.json();
};

export const useRelatorio = (idRelatorio: string | null) => {
  return useQuery({
    queryKey: ["relatorio", idRelatorio],
    queryFn: () => fetchRelatorio(idRelatorio!),
    enabled: !!idRelatorio,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });
};
