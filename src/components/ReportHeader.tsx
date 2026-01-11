import logoJundpred from "@/assets/logo-jundpred.jpg";

const ReportHeader = () => {
  return (
    <header className="report-header flex flex-row items-center justify-between gap-4 print:gap-2">
      <div className="flex items-center gap-4">
        <img 
          src={logoJundpred} 
          alt="JundPred - Manutenção Preditiva" 
          className="header-logo h-16 w-auto"
        />
      </div>
      <div className="text-right print:text-right">
        <p className="text-sm text-muted-foreground print:text-[10px]">www.jundpred.com.br</p>
        <p className="text-sm text-muted-foreground print:text-[10px]">Tel.: (11) 2817-0616</p>
      </div>
    </header>
  );
};

export default ReportHeader;
