
import { useEffect, useState } from "react";
import {
    Search,
    SlidersHorizontal,
    CalendarDays,
    Clock3,
    Truck,
    CircleCheck,
    MoreVertical,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";

// Ajuste o caminho se seu api.js estiver em outra pasta.
import { api } from "../../services/api";

const pageSize = 5;

const statusStyles = {
    "Em preparação": {
        badge: "bg-orange-100 text-orange-700",
        icon: Clock3,
    },
    Aguardando: {
        badge: "bg-amber-100 text-amber-700",
        icon: Clock3,
    },
    Enviado: {
        badge: "bg-sky-100 text-sky-700",
        icon: Truck,
    },
    Concluído: {
        badge: "bg-emerald-100 text-emerald-700",
        icon: CircleCheck,
    },
    Cancelado: {
        badge: "bg-red-100 text-red-700",
        icon: CircleCheck,
    },
    Confirmado: {
        badge: "bg-amber-100 text-amber-700",
        icon: Clock3,
    },
};

function normalizarStatus(status) {
    const valor = String(status ?? "").toUpperCase();

    const mapa = {
        AGUARDANDO: "Aguardando",
        AGUARDANDO_PAGAMENTO: "Aguardando",
        PENDENTE: "Aguardando",
        CONFIRMADO: "Confirmado",
        EM_PREPARACAO: "Em preparação",
        EM_PREPARAÇÃO: "Em preparação",
        ENVIADO: "Enviado",
        ENVIADA: "Enviado",
        CONCLUIDO: "Concluído",
        CONCLUÍDO: "Concluído",
        ENTREGUE: "Concluído",
        CANCELADO: "Cancelado",
    };

    return mapa[valor] ?? status ?? "Aguardando";
}

function formatarData(data) {
    if (!data) return "—";

    const dataObj = new Date(data);

    if (Number.isNaN(dataObj.getTime())) return "—";

    return dataObj.toLocaleDateString("pt-BR", {
        timeZone: "America/Recife",
    });
}

function currency(value) {
    return Number(value ?? 0).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    });
}

function StatusBadge({ status }) {
    const config = statusStyles[status] ?? statusStyles.Aguardando;
    const Icon = config.icon;

    return (
        <span
            className={`inline-flex items-center gap-2 whitespace-nowrap rounded-xl px-3 py-2 text-xs font-medium ${config.badge}`}
        >
            <Icon size={16} />
            {status}
        </span>
    );
}

function converterPedido(pedido) {
    return {
        id: pedido.id,
        numeroPedido: pedido.numeroPedido,
        cliente: pedido.nomeCliente || "Cliente não informado",
        data: formatarData(pedido.dataCriacao),
        itens: pedido.quantidadeItens ?? 0,
        valor: Number(pedido.valorTotal ?? 0),
        status: normalizarStatus(pedido.status),
    };
}

