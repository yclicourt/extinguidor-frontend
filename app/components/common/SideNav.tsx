import { FaPowerOff } from "react-icons/fa";
import NavLinks from "./NavLinks";

const SideNav = () => {
  return (
    <>
      <div className="flex h-full w-64 flex-col py-4 md:px-2 bg-slate-800 ">
        <div className="flex grow flex-col justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
          <NavLinks />

          <div className="hidden h-auto w-full grow md:block"></div>
          <button
            type="submit"
            className="flex h-12 grow items-center justify-center gap-2 rounded-md bg-slate-700 p-3 text-lg text-white font-bold hover:bg-slate-400 hover:text-white md:flex-none md:justify-start md:p-2 md:px-3 w-full"
          >
            <FaPowerOff className="w-6" />
            <p className="hidden md:block">Logout</p>
          </button>
        </div>
      </div>
    </>
  );
};
export default SideNav;
