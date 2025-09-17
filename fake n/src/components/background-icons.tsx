
export function BackgroundIcons() {
  return (
    <div className="absolute top-0 left-0 w-full h-full z-0 overflow-hidden" aria-hidden="true">
      {/* ShieldCheck Icon */}
      <div className="absolute icon-shape" style={{ top: '15%', left: '10%', animationDelay: '0s', width: '40px', height: '40px' }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="m9 12 2 2 4-4"></path>
        </svg>
      </div>
      {/* FileText Icon */}
      <div className="absolute icon-shape" style={{ top: '25%', left: '80%', animationDelay: '2s', width: '50px', height: '50px' }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><line x1="10" y1="9" x2="8" y2="9"></line>
        </svg>
      </div>
      {/* Search Icon */}
      <div className="absolute icon-shape" style={{ top: '70%', left: '15%', animationDelay: '4s', width: '30px', height: '30px' }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      </div>
       {/* BrainCircuit Icon */}
      <div className="absolute icon-shape" style={{ top: '80%', left: '85%', animationDelay: '6s', width: '45px', height: '45px' }}>
         <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5a3 3 0 1 0-5.993.129"></path><path d="M12 5a3 3 0 1 1 5.993.129"></path><path d="M15 12a3 3 0 1 0-5.993.129"></path><path d="M15 12a3 3 0 1 1 5.993.129"></path><path d="M9 12a3 3 0 1 0-5.993.129"></path><path d="M9 12a3 3 0 1 1 5.993.129"></path><path d="M12 19a3 3 0 1 0-5.993.129"></path><path d="M12 19a3 3 0 1 1 5.993.129"></path><path d="M12 5a3 3 0 0 0-3 3v0a3 3 0 0 0 3 3h0a3 3 0 0 0 3-3v0a3 3 0 0 0-3-3Z"></path><path d="M12 12a3 3 0 0 0-3 3v0a3 3 0 0 0 3 3h0a3 3 0 0 0 3-3v0a3 3 0 0 0-3-3Z"></path><path d="M12 19a3 3 0 0 0-3-3v0a3 3 0 0 0 3-3h0a3 3 0 0 0 3 3v0a3 3 0 0 0-3 3Z"></path><path d="M9 12a3 3 0 0 0-3-3v0a3 3 0 0 0 3-3h0a3 3 0 0 0 3 3v0a3 3 0 0 0-3 3Z"></path><path d="M15 12a3 3 0 0 0-3-3v0a3 3 0 0 0 3-3h0a3 3 0 0 0 3 3v0a3 3 0 0 0-3 3Z"></path>
        </svg>
      </div>
       {/* Link Icon */}
       <div className="absolute icon-shape" style={{ top: '50%', left: '50%', animationDelay: '1s', width: '25px', height: '25px' }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.72"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.72-1.72"></path>
        </svg>
      </div>
      {/* CheckCircle Icon */}
      <div className="absolute icon-shape" style={{ top: '5%', left: '40%', animationDelay: '3s', width: '35px', height: '35px' }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
      </div>
    </div>
  );
}
