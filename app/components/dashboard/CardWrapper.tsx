import {
  FaClipboardList,
  FaMoneyCheckDollar,
  FaRoute,
  FaUsers,
} from "react-icons/fa6";
import { bebas } from "../../ui/font";
import { fetchCardData } from "../../helpers/api";



const CardWrapper = async () => {
  const {
    numberOfFactureBinding,
    numberOfParteTrabajoPending,
    numberOfResultFinalizes,
    numberOfUsersActivesWorkers,
  } = await fetchCardData();

  const cards = [
  {
    icon: FaMoneyCheckDollar,
    title: "Total Binding",
    value: `$${numberOfFactureBinding}`,
  },
  {
    icon: FaRoute,
    title: "Completes Routes",
    value: `${numberOfResultFinalizes}`,
  },
  {
    icon: FaClipboardList,
    title: "Pending Work Orders",
    value: `${numberOfParteTrabajoPending}`,
  },
  {
    icon: FaUsers,
    title: "Active Workers",
    value: `${numberOfUsersActivesWorkers}`,
  },
];
  return cards.map((card) => {
    const LinIcon = card.icon;
    return (
      <div
        key={card.title}
        className="
      relative
      max-w-sm
      p-6
      rounded-2xl
      bg-linear-to-br
      from-slate-700
      via-slate-800
      to-slate-900
      border border-white/10
      shadow-lg
      backdrop-blur
      transition
      hover:scale-[1.02]
      hover:shadow-xl
    "
      >
        {/* Icon */}
        <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-xl bg-white/10 text-4xl text-white">
          <LinIcon />
        </div>

        {/* Title */}
        <h5
          className={`${bebas.className}mb-1 text-sm text-center font-medium tracking-wide text-slate-300 uppercase`}
        >
          {card.title}:
        </h5>

        {/* Value */}
        <p className="text-3xl font-bold text-center text-white">
          {card.value}
        </p>

        {/* Subtle divider */}
        <div className="mt-4 h-px bg-white/10" />
      </div>
    );
  });
};

export default CardWrapper;
