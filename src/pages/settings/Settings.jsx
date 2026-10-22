import React from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import SettingsHeader from '../../components/settings/SettingsHeader'
function Settings() {
    return (
        <div className="flex min-h-screen bg-slate-white">
            <Sidebar />
            <main className="min-w-0 flex-1 overflow-y-auto p-6 md:p-8">
                <div>
                    <  SettingsHeader />
                </div>
            </main>
        </div>
    )
}

export default Settings
