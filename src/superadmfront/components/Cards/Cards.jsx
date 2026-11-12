
import {
    Building2,
    UsersRound,
    CreditCard,
    CircleDollarSign,
    TrendingUp,
} from "lucide-react";

import { estatisticas } from "../data/data";

const icones = {
    building: Building2,
    users: UsersRound,
    card: CreditCard,
    money: CircleDollarSign,
};

export default function Cards() {
    return (
        <section className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-2 2xl:grid-cols-4">

            {estatisticas.map((item) => {
                const Icon = icones[item.icone];

                return (
                    <article
                        key={item.titulo}
                        className="rounded-2xl border border-[#EEE5E5] bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md"
                    >

                        <div className="flex items-center gap-4">

                            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#FCE7E9] text-[#B90019]">
                                <Icon size={34} strokeWidth={2.2} />
                            </div>

                            <div className="min-w-0">
                                <p className="text-sm font-medium text-[#343039]">
                                    {item.titulo}
                                </p>

                                <h2 className="mt-1 text-3xl font-extrabold tracking-tight text-[#171313]">
                                    {item.valor}
                                </h2>
                            </div>

                        </div>

                        <div className="mt-4 flex items-center gap-2 pl-1 text-sm font-semibold text-[#159447]">
                            <TrendingUp size={18} />
                            {item.variacao}
                        </div>

                    </article>
                );
            })}

        </section>
    );
}
