"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaClipboardList, FaHome, FaMapMarked, FaUsers } from "react-icons/fa";
import { twMerge } from "tailwind-merge";

const links = [
  {
    name: "Dashboard",
    href: "/features/dashboard",
    icon: FaHome,
  },
  {
    name: "ParteTrabajo",
    href: "/features/dashboard/parte-trabajo",
    icon: FaClipboardList,
  },
  {
    name: "Rutas",
    href: "/features/dashboard/rutas",
    icon: FaMapMarked,
  },
  {
    name: "Usuarios",
    href: "/features/dashboard/users",
    icon: FaUsers,
  },
];

const NavLinks = () => {
  const pathName = usePathname();
  return (
    <>
      {links.map((link) => {
        const LinIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={twMerge(
              `flex h-12 items-center justify-center gap-4 rounded-md bg-slate-800 p-3 text-lg text-white hover:bg-slate-400 hover:text-white md:flex-none md:justify-start  md:px-3 antialiased`,
              pathName === link.href && "bg-slate-500",
            )}
          >
            <LinIcon className="text-xl w-6" />
            <p className="hidden lg:block whitespace-nowrap">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
};
export default NavLinks;
