
import { useState, useEffect } from "react";
import {
    FileText,
    CalendarDays,
    Download,
    MoreHorizontal,
} from "lucide-react";

const coresTipo = {
    Vendas: "bg-[#FCE8E6] text-[#B51B00]",
    Pedidos: "bg-blue-100 text-blue-700",
    Produtos: "bg-purple-100 text-purple-700",
    Atendimentos: "bg-orange-100 text-orange-700",
    Geral: "bg-gray-200 text-gray-600",
};

export default function ReportsCharts({ relatorios }) {
    const [menuAberto, setMenuAberto] = useState(null);
    const [paginaAtual, setPaginaAtual] = useState(1);

    const itensPorPagina = 5;

    const totalPaginas = Math.ceil(
        relatorios.length / itensPorPagina
    );

    const indiceInicial = (paginaAtual - 1) * itensPorPagina;

    const relatoriosPaginados = relatorios.slice(
        indiceInicial,
        indiceInicial + itensPorPagina
    );

    // Volta à primeira página quando os filtros alteram a lista.
    useEffect(() => {
        setPaginaAtual(1);
    }, [relatorios]);

    function baixarRelatorio(relatorio) {
        const conteudo = [
            `Relatório: ${relatorio.nome}`,
            `Tipo: ${relatorio.tipo}`,
            `Período: ${relatorio.periodo}`,
            `Data: ${relatorio.data}`,
            `Status: ${relatorio.status}`,
            `Descrição: ${relatorio.descricao}`,
        ].join("\n");

        const arquivo = new Blob([conteudo], {
            type: "text/plain;charset=utf-8",
        });

        const url = URL.createObjectURL(arquivo);
        const link = document.createElement("a");

        link.href = url;
        link.download = `${relatorio.nome}.txt`;
        link.click();

        URL.revokeObjectURL(url);
    }

    return (
        <section className="rounded-xl bg-white">
            <div className="mb-5" />

            <div className="overflow-x-auto">
                <table className="w-full min-w-[900px] border-collapse text-left">
                    <thead>
                        <tr className="bg-[#F0F1F3] text-xs uppercase text-[#626262]">
                            <th className="rounded-l-lg px-3 py-3">
                                Relatório
                            </th>
                            <th className="px-3 py-3">Tipo</th>
                            <th className="px-3 py-3">Período</th>
                            <th className="px-3 py-3">Data</th>
                            <th className="px-3 py-3">Status</th>
                            <th className="rounded-r-lg px-3 py-3 text-center">
                                Ações
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {relatoriosPaginados.map((relatorio) => (
                            <tr
                                key={relatorio.id}
                                className="border-b border-[#EEEEEE] transition hover:bg-[#FFF9F7]"
                            >
                                <td className="px-3 py-3">
                                    <div className="flex items-center gap-3">
                                        <FileText
                                            size={25}
                                            className="shrink-0 text-[#B51B00]"
                                        />

                                        <div>
                                            <p className="font-semibold text-[#222]">
                                                {relatorio.nome}
                                            </p>
                                            <p className="text-sm text-[#808080]">
                                                {relatorio.descricao}
                                            </p>
                                        </div>
                                    </div>
                                </td>

                                <td className="px-3 py-3">
                                    <span
                                        className={`rounded-full px-3 py-1 text-xs font-medium ${coresTipo[relatorio.tipo] ??
                                            "bg-gray-100 text-gray-600"
                                            }`}
                                    >
                                        {relatorio.tipo}
                                    </span>
                                </td>

                                <td className="whitespace-nowrap px-3 py-3 text-sm text-[#666]">
                                    {relatorio.periodo}
                                </td>

                                <td className="whitespace-nowrap px-3 py-3">
                                    <div className="flex items-center gap-2 text-sm text-[#666]">
                                        <CalendarDays size={17} />
                                        {relatorio.data}
                                    </div>
                                </td>

                                <td className="px-3 py-3">
                                    <span
                                        className={`whitespace-nowrap rounded-full px-3 py-1 text-xs font-medium ${relatorio.status === "Concluído"
                                                ? "bg-emerald-100 text-emerald-700"
                                                : "bg-amber-100 text-amber-700"
                                            }`}
                                    >
                                        {relatorio.status}
                                    </span>
                                </td>

                                <td className="px-3 py-3">
                                    <div className="flex items-center justify-center gap-2">
                                        <button
                                            type="button"
                                            disabled={
                                                relatorio.status !== "Concluído"
                                            }
                                            onClick={() =>
                                                baixarRelatorio(relatorio)
                                            }
                                            className="flex items-center gap-2 rounded-lg border border-[#E5E5E5] px-3 py-2 text-sm font-medium text-[#B51B00] transition hover:bg-[#FCEAE7] disabled:cursor-not-allowed disabled:opacity-40"
                                        >
                                            <Download size={17} />
                                            Baixar
                                        </button>

                                        <div className="relative">
                                            <button
                                                type="button"
                                                aria-label={`Mais ações para ${relatorio.nome}`}
                                                onClick={() =>
                                                    setMenuAberto(
                                                        menuAberto === relatorio.id
                                                            ? null
                                                            : relatorio.id
                                                    )
                                                }
                                                className="rounded-lg p-2 text-[#555] hover:bg-gray-100"
                                            >
                                                <MoreHorizontal size={21} />
                                            </button>

                                            {menuAberto === relatorio.id && (
                                                <div className="absolute right-0 z-10 mt-1 w-40 rounded-lg border border-gray-200 bg-white p-1 shadow-lg">
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            navigator.clipboard?.writeText(
                                                                `${relatorio.nome} - ${relatorio.periodo}`
                                                            );
                                                            setMenuAberto(null);
                                                        }}
                                                        className="w-full rounded-md px-3 py-2 text-left text-sm hover:bg-gray-100"
                                                    >
                                                        Copiar informações
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))}

                        {relatoriosPaginados.length === 0 && (
                            <tr>
                                <td
                                    colSpan={6}
                                    className="px-4 py-10 text-center text-sm text-gray-500"
                                >
                                    Nenhum relatório encontrado.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

                {/* Paginação */}
                <div className="mt-5 flex flex-col items-center justify-between gap-4 sm:flex-row">
                    <p className="text-sm text-[#808080]">
                        Mostrando{" "}
                        {relatorios.length === 0
                            ? 0
                            : indiceInicial + 1}
                        {" a "}
                        {Math.min(
                            indiceInicial + itensPorPagina,
                            relatorios.length
                        )}
                        {" de "}
                        {relatorios.length} relatórios
                    </p>

                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={() =>
                                setPaginaAtual((pagina) => pagina - 1)
                            }
                            disabled={paginaAtual <= 1}
                            className="rounded-lg border border-[#E5E5E5] px-4 py-2 text-sm text-[#B51B00] transition hover:bg-[#FCEAE7] disabled:cursor-not-allowed disabled:opacity-40"
                        >
                            Anterior
                        </button>

                        {Array.from(
                            { length: totalPaginas },
                            (_, index) => {
                                const pagina = index + 1;

                                return (
                                    <button
                                        key={pagina}
                                        type="button"
                                        onClick={() => setPaginaAtual(pagina)}
                                        aria-current={
                                            paginaAtual === pagina
                                                ? "page"
                                                : undefined
                                        }
                                        className={`h-9 min-w-9 rounded-lg px-3 text-sm transition ${paginaAtual === pagina
                                                ? "bg-[#B51B00] font-semibold text-white"
                                                : "border border-[#E5E5E5] text-[#555] hover:bg-[#FCEAE7]"
                                            }`}
                                    >
                                        {pagina}
                                    </button>
                                );
                            }
                        )}

                        <button
                            type="button"
                            onClick={() =>
                                setPaginaAtual((pagina) => pagina + 1)
                            }
                            disabled={
                                paginaAtual >= totalPaginas ||
                                totalPaginas === 0
                            }
                            className="rounded-lg border border-[#E5E5E5] px-4 py-2 text-sm text-[#B51B00] transition hover:bg-[#FCEAE7] disabled:cursor-not-allowed disabled:opacity-40"
                        >
                            Próxima
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
