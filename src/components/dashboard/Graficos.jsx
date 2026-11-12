
import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    PieChart,
    Pie,
    Sector,
} from "recharts";

import {
    ChartNoAxesColumnIncreasing,
    ChartPie,
} from "lucide-react";

const vendas = [
    { dia: "Seg", total: 2000 },
    { dia: "Ter", total: 4000 },
    { dia: "Qua", total: 5500 },
    { dia: "Qui", total: 4200 },
    { dia: "Sex", total: 6000 },
    { dia: "Sáb", total: 5400 },
    { dia: "Dom", total: 7500 },
];

const categorias = [
    { nome: "Camisas", valor: 45, cor: "#E9540D" },
    { nome: "Jaquetas", valor: 30, cor: "#FF956D" },
    { nome: "Acessórios", valor: 15, cor: "#B9250B" },
    { nome: "Outros", valor: 10, cor: "#FBE0D5" },
];

const periodos = ["7 dias", "30 dias", "90 dias"];

// Define a cor de cada parte do gráfico circular
function CategoriaShape(props) {
    return (
        <Sector
            {...props}
            fill={props.payload?.cor || "#E9540D"}
        />
    );
}

export default function Graficos() {
    return (
        <section className="font-['Poppins'] grid grid-cols-1 gap-4 2xl:grid-cols-[1.55fr_1fr]">

            {/* Gráfico de vendas */}
            <article className="min-w-0 rounded-2xl border border-[#F0E5E1] bg-white p-5">

                <div className="mb-5 flex flex-wrap items-center justify-between gap-3">

                    <h2 className="flex items-center gap-2 text-lg font-bold text-[#211B1B]">
                        <ChartNoAxesColumnIncreasing
                            className="text-[#D9430B]"
                            size={23}
                        />
                        Vendas nos Últimos 7 Dias
                    </h2>

                    <div className="flex rounded-full border border-gray-200 p-0.5">
                        {periodos.map((periodo, index) => (
                            <button
                                key={periodo}
                                type="button"
                                className={`cursor-pointer rounded-full px-3 py-1.5 text-xs font-semibold transition ${index === 0
                                    ? "bg-[#C8320B] text-white"
                                    : "text-gray-700 hover:bg-[#FFF0E9]"
                                    }`}
                            >
                                {periodo}
                            </button>
                        ))}
                    </div>

                </div>

                <div className="h-[260px] w-full">

                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                            data={vendas}
                            margin={{
                                top: 8,
                                right: 8,
                                left: -18,
                                bottom: 0,
                            }}
                        >

                            <defs>
                                <linearGradient
                                    id="corVendas"
                                    x1="0"
                                    y1="0"
                                    x2="0"
                                    y2="1"
                                >
                                    <stop
                                        offset="0%"
                                        stopColor="#E9540D"
                                        stopOpacity={0.25}
                                    />

                                    <stop
                                        offset="95%"
                                        stopColor="#E9540D"
                                        stopOpacity={0.02}
                                    />
                                </linearGradient>
                            </defs>

                            <CartesianGrid
                                stroke="#EEE9E7"
                                vertical={true}
                            />

                            <XAxis
                                dataKey="dia"
                                tickLine={false}
                                axisLine={false}
                                tick={{
                                    fill: "#51464A",
                                    fontSize: 12,
                                }}
                            />

                            <YAxis
                                domain={[0, 8000]}
                                ticks={[0, 2000, 4000, 6000, 8000]}
                                tickLine={false}
                                axisLine={false}
                                tick={{
                                    fill: "#51464A",
                                    fontSize: 12,
                                }}
                                tickFormatter={(valor) =>
                                    valor === 0
                                        ? "0"
                                        : `${valor / 1000}k`
                                }
                            />

                            <Tooltip
                                formatter={(valor) => [
                                    `R$ ${Number(valor).toLocaleString("pt-BR")}`,
                                    "Vendas",
                                ]}
                                contentStyle={{
                                    borderRadius: 12,
                                    borderColor: "#F0E5E1",
                                }}
                            />

                            <Area
                                type="monotone"
                                dataKey="total"
                                stroke="#E9540D"
                                strokeWidth={3}
                                fill="url(#corVendas)"
                                activeDot={{
                                    r: 6,
                                    fill: "#E9540D",
                                    stroke: "#fff",
                                    strokeWidth: 2,
                                }}
                                dot={{
                                    r: 4,
                                    fill: "#E9540D",
                                    stroke: "#fff",
                                    strokeWidth: 2,
                                }}
                            />

                        </AreaChart>
                    </ResponsiveContainer>

                </div>
            </article>

            {/* Gráfico de categorias */}
            <article className="min-w-0 rounded-2xl border border-[#F0E5E1] bg-white p-5">

                <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-[#211B1B]">
                    <ChartPie
                        className="text-[#D9430B]"
                        size={22}
                    />
                    Pedidos por Categoria
                </h2>

                <div className="grid min-h-[260px] grid-cols-1 items-center gap-2 sm:grid-cols-[1fr_1fr]">

                    {/* Gráfico circular */}
                    <div className="relative mx-auto h-[230px] w-full max-w-[260px]">

                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>

                                <Pie
                                    data={categorias}
                                    dataKey="valor"
                                    nameKey="nome"
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={62}
                                    outerRadius={96}
                                    paddingAngle={2}
                                    stroke="none"
                                    shape={CategoriaShape}
                                />

                                <Tooltip
                                    formatter={(valor) => [
                                        `${valor}%`,
                                        "Pedidos",
                                    ]}
                                />

                            </PieChart>
                        </ResponsiveContainer>

                        {/* Informação central */}
                        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                            <strong className="text-2xl text-[#211B1B]">
                                45%
                            </strong>

                            <span className="text-xs text-gray-600">
                                Camisas
                            </span>
                        </div>

                    </div>

                    {/* Legenda */}
                    <div className="space-y-4">

                        {categorias.map((item) => (
                            <div
                                key={item.nome}
                                className="flex items-center justify-between gap-3 text-sm"
                            >
                                <span className="flex items-center gap-2 text-gray-700">

                                    <span
                                        className="h-3 w-3 rounded-full"
                                        style={{
                                            backgroundColor: item.cor,
                                        }}
                                    />

                                    {item.nome}
                                </span>

                                <strong className="text-gray-900">
                                    {item.valor}%
                                </strong>
                            </div>
                        ))}

                    </div>

                </div>
            </article>

        </section>
    );
}
