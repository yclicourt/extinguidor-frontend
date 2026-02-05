import Image from "next/image";
import { bebas } from "../ui/font";

const Logo = () => {
  return (
    <div
      className={`${bebas.className}flex flex-row items-center leading-none text-white`}
    >
      <Image src="/favicon.svg" alt="Logo" width={50} height={100}  className="bg-slate-"/>
     
    </div>
  );
};
export default Logo;
