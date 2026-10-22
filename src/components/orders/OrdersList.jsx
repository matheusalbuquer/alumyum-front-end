
import { useState } from "react";
import {
    Plus,
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

const initialOrders = [
    { id: 1036, cliente: "Ana Claudia", data: "21/10/2026", itens: 3, valor: 189.90, status: "Em preparação" },
    { id: 1035, cliente: "Lucas Medeiros", data: "21/10/2026", itens: 2, valor: 79.90, status: "Aguardando" },
    { id: 1034, cliente: "Mariana Petra", data: "20/10/2026", itens: 5, valor: 320.00, status: "Enviado" },
    { id: 1033, cliente: "João Silva", data: "20/10/2026", itens: 1, valor: 45.00, status: "Concluído" },
    { id: 1032, cliente: "Beatriz Cervantes", data: "19/10/2026", itens: 4, valor: 215.50, status: "Concluído" },
    { id: 1031, cliente: "Pedro Sampaio", data: "19/10/2026", itens: 2, valor: 99.90, status: "Cancelado" },
    { id: 1030, cliente: "Julia Karla", data: "18/10/2026", itens: 3, valor: 150.00, status: "Aguardando" },
    { id: 1029, cliente: "Rafael da Silva", data: "18/10/2026", itens: 1, valor: 65.00, status: "Enviado" },

    { id: 1028, cliente: "Ana Souza", data: "21/10/2026", itens: 3, valor: 189.90, status: "Em preparação" },
    { id: 1027, cliente: "Lucas Mendes", data: "21/10/2026", itens: 2, valor: 79.90, status: "Aguardando" },
    { id: 1026, cliente: "Mariana Lima", data: "20/10/2026", itens: 5, valor: 320.00, status: "Enviado" },
    { id: 1025, cliente: "João Costa", data: "20/10/2026", itens: 1, valor: 45.00, status: "Concluído" },
    { id: 1024, cliente: "Beatriz Alves", data: "19/10/2026", itens: 4, valor: 215.50, status: "Concluído" },
    { id: 1023, cliente: "Pedro Santos", data: "19/10/2026", itens: 2, valor: 99.90, status: "Cancelado" },
    { id: 1022, cliente: "Julia Martins", data: "18/10/2026", itens: 3, valor: 150.00, status: "Aguardando" },
    { id: 1021, cliente: "Rafael Costa", data: "18/10/2026", itens: 1, valor: 65.00, status: "Enviado" },
];

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
};

const currency = (value) =>
    value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    });

function StatusBadge({ status }) {
    const config = statusStyles[status];
    const Icon = config.icon;

    return (
        <span className={`inline-flex items-center gap-2 whitespace-nowrap rounded-xl px-3 py-2 text-xs font-medium ${config.badge}`}>
            <Icon size={16} />
            {status}
        </span>
    );
}

