const ReportHeader = () => {
  return (
    <header className="report-header flex flex-row items-center justify-between gap-0 print:gap-0">
      <img 
        src="/logo-jundpred.jpg" 
        alt="JundPred - Manutenção Preditiva"
        className="header-logo h-8 w-auto"
      />
      <img
        src="/logo_brasil.jpg"
        alt="Logo Brasil"
        className="header-logo h-8 w-auto"
      />
    </header>
  );
};

export default ReportHeader;
