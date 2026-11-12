
import {
    Building2,
    Plus,
    Layers3,
    Tag,
    FileText,
    ChevronRight,
    MoreHorizontal,
} from "lucide-react";

import {
    empresasRecentes,
    acoesRapidas,
} from "../data/data";

const iconesAcoes = {
    plus: Plus,
    layers: Layers3,
    tag: Tag,
    file: FileText,
};

export default function Listas() {
    return (
        <section className="grid grid-cols-1 gap-5 2xl:grid-cols-[1.55fr_1fr]">

            {/* Empresas recentes */}
            <article className="min-w-0 rounded-2xl border border-[#EEE5E5] bg-white p-5 shadow-sm">

                <div className="mb-5 flex items-center justify-between gap-3">

                    <h2 className="flex items-center gap-3 text-xl font-bold text-[#171313]">
                        <Building2
                            size={26}
                            className="text-[#B90019]"
                        />
                        Empresas Recentes
                    </h2>

                    <button
                        type="button"
                        className="flex items-center gap-1 whitespace-nowrap text-sm font-bold text-[#B90019] transition hover:text-[#79000D]"
                    >
                        Ver todas
                        <ChevronRight size={18} />
                    </button>

                </div>

                <div className="w-full overflow-x-auto">

                    <table className="w-full min-w-[700px] border-collapse text-left">

                        <thead>
                            <tr className="bg-[#F4F3F4] text-sm text-[#211B1B]">
                                <th className="rounded-l-lg px-3 py-3 font-bold">
                                    Empresa
                                </th>

                                <th className="px-3 py-3 font-bold">
                                    Plano
                                </th>

                                <th className="px-3 py-3 font-bold">
                                    Status
                                </th>

                                <th className="px-3 py-3 font-bold">
                                    Assinatura
                                </th>

                                <th className="px-3 py-3 font-bold">
                                    MRR
                                </th>

                                <th className="rounded-r-lg px-3 py-3">
                                </th>
                            </tr>
                        </thead>

                        <tbody>

                            {empresasRecentes.map((empresa) => (
                                <tr
                                    key={empresa.id}
                                    className="border-b border-[#F0EEEE] transition hover:bg-[#FFF9F9]"
                                >

                                    {/* Empresa */}
                                    <td className="px-3 py-3">
                                        <div className="flex items-center gap-3">

                                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#B90019] text-white">
                                                <span className="text-2xl">♧</span>
                                            </div>

                                            <div>
                                                <p className="text-sm font-bold text-[#171313]">
                                                    {empresa.nome}
                                                </p>

                                                <span className="text-xs text-gray-600">
                                                    {empresa.dominio}
                                                </span>
                                            </div>

                                        </div>
                                    </td>

                                    {/* Plano */}
                                    <td className="px-3 py-3">
                                        <span
                                            className={`whitespace-nowrap rounded-md px-2.5 py-1.5 text-xs font-bold ${empresa.plano === "Básico"
                                                ? "bg-[#FCE7E9] text-[#B90019]"
                                                : empresa.plano === "Profissional"
                                                    ? "bg-[#FCE7E9] text-[#B90019]"
                                                    : "bg-[#B90019] text-white"
                                                }`}
                                        >
                                            {empresa.plano}
                                        </span>
                                    </td>

                                    {/* Status */}
                                    <td className="px-3 py-3">
                                        <span className="flex items-center gap-2 whitespace-nowrap text-sm font-medium text-[#159447]">
                                            <span className="h-2.5 w-2.5 rounded-full bg-[#159447]" />
                                            {empresa.status}
                                        </span>
                                    </td>

                                    {/* Assinatura */}
                                    <td className="whitespace-nowrap px-3 py-3 text-sm text-[#211B1B]">
                                        {empresa.assinatura}
                                    </td>

                                    {/* MRR */}
                                    <td className="whitespace-nowrap px-3 py-3 text-sm font-semibold text-[#211B1B]">
                                        {empresa.mrr}
                                    </td>

                                    {/* Opções */}
                                    <td className="px-3 py-3">
                                        <button
                                            type="button"
                                            aria-label={`Opções de ${empresa.nome}`}
                                            className="rounded-lg p-1 text-[#211B1B] transition hover:bg-gray-100"
                                        >
                                            <MoreHorizontal size={21} />
                                        </button>
                                    </td>

                                </tr>
                            ))}

                        </tbody>
                    </table>

                </div>
            </article>

            {/* Ações rápidas */}
            <article className="rounded-2xl border border-[#EEE5E5] bg-white p-5 shadow-sm">

                <h2 className="mb-5 flex items-center gap-3 text-xl font-bold text-[#171313]">
                    <span className="text-[#B90019]">
                        <svg
                            width="27"
                            height="27"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M13 2 3 14h8l-1 8 11-13h-8l1-7Z" />
                        </svg>
                    </span>
                    Ações Rápidas
                </h2>

                <div className="space-y-2">

                    {acoesRapidas.map((acao) => {
                        const Icon = iconesAcoes[acao.icone];

                        return (
                            <button
                                key={acao.id}
                                type="button"
                                className="flex w-full items-center justify-between gap-3 rounded-xl border border-[#EDE5E5] px-4 py-3 text-left transition hover:border-[#B90019] hover:bg-[#FFF5F5]"
                            >

                                <span className="flex items-center gap-4">
                                    <Icon
                                        size={22}
                                        className="shrink-0 text-[#B90019]"
                                    />

                                    <span className="text-sm font-medium text-[#211B1B]">
                                        {acao.titulo}
                                    </span>
                                </span>

                                <ChevronRight
                                    size={20}
                                    className="shrink-0 text-[#B90019]"
                                />

                            </button>
                        );
                    })}

                </div>
            </article>

        </section>
    );
}
