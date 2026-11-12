
import { useState } from "react";

import Sidebar from "../../components/sidebar/Sidebar";
import Header from "../components/SuperAdmHeader/SuperAdmHeader";
import Cards from "../components/Cards/Cards";
import Graficos from "../components/Graficos/Graficos";
import Listas from "../components/Listas/Listas";

export default function DashboardSuperAdmin() {
    const [periodo, setPeriodo] = useState("30");

    return (
        <div className="h-screen flex bg-white font-['Poppins']">

            {/* Menu lateral */}
            <Sidebar />

            {/* Conteúdo principal */}
            <main className="min-w-0 flex-1 overflow-y-auto p-6 md:p-8">

                {/* Cabeçalho */}
                <Header
                    periodo={periodo}
                    setPeriodo={setPeriodo}
                />

                {/* Indicadores */}
                <Cards />

                {/* Gráficos */}
                <Graficos />

                {/* Listas e ações */}
                <Listas />

            </main>

        </div>
    );
}