export default function OrdersList() {
    const [orders, setOrders] = useState(initialOrders);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("Todos os status");
    const [periodFilter, setPeriodFilter] = useState("Todo o período");
    const [page, setPage] = useState(1);
    const [openMenu, setOpenMenu] = useState(null);

    const pageSize = 5;

    const filteredOrders = orders.filter((order) => {
        const query = search.toLowerCase();

        const matchesSearch =
            String(order.id).includes(query) ||
            `#ped-${order.id}`.includes(query) ||
            order.cliente.toLowerCase().includes(query);

        const matchesStatus =
            statusFilter === "Todos os status" ||
            order.status === statusFilter;

        const [day, month, year] = order.data.split("/").map(Number);
        const orderDate = new Date(year, month - 1, day);
        const today = new Date(2026, 9, 21);

        const daysAgo = (today - orderDate) / (1000 * 60 * 60 * 24);

        const matchesPeriod =
            periodFilter === "Todo o período" ||
            (periodFilter === "Últimos 7 dias" &&
                daysAgo >= 0 && daysAgo <= 7) ||
            (periodFilter === "Últimos 30 dias" &&
                daysAgo >= 0 && daysAgo <= 30);

        return matchesSearch && matchesStatus && matchesPeriod;
    });

    const totalPages = Math.max(
        1,
        Math.ceil(filteredOrders.length / pageSize)
    );

    const currentPage = Math.min(page, totalPages);

    const visibleOrders = filteredOrders.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    function changeStatus(id, status) {
        setOrders((previous) =>
            previous.map((order) =>
                order.id === id ? { ...order, status } : order
            )
        );
        setOpenMenu(null);
    }

    function createOrder() {
        const newId =
            Math.max(...orders.map((order) => order.id), 1023) + 1;

        setOrders((previous) => [
            {
                id: newId,
                cliente: "Novo cliente",
                data: "21/10/2026",
                itens: 1,
                valor: 0,
                status: "Aguardando",
            },
            ...previous,
        ]);

        setSearch("");
        setStatusFilter("Todos os status");
        setPeriodFilter("Todo o período");
        setPage(1);
    }

    return (
        <section className="h-30 pb-10">
            {/* Cabeçalho da lista */}
            <div className="flex mb-4 flex-wrap items-center justify-between gap-4">
                <div className="flex min-w-0 flex-1 items-center gap-3 rounded-lg border border-temp-1 bg-white px-4">
                    <Search size={32} className="shrink-0 cursor-pointer p-1 text-temp-1 rounded hover:bg-temp-1 hover:text-white" />
                    <input
                        value={search}
                        onChange={(event) => {
                            setSearch(event.target.value);
                            setPage(1);
                        }}
                        placeholder="Buscar por pedido ou cliente..."
                        className="h-14  min-w-0 w-full bg-transparent text-sm outline-none placeholder:text-[#8ca0bd]"
                    />
                </div>

                <div className="flex group hover:text-white h-14 items-center gap-3 rounded-lg border border-temp-1 hover:bg-temp-1  bg-white px-3">
                    <SlidersHorizontal size={20} className="text-temp-1 group-hover:text-white" />
                    <select
                        value={statusFilter}
                        onChange={(event) => {
                            setStatusFilter(event.target.value);
                            setPage(1);
                        }}
                        className="max-w-44 cursor-pointer p-1 bg-transparent text-sm outline-none"
                    >
                        <option className="group-hover:text-temp-1">Todos os status</option>
                        <option className="group-hover:text-temp-1">Aguardando</option>
                        <option className="group-hover:text-temp-1">Em preparação</option>
                        <option className="group-hover:text-temp-1">Enviado</option>
                        <option className="group-hover:text-temp-1">Concluído</option>
                        <option className="group-hover:text-temp-1">Cancelado</option>
                    </select>
                </div>

                <div className="flex group hover:text-white h-14 items-center gap-3 rounded-lg border border-temp-1 hover:bg-temp-1  bg-white px-3">
                    <CalendarDays size={20} className="text-temp-1 group-hover:text-white" />
                    <select
                        value={periodFilter}
                        onChange={(event) => {
                            setPeriodFilter(event.target.value);
                            setPage(1);
                        }}
                        className="max-w-44 cursor-pointer p-1 bg-transparent text-sm outline-none"
                    >
                        <option className="group-hover:text-temp-1">Todo o período</option>
                        <option className="group-hover:text-temp-1">Últimos 7 dias</option>
                        <option className="group-hover:text-temp-1">Últimos 30 dias</option>
                    </select>
                </div>


            </div>

            {/* Tabela */}
            <div className="font-['Poppins'] overflow-x-auto rounded-lg  bg-white">
                <table className="w-full max-h-25 min-w-[850px] border-collapse text-left text-sm">
                    <thead className="bg-bege text-temp-1">
                        <tr>
                            {["Pedido", "Cliente", "Data", "Itens", "Valor", "Status", "Ações"].map((heading) => (
                                <th key={heading} className="whitespace-nowrap px-5 py-5 font-semibold">
                                    {heading}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody className="text-marrom-2 font-semibold">
                        {visibleOrders.map((order) => (
                            <tr key={order.id} className="  border-b border-bege hover:bg-[#fdfbf9]">
                                <td className="whitespace-nowrap px-5 py-5 font-medium ">
                                    #PED-{order.id}
                                </td>
                                <td className="whitespace-nowrap px-5 py-5 font-semibold text-marrom-2  ">{order.cliente}</td>
                                <td className="whitespace-nowrap px-5 py-5">{order.data}</td>
                                <td className="px-5 py-5">{order.itens}</td>
                                <td className="whitespace-nowrap px-5 py-5 font-medium">
                                    {currency(order.valor)}
                                </td>
                                <td className="px-5 py-5">
                                    <StatusBadge status={order.status} />
                                </td>
                                <td className="relative px-5 py-5">
                                    <button
                                        onClick={() =>
                                            setOpenMenu(openMenu === order.id ? null : order.id)
                                        }
                                        aria-label={`Ações do pedido ${order.id}`}
                                        className="cursor-pointer text-temp-1 rounded-lg border border-bege p-2 hover:bg-bege"
                                    >
                                        <MoreVertical size={19} />
                                    </button>

                                    {openMenu === order.id && (
                                        <div className="absolute right-10 top-8 z-20 w-48 rounded-lg border border-[#e0d7d2] bg-white p-2 shadow-lg">
                                            <p className="px-3 py-2 text-xs font-semibold text-[#8a7569]">
                                                Alterar status
                                            </p>

                                            {Object.keys(statusStyles).map((status) => (
                                                <button
                                                    key={status}
                                                    onClick={() => changeStatus(order.id, status)}
                                                    className="w-full rounded-md px-3 py-2 text-left text-xs hover:bg-[#f5eee7]"
                                                >
                                                    {status}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}

                        {visibleOrders.length === 0 && (
                            <tr>
                                <td colSpan={7} className="px-5 py-12 text-center font-semibold text-temp-1-5">
                                    <span>Nenhum pedido encontrado :(</span>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Paginação */}
            <footer className="font-['Poppins'] mt-5  pb-4 flex flex-wrap items-center justify-between gap-4">
                <p className="font-light text-sm text-temp-1-5">
                    Mostrando{" "}
                    {filteredOrders.length === 0
                        ? 0
                        : (currentPage - 1) * pageSize + 1}
                    –{Math.min(currentPage * pageSize, filteredOrders.length)} de{" "}
                    {filteredOrders.length} pedidos
                </p>

                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setPage(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                        aria-label="Página anterior"
                        className="cursor-pointer text-temp-1 bg-bege rounded-lg p-2 hover:bg-temp-1 hover:text-white disabled:opacity-40 font-bold"
                    >
                        <ChevronLeft size={19} />
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1)
                        .slice(
                            Math.max(0, Math.min(currentPage - 3, totalPages - 5)),
                            Math.max(0, Math.min(currentPage - 3, totalPages - 5)) + 5
                        )
                        .map((number) => (
                            <button
                                key={number}
                                onClick={() => setPage(number)}
                                className={`h-10 min-w-10 rounded-lg border cursor-pointer px-3 font-semibold  text-temp-1 text-sm ${currentPage === number
                                    ? "border-bege bg-temp-1 text-white "
                                    : "border-bege hover:bg-bege"
                                    }`}
                            >
                                {number}
                            </button>
                        ))}

                    <button
                        onClick={() => setPage(Math.min(totalPages, currentPage + 1))}
                        disabled={currentPage === totalPages}
                        aria-label="Próxima página"
                        className="cursor-pointer text-temp-1 bg-bege rounded-lg p-2 hover:bg-temp-1 hover:text-white disabled:opacity-40 font-bold"
                    >
                        <ChevronRight size={19} />
                    </button>
                </div>
            </footer>
        </section>
    );
}