export default function OrdersList() {
    const [orders, setOrders] = useState([]);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("Todos os status");
    const [periodFilter, setPeriodFilter] = useState("Todo o período");
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [totalElements, setTotalElements] = useState(0);
    const [openMenu, setOpenMenu] = useState(null);
    const [lojaId, setLojaId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Identifica a loja do usuário autenticado.
    useEffect(() => {
        let ativo = true;

        async function carregarUsuario() {
            try {
                const response = await api("/usuarios/me");

                if (!response.ok) {
                    throw new Error(
                        `Não foi possível identificar a loja (${response.status}).`
                    );
                }

                const usuario = await response.json();

                if (!usuario.lojaId) {
                    throw new Error(
                        "O usuário autenticado não possui uma loja vinculada."
                    );
                }

                if (ativo) setLojaId(usuario.lojaId);
            } catch (err) {
                if (ativo) {
                    setError(err.message || "Erro ao carregar usuário.");
                    setLoading(false);
                }
            }
        }

        carregarUsuario();

        return () => {
            ativo = false;
        };
    }, []);

    // Carrega uma página de pedidos da loja.
    useEffect(() => {
        if (!lojaId) return;

        let ativo = true;

        async function carregarPedidos() {
            setLoading(true);
            setError("");

            try {
                const params = new URLSearchParams({
                    pagina: String(page),
                    tamanho: String(pageSize),
                });

                const response = await api(
                    `/api/lojas/${lojaId}/pedidos?${params.toString()}`
                );

                if (!response.ok) {
                    const mensagem = await response.text();
                    throw new Error(
                        mensagem || `Erro ao carregar pedidos (${response.status}).`
                    );
                }

                const resultado = await response.json();

                if (!ativo) return;

                setOrders((resultado.content ?? []).map(converterPedido));
                setTotalPages(resultado.totalPages ?? 0);
                setTotalElements(resultado.totalElements ?? 0);
            } catch (err) {
                if (ativo) {
                    setError(err.message || "Erro ao carregar pedidos.");
                    setOrders([]);
                }
            } finally {
                if (ativo) setLoading(false);
            }
        }

        carregarPedidos();

        return () => {
            ativo = false;
        };
    }, [lojaId, page]);

    // Os filtros abaixo são aplicados aos pedidos da página carregada.
    const filteredOrders = orders.filter((order) => {
        const query = search.trim().toLowerCase();

        const matchesSearch =
            String(order.id).includes(query) ||
            String(order.numeroPedido ?? "").toLowerCase().includes(query) ||
            order.cliente.toLowerCase().includes(query);

        const matchesStatus =
            statusFilter === "Todos os status" ||
            order.status === statusFilter;

        const dataPedido = order.data.split("/");
        const data = dataPedido.length === 3
            ? new Date(
                Number(dataPedido[2]),
                Number(dataPedido[1]) - 1,
                Number(dataPedido[0])
            )
            : null;

        const hoje = new Date();
        hoje.setHours(0, 0, 0, 0);

        const diasAtras = data
            ? (hoje.getTime() - data.getTime()) / 86400000
            : null;

        const matchesPeriod =
            periodFilter === "Todo o período" ||
            (diasAtras !== null &&
                diasAtras >= 0 &&
                diasAtras <=
                    (periodFilter === "Últimos 7 dias" ? 7 : 30));

        return matchesSearch && matchesStatus && matchesPeriod;
    });

    return (
        <section className="h-30 pb-10 font-['Poppins']">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
                <div className="flex min-w-0 flex-1 items-center gap-3 rounded-lg border border-temp-1 bg-white px-4">
                    <Search
                        size={24}
                        className="shrink-0 text-temp-1"
                    />
                    <input
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        placeholder="Buscar por pedido ou cliente..."
                        className="h-14 w-full min-w-0 bg-transparent text-sm outline-none placeholder:text-[#8ca0bd]"
                    />
                </div>

                <div className="flex h-14 items-center gap-3 rounded-lg border border-temp-1 bg-white px-3">
                    <SlidersHorizontal size={20} className="text-temp-1" />
                    <select
                        value={statusFilter}
                        onChange={(event) => setStatusFilter(event.target.value)}
                        className="max-w-44 cursor-pointer bg-transparent p-1 text-sm outline-none"
                    >
                        {[
                            "Todos os status",
                            "Aguardando",
                            "Confirmado",
                            "Em preparação",
                            "Enviado",
                            "Concluído",
                            "Cancelado",
                        ].map((status) => (
                            <option key={status} value={status}>
                                {status}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex h-14 items-center gap-3 rounded-lg border border-temp-1 bg-white px-3">
                    <CalendarDays size={20} className="text-temp-1" />
                    <select
                        value={periodFilter}
                        onChange={(event) => setPeriodFilter(event.target.value)}
                        className="max-w-44 cursor-pointer bg-transparent p-1 text-sm outline-none"
                    >
                        {[
                            "Todo o período",
                            "Últimos 7 dias",
                            "Últimos 30 dias",
                        ].map((periodo) => (
                            <option key={periodo} value={periodo}>
                                {periodo}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {error && (
                <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                    {error}
                </div>
            )}

            <div className="overflow-x-auto rounded-lg bg-white">
                <table className="w-full min-w-[850px] border-collapse text-left text-sm">
                    <thead className="bg-bege text-temp-1">
                        <tr>
                            {[
                                "Pedido",
                                "Cliente",
                                "Data",
                                "Itens",
                                "Valor",
                                "Status",
                                "Ações",
                            ].map((heading) => (
                                <th
                                    key={heading}
                                    className="whitespace-nowrap px-5 py-5 font-semibold"
                                >
                                    {heading}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody className="font-semibold text-marrom-2">
                        {loading ? (
                            <tr>
                                <td colSpan={7} className="px-5 py-12 text-center">
                                    Carregando pedidos...
                                </td>
                            </tr>
                        ) : filteredOrders.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={7}
                                    className="px-5 py-12 text-center text-temp-1-5"
                                >
                                    Nenhum pedido encontrado.
                                </td>
                            </tr>
                        ) : (
                            filteredOrders.map((order) => (
                                <tr
                                    key={order.id}
                                    className="border-b border-bege hover:bg-[#fdfbf9]"
                                >
                                    <td className="whitespace-nowrap px-5 py-5 font-medium">
                                        #{order.numeroPedido || order.id}
                                    </td>
                                    <td className="whitespace-nowrap px-5 py-5">
                                        {order.cliente}
                                    </td>
                                    <td className="whitespace-nowrap px-5 py-5">
                                        {order.data}
                                    </td>
                                    <td className="px-5 py-5">{order.itens}</td>
                                    <td className="whitespace-nowrap px-5 py-5 font-medium">
                                        {currency(order.valor)}
                                    </td>
                                    <td className="px-5 py-5">
                                        <StatusBadge status={order.status} />
                                    </td>
                                    <td className="px-5 py-5">
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setOpenMenu(
                                                    openMenu === order.id
                                                        ? null
                                                        : order.id
                                                )
                                            }
                                            aria-label={`Ações do pedido ${order.id}`}
                                            className="cursor-pointer rounded-lg border border-bege p-2 text-temp-1 hover:bg-bege"
                                        >
                                            <MoreVertical size={19} />
                                        </button>

                                        {openMenu === order.id && (
                                            <div className="absolute z-20 mt-2 w-48 rounded-lg border border-[#e0d7d2] bg-white p-2 shadow-lg">
                                                <p className="px-3 py-2 text-xs font-semibold text-[#8a7569]">
                                                    Status atual: {order.status}
                                                </p>
                                                <p className="px-3 py-2 text-xs text-gray-500">
                                                    A atualização de status será
                                                    conectada quando houver endpoint
                                                    de alteração no backend.
                                                </p>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            <footer className="mt-5 flex flex-wrap items-center justify-between gap-4 pb-4">
                <p className="text-sm font-light text-temp-1-5">
                    {totalElements === 0
                        ? "Nenhum pedido"
                        : `Página ${page + 1} de ${Math.max(totalPages, 1)} — ${totalElements} pedidos`}
                </p>

                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={() => setPage((atual) => Math.max(0, atual - 1))}
                        disabled={loading || page === 0}
                        aria-label="Página anterior"
                        className="cursor-pointer rounded-lg bg-bege p-2 font-bold text-temp-1 hover:bg-temp-1 hover:text-white disabled:opacity-40"
                    >
                        <ChevronLeft size={19} />
                    </button>

                    <span className="rounded-lg bg-temp-1 px-4 py-2 text-sm font-semibold text-white">
                        {page + 1}
                    </span>

                    <button
                        type="button"
                        onClick={() =>
                            setPage((atual) =>
                                Math.min(Math.max(totalPages - 1, 0), atual + 1)
                            )
                        }
                        disabled={loading || page + 1 >= totalPages}
                        aria-label="Próxima página"
                        className="cursor-pointer rounded-lg bg-bege p-2 font-bold text-temp-1 hover:bg-temp-1 hover:text-white disabled:opacity-40"
                    >
                        <ChevronRight size={19} />
                    </button>
                </div>
            </footer>
        </section>
    );
}
