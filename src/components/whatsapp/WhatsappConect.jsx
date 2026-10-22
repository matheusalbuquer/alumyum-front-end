import React from 'react'
import {

    QrCode


} from "lucide-react";

function WhatsappConect() {
    const pageItems = [
        {
            icon: QrCode,
        }]
    return (
        <div className="flex mt-8 flex-col gap-4 items-start justify-center">
            <div className="bg-bege items-center justify-center gap-4 flex flex-col rounded-lg p-4 w-md h-sm">
                {pageItems.map((item) => {
                    const Icon = item.icon;
                    return (
                        <Icon className="p-4 w-15 h-15 items-center cursor-pointer relative flex  justify-center  text-temp-1 rounded-full border border-temp-1" />


                    );
                })}

                <p className="mt-1 text-sm font-semibold font-['Poppins'] text-marrom-2 capitalize">
                    whatsapp desconectado
                </p>
                <button className="font-medium font-['Poppins'] bg-temp text-white   hover:bg-temp-1  py-2 px-5  cursor-pointer m-1 rounded-lg" >Conectar Whatsapp</button>
            </div>
        </div >
    )
}

export default WhatsappConect
