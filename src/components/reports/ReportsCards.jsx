import {
    FileText,
    DollarSign,
    ShoppingBag,
    TrendingUp,
    TrendingUp as ArrowUp,
} from "lucide-react";

import { indicadores } from "./data/reports";

const icones = {
    file: FileText,
    dollar: DollarSign,
    bag: ShoppingBag,
    trend: TrendingUp,
};

export default function ReportsCards() {
    return (
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {indicadores.map((item) => {
                const Icon = icones[item.icone];

                return (
                    <article
                        key={item.titulo}
                        className="font-['Poppins'] cscursor-pointer rounded-xl border border-[#E5E5E5] bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-[#EBC4B8] hover:shadow-md"
                    >
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#FCEAE7] text-[#B51B00]">
                                <Icon size={25} />
                            </div>

                            <h2 className="mt-3 text-2xl font-bold text-marrom-2">
                                {item.valor}
                            </h2>
                        </div>


                        <p className="text-sm text-[#6B7280]">
                            {item.titulo}
                        </p>

                        <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
                            <span className="flex items-center gap-1 font-bold text-[#218653]">
                                <ArrowUp size={15} />
                                {item.crescimento}
                            </span>

                            <span className="text-[#808080]">
                                {item.descricao}
                            </span>
                        </div>
                    </article>
                );
            })}
        </section>
    );
}