import React from 'react'
import {
    ChartNoAxesColumnDecreasing
} from "lucide-react"
function ReportsHeader() {
    return (
        <header className="font-['Poppins'] flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
                <h1 className="font-['Poppins'] text-2xl font-bold text-temp-1">
                    Relatórios
                </h1>

                <p className="mt-1 font-semibold text-sm text-bege-2">
                    Gerencie as operações da sua empresa.
                </p>
            </div>
            <button
                type="button"

                className="flex gap-2 justify-center align-center cursor-pointer font-['Poppins'] rounded-lg bg-bege px-5 py-3 text-sm font-semibold text-temp-1 transition hover:bg-temp-1 hover:text-white"
            >
                < ChartNoAxesColumnDecreasing />
                Novo relatório
            </button>


        </header>
    )
}

export default ReportsHeader
