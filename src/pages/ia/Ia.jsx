import React from 'react'
import Sidebar from "../../components/sidebar/Sidebar";
import IaHeader from '../../components/ia/IaHeader';
function Ia() {
    return (
        <div className="flex min-h-screen bg-white">
            <Sidebar />
            <main className="min-w-0 flex-1 overflow-y-auto p-6 md:p-8">
                <div>
                    <IaHeader />
                </div>
            </main>

        </div>
    )
}

export default Ia
