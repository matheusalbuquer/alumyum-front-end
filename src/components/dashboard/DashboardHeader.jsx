import React from 'react'

function DashboardHeader() {
    return (
        <header className="flex font-['Poppins'] flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
                <h1 className="font-['Poppins'] text-2xl font-bold text-temp-1">
                    Dashboard
                </h1>

                <p className="mt-1  text-sm text-bege-2 font-semibold">
                    Gerencie as informações da sua empresa.
                </p>
            </div>

        </header>
    )
}

export default DashboardHeader
