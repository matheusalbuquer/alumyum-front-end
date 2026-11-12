
import { CalendarDays, ChevronDown } from "lucide-react";

export default function Header({ periodo, setPeriodo }) {
    return (
        <header className="mb-7 flex flex-wrap items-center justify-between gap-4">

            <div>
                <h1 className="text-2xl font-extrabold tracking-tight text-temp-1">
                    Super Admin
                </h1>

                <p className="mt-1  text-sm text-bege-2 font-semibold">
                    Visão geral da plataforma Cabide e gestão de todos os tenants.
                </p>
            </div>

            <div className="relative flex items-center">

                <CalendarDays
                    size={21}
                    className="pointer-events-none absolute left-4 text-[#B90019]"
                />

                <select
                    value={periodo}
                    onChange={(e) => setPeriodo(e.target.value)}
                    className="cursor-pointer appearance-none rounded-xl border border-[#E9D8D8] bg-white py-3 pl-11 pr-11 text-sm font-semibold text-[#211B1B] outline-none transition hover:border-[#B90019] focus:ring-2 focus:ring-[#B90019]/20"
                >
                    <option value="7">Últimos 7 dias</option>
                    <option value="30">Últimos 30 dias</option>
                    <option value="90">Últimos 90 dias</option>
                </select>

                <ChevronDown
                    size={19}
                    className="pointer-events-none absolute right-4 text-[#B90019]"
                />

            </div>

        </header>
    );
}
