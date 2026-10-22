import React from 'react'

function WhatsappHeader() {
    return (
        <header className="font-['Poppins'] flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
                <h1 className="text-2xl font-bold text-temp-1">
                    Whatsapp
                </h1>

                <p className="mt-1  text-sm text-bege-2 font-semibold">
                    Conecte-se com seu whatsapp.
                </p>
            </div>

        </header>
    )
}

export default WhatsappHeader
