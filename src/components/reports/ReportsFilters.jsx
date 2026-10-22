import { Search, CalendarDays, FileText, SlidersHorizontal } from "lucide-react";

export default function ReportsFilters({
    pesquisa,
    setPesquisa,
    periodo,
    setPeriodo,
    tipo,
    setTipo,
}) {
    return (
        <section className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(200px,1fr)_minmax(180px,0.5fr)_minmax(180px,0.5fr)_auto] lg:items-end">
            <div className="relative">
                <Search
                    size={21}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#737373]"
                />

                <input
                    type="search"
                    placeholder="Pesquisar relatórios..."
                    value={pesquisa}
                    onChange={(e) => setPesquisa(e.target.value)}
                    className="h-12 w-full rounded-lg border border-[#E5E5E5] pl-12 pr-4 outline-none transition focus:border-[#B51B00] focus:ring-2 focus:ring-[#B51B00]/10"
                />
            </div>

            <label className="flex flex-col gap-2 text-sm text-[#555]">


                <span className="relative">
                    <CalendarDays
                        size={19}
                        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2"
                    />

                    <select
                        value={periodo}
                        onChange={(e) => setPeriodo(e.target.value)}
                        className="h-11 w-full appearance-none rounded-lg border border-[#E5E5E5] bg-white pl-10 pr-3 text-sm text-[#222] outline-none focus:border-[#B51B00]"
                    >
                        <option value="">Todos os períodos</option>
                        <option value="Outubro 2026">Outubro 2026</option>
                        <option value="Setembro 2026">Setembro 2026</option>
                        <option value="Últimos 30 dias">Últimos 30 dias</option>
                    </select>
                </span>
            </label>

            <label className="flex flex-col gap-2 text-sm text-[#555]">


                <span className="relative">
                    <FileText
                        size={19}
                        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2"
                    />

                    <select
                        value={tipo}
                        onChange={(e) => setTipo(e.target.value)}
                        className="h-11 w-full appearance-none rounded-lg border border-[#E5E5E5] bg-white pl-10 pr-3 text-sm text-[#222] outline-none focus:border-[#B51B00]"
                    >
                        <option value="">Todos os tipos</option>
                        <option value="Vendas">Vendas</option>
                        <option value="Pedidos">Pedidos</option>
                        <option value="Produtos">Produtos</option>
                        <option value="Atendimentos">Atendimentos</option>
                        <option value="Geral">Geral</option>
                    </select>
                </span>
            </label>

            <button
                type="button"
                className="flex h-12 items-center justify-center gap-2 rounded-lg bg-[#B51B00] px-6 font-semibold text-white transition hover:bg-[#921600]"
            >
                <SlidersHorizontal size={19} />
                Filtrar
            </button>
        </section>
    );
}