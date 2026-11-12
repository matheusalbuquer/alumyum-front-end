import {
    ShoppingCart,
    DollarSign,
    Users,
    Package,
    TrendingUp,
} from "lucide-react";

const indicadores = [
    {
        titulo: "Total de Pedidos",
        valor: "12.540",
        variacao: "+12%",
        Icone: ShoppingCart,
        tema: "orange",
    },
    {
        titulo: "Total de Vendas",
        valor: "R$ 89.750,00",
        variacao: "+18%",
        Icone: DollarSign,
        tema: "yellow",
    },
    {
        titulo: "Clientes Ativos",
        valor: "8.320",
        variacao: "+10%",
        Icone: Users,
        tema: "pink",
    },
    {
        titulo: "Produtos Ativos",
        valor: "248",
        variacao: "+5%",
        Icone: Package,
        tema: "sand",
    },
];

const temas = {
    orange: {
        card: "bg-gradient-to-br from-[#FFF3ED] to-[#FFFDFC]",
        icon: "bg-[#FFE0D1] text-[#C63A0B]",
        line: "#E85B12",
    },
    yellow: {
        card: "bg-gradient-to-br from-[#FFF8EA] to-[#FFFDFC]",
        icon: "bg-[#FFE9C5] text-[#C47A08]",
        line: "#E99A13",
    },
    pink: {
        card: "bg-gradient-to-br from-[#FFF0F0] to-[#FFFDFC]",
        icon: "bg-[#FFDCDC] text-[#D94B45]",
        line: "#EF625C",
    },
    sand: {
        card: "bg-gradient-to-br from-[#FBF3EA] to-[#FFFDFC]",
        icon: "bg-[#FFE2C2] text-[#A95A16]",
        line: "#B96A27",
    },
};

function MiniTendencia({ color }) {
    return (
        <svg
            viewBox="0 0 120 42"
            className="absolute bottom-0 right-0 h-12 w-32 opacity-90"
            aria-hidden="true"
        >
            <path
                d="M2 39 C16 35 18 25 30 29 S45 14 57 20 S73 7 85 14 S103 2 118 4 L120 42 L2 42 Z"
                fill={color}
                opacity="0.12"
            />
            <path
                d="M2 39 C16 35 18 25 30 29 S45 14 57 20 S73 7 85 14 S103 2 118 4"
                fill="none"
                stroke={color}
                strokeWidth="2.2"
                strokeLinecap="round"
            />
        </svg>
    );
}

export default function Cards() {
    return (
        <section className="font-['Poppins'] grid grid-cols-1 gap-4 sm:grid-cols-2 2xl:grid-cols-4">

            {indicadores.map(({ titulo, valor, variacao, Icone, tema }) => {
                const estilo = temas[tema];

                return (
                    <article
                        key={titulo}
                        className={`cursor-pointer relative flex min-h-[138px] items-center gap-4 overflow-hidden rounded-2xl border border-[#F2E4DE] p-4 ${estilo.card}`}
                    >
                        <div className={`z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-full shadow-sm ${estilo.icon}`}>
                            <Icone size={31} strokeWidth={2.2} />
                        </div>

                        <div className="z-10 min-w-0">
                            <p className="text-2xl font-bold tracking-tight text-[#211B1B]">
                                {valor}
                            </p>

                            <p className="text-sm text-[#51464A]">
                                {titulo}
                            </p>

                            <p className="flex items-center gap-1 mt-2 text-sm font-semibold text-emerald-600">
                                <TrendingUp size={15} /> {variacao}
                            </p>
                        </div>

                        <MiniTendencia color={estilo.line} />
                    </article>
                );
            })}

        </section>
    );
}