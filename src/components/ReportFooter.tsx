const ReportFooter = () => {
  return (
    <footer className="mt-auto pt-3 border-t border-border">
      <div className="flex flex-col items-center gap-1 text-center">
        <p className="text-sm text-muted-foreground print:text-[10px]">
          <a
            href="https://www.jundpred.com.br"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            www.jundpred.com.br
          </a>
        </p>
      </div>
    </footer>
  );
};

export default ReportFooter;
