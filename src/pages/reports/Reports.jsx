import Sidebar from '../../components/sidebar/Sidebar'
import ReportsHeader from '../../components/reports/ReportsHeader'
import ReportsCards from '../../components/reports/ReportsCards'
import ReportsFilters from '../../components/reports/ReportsFilters'
import ReportsCharts from '../../components/reports/ReportsCharts'
import { reports } from "../../components/reports/data/reports"

import { useState, useMemo } from 'react'

export default function Reports() {
    const [pesquisa, setPesquisa] = useState("");
    const [periodo, setPeriodo] = useState("");
    const [tipo, setTipo] = useState("");

    const relatoriosFiltrados = useMemo(() => {
        return reports.filter((relatorio) => {
            const termo = pesquisa.toLowerCase();

            const correspondePesquisa =
                relatorio.nome.toLowerCase().includes(termo) ||
                relatorio.descricao.toLowerCase().includes(termo);

            const correspondePeriodo =
                !periodo || relatorio.periodo === periodo;

            const correspondeTipo =
                !tipo || relatorio.tipo === tipo;

            return (
                correspondePesquisa &&
                correspondePeriodo &&
                correspondeTipo
            );
        });
    }, [pesquisa, periodo, tipo]);
    function novoRelatorio() {
        alert("Aqui você poderá abrir o formulário de novo relatório.");
    }
    return (
        <div className="flex min-h-screen bg-white">
            <Sidebar />
            <main className="min-w-0 flex-1 overflow-y-auto p-6 md:p-8">
                <div className=' mx-auto max-w-7xl space-y-8'>
                    <ReportsHeader onNovoRelatorio={novoRelatorio} />
                    <ReportsCards />
                    <ReportsFilters
                        pesquisa={pesquisa}
                        setPesquisa={setPesquisa}
                        periodo={periodo}
                        setPeriodo={setPeriodo}
                        tipo={tipo}
                        setTipo={setTipo} />
                    <ReportsCharts
                        relatorios={relatoriosFiltrados} />
                </div>
            </main>

        </div>
    );
}
