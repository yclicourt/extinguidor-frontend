import Logo from "./Logo";

const Header = () => {
  return (
    <header className="flex items-center justify-between w-full h-16 px-6 bg-[#1e293b] text-white">
  {/* 1. Lado Izquierdo: Logo y Nombre */}
  <div className="flex items-center gap-3">
    <Logo /> 
    <span className="font-bold text-lg tracking-tight">El Extinguidor App</span>
  </div>

  {/* 2. Centro: Barra de búsqueda */}
  <div className="hidden md:flex flex-1 max-w-md mx-4">
    <div className="relative w-full">
      <input 
        type="text" 
        placeholder="Monday, February 2, 2026" 
        className="w-full bg-slate-600/50 border border-slate-500 text-sm rounded-md py-1.5 px-4 focus:outline-none focus:ring-1 focus:ring-blue-400 placeholder-slate-300 text-center"
      />
      <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
        <svg className="w-4 h-4 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
      </div>
    </div>
  </div>

  {/* 3. Lado Derecho: Iconos de Perfil */}
  <div className="flex items-center gap-4">
    <button className="text-slate-300 hover:text-white transition">
       <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
    </button>
    <div className="flex items-center gap-2 border-l border-slate-600 pl-4">
      <div className="w-8 h-8 rounded-full bg-slate-500 flex items-center justify-center">
        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"></path></svg>
      </div>
    </div>
  </div>
</header>
  );
};
export default Header;
