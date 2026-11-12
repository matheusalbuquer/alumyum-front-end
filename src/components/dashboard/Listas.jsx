
import {
    ShoppingCart,
    UserRound,
    MessageSquare,
    Package,
    Zap,
    Star,
    ArrowRight,
} from "lucide-react";

const atividades = [
    {
        titulo: "Novo pedido #1047",
        tempo: "Há 5 minutos",
        tipo: "Pedido",
        Icone: ShoppingCart,
        cor: "bg-blue-100 text-blue-600",
        etiqueta: "bg-blue-100 text-blue-700",
    },
    {
        titulo: "Novo cliente cadastrado",
        tempo: "Há 12 minutos",
        tipo: "Cliente",
        Icone: UserRound,
        cor: "bg-emerald-100 text-emerald-600",
        etiqueta: "bg-emerald-100 text-emerald-700",
    },
    {
        titulo: "Nova mensagem no WhatsApp",
        tempo: "Há 20 minutos",
        tipo: "Contato",
        Icone: MessageSquare,
        cor: "bg-orange-100 text-orange-600",
        etiqueta: "bg-orange-100 text-orange-700",
    },
    {
        titulo: "Produto em estoque: Camisa Corinthians 2025",
        tempo: "Há 1 hora",
        tipo: "Produto",
        Icone: Package,
        cor: "bg-purple-100 text-purple-600",
        etiqueta: "bg-purple-100 text-purple-700",
    },
];

const maisVendidos = [
    {
        nome: "Camisa Corinthians 2025 (Principal)",
        vendas: "2.450 vendas",
        preco: "R$ 200,00",
        imagem: "/images/camisa_branca.png",
    },
    {
        nome: "Camisa Corinthians 2025 (Preta)",
        vendas: "1.980 vendas",
        preco: "R$ 200,00",
        imagem: "/images/camisa_preta.png",
    },
    {
        nome: "Jaqueta Corinthians 2025",
        vendas: "1.520 vendas",
        preco: "R$ 319,90",
        imagem: "/images/jaqueta_preta.png",
    },
];

export default function Listas() {
    return (
        <section className="font-['Poppins'] grid grid-cols-1 gap-4 2xl:grid-cols-2">

            {/* Atividades recentes */}
            <article className="rounded-2xl border border-[#F0E5E1] bg-white p-5">

                <div className="mb-3 flex items-center justify-between gap-3">

                    <h2 className="flex items-center gap-2 text-lg font-bold text-[#211B1B]">
                        <Zap
                            size={22}
                            className="fill-[#E9540D] text-[#E9540D]"
                        />
                        Atividades Recentes
                    </h2>

                    <button
                        type="button"
                        className="flex cursor-pointer items-center gap-1 text-sm font-semibold text-[#C8320B] hover:text-[#E9540D]"
                    >
                        Ver todas
                        <ArrowRight size={17} />
                    </button>

                </div>

                <div className="divide-y divide-gray-100">

                    {atividades.map((atividade) => {
                        const Icone = atividade.Icone;

                        return (
                            <div
                                key={atividade.titulo}
                                className="flex items-center gap-3 py-3"
                            >

                                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${atividade.cor}`}>
                                    <Icone size={20} />
                                </div>

                                <div className="min-w-0 flex-1">

                                    <p className="truncate text-sm font-medium text-gray-900">
                                        {atividade.titulo}
                                    </p>

                                    <p className="text-xs text-gray-500">
                                        {atividade.tempo}
                                    </p>

                                </div>

                                <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${atividade.etiqueta}`}>
                                    {atividade.tipo}
                                </span>

                            </div>
                        );
                    })}

                </div>
            </article>

            {/* Produtos mais vendidos */}
            <article className="rounded-2xl border border-[#F0E5E1] bg-white p-5">

                <h2 className="mb-3 flex items-center gap-2 text-lg font-bold text-[#211B1B]">
                    <Star
                        size={21}
                        className="fill-[#E9540D] text-[#E9540D]"
                    />
                    Produtos Mais Vendidos
                </h2>

                <div className="divide-y divide-gray-100">

                    {maisVendidos.map((produto, index) => (
                        <div
                            key={produto.nome}
                            className="flex items-center gap-3 py-3"
                        >

                            <span className="w-5 shrink-0 text-base font-semibold text-gray-800">
                                {index + 1}.
                            </span>

                            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#FAF7F5]">

                                <img
                                    src={produto.imagem}
                                    alt={produto.nome}
                                    className="h-full w-full object-contain"
                                />

                            </div>

                            <div className="min-w-0 flex-1">

                                <p className="truncate text-sm font-medium text-gray-900">
                                    {produto.nome}
                                </p>

                                <p className="text-xs text-gray-500">
                                    {produto.vendas}
                                </p>

                            </div>

                            <strong className="shrink-0 text-sm font-bold text-[#B9250B]">
                                {produto.preco}
                            </strong>

                        </div>
                    ))}

                </div>
            </article>

        </section>
    );
}
