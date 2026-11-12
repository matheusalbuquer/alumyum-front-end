
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
    Layers3,
} from "lucide-react";

import {
    crescimentoEmpresas,
    planos,
} from "../data/data";

function PlanoShape(props) {
    return (
        <Sector
            {...props}
            fill={props.payload?.cor || "#B90019"}
        />
    );
}

export default function Graficos() {
    const totalAssinaturas = planos.reduce(
        (total, plano) => total + plano.quantidade,
        0
    );

    return (
        <section className="mb-5 grid grid-cols-1 gap-5 2xl:grid-cols-[1.55fr_1fr]">

            {/* Crescimento de empresas */}
            <article className="min-w-0 rounded-2xl border border-[#EEE5E5] bg-white p-5 shadow-sm">

                <h2 className="mb-5 flex items-center gap-3 text-xl font-bold text-[#171313]">
                    <ChartNoAxesColumnIncreasing
                        size={26}
                        className="text-[#B90019]"
                    />
                    Crescimento de Empresas
                </h2>

                <div className="h-[220px] w-full">

                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                            data={crescimentoEmpresas}
                            margin={{
                                top: 5,
                                right: 10,
                                left: -15,
                                bottom: 0,
                            }}
                        >

                            <defs>
                                <linearGradient
                                    id="gradienteEmpresas"
                                    x1="0"
                                    y1="0"
                                    x2="0"
                                    y2="1"
                                >
                                    <stop
                                        offset="0%"
                                        stopColor="#C60019"
                                        stopOpacity={0.3}
                                    />

                                    <stop
                                        offset="100%"
                                        stopColor="#C60019"
                                        stopOpacity={0.02}
                                    />
                                </linearGradient>
                            </defs>

                            <CartesianGrid
                                stroke="#EEE9E9"
                                vertical={false}
                            />

                            <XAxis
                                dataKey="dia"
                                tickLine={false}
                                axisLine={false}
                                tick={{
                                    fill: "#343039",
                                    fontSize: 12,
                                }}
                            />

                            <YAxis
                                domain={[80, 130]}
                                ticks={[80, 90, 100, 110, 120, 130]}
                                tickLine={false}
                                axisLine={false}
                                tick={{
                                    fill: "#343039",
                                    fontSize: 12,
                                }}
                            />

                            <Tooltip
                                formatter={(valor) => [
                                    `${valor} empresas`,
                                    "Total",
                                ]}
                                contentStyle={{
                                    borderRadius: 12,
                                    borderColor: "#EEE5E5",
                                }}
                            />

                            <Area
                                type="monotone"
                                dataKey="empresas"
                                stroke="#B90019"
                                strokeWidth={3}
                                fill="url(#gradienteEmpresas)"
                                activeDot={{
                                    r: 6,
                                    fill: "#B90019",
                                    stroke: "#fff",
                                    strokeWidth: 2,
                                }}
                                dot={false}
                            />

                        </AreaChart>
                    </ResponsiveContainer>

                </div>
            </article>

            {/* Distribuição por plano */}
            <article className="min-w-0 rounded-2xl border border-[#EEE5E5] bg-white p-5 shadow-sm">

                <h2 className="mb-4 flex items-center gap-3 text-xl font-bold text-[#171313]">
                    <Layers3
                        size={26}
                        className="text-[#B90019]"
                    />
                    Distribuição por Plano
                </h2>

                <div className="grid min-h-[220px] grid-cols-1 items-center gap-3 sm:grid-cols-[1fr_1fr]">

                    {/* Gráfico circular */}
                    <div className="relative mx-auto h-[210px] w-full max-w-[230px]">

                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>

                                <Pie
                                    data={planos}
                                    dataKey="quantidade"
                                    nameKey="nome"
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={65}
                                    outerRadius={94}
                                    paddingAngle={1}
                                    stroke="none"
                                    shape={PlanoShape}
                                />

                                <Tooltip
                                    formatter={(valor) => [
                                        `${valor} assinaturas`,
                                        "Plano",
                                    ]}
                                />

                            </PieChart>
                        </ResponsiveContainer>

                        {/* Texto central */}
                        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                            <strong className="text-2xl font-extrabold text-[#171313]">
                                {totalAssinaturas}
                            </strong>

                            <span className="text-xs text-[#51464A]">
                                assinaturas
                            </span>
                        </div>

                    </div>

                    {/* Legenda */}
                    <div className="space-y-5">

                        {planos.map((plano) => (
                            <div
                                key={plano.nome}
                                className="flex items-center justify-between gap-3"
                            >

                                <div className="flex items-center gap-3">
                                    <span
                                        className="h-4 w-4 shrink-0 rounded"
                                        style={{
                                            backgroundColor: plano.cor,
                                        }}
                                    />

                                    <span className="text-sm font-medium text-[#211B1B]">
                                        {plano.nome}
                                    </span>
                                </div>

                                <strong className="whitespace-nowrap text-sm text-[#211B1B]">
                                    {plano.quantidade} ({plano.percentual}%)
                                </strong>

                            </div>
                        ))}

                    </div>

                </div>
            </article>

        </section>
    );
}
