import React from 'react'

import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import Banner from '../../components/banner/Banner'
import Cards from '../../components/cards/Cards'

const Home = () => {
    return (
        <div className="min-h-screen bg-white">
            {/* Navegação superior */}
            <Navbar />
            {/* Menu lateral */}
            <Sidebar />
            {/* Conteúdo principal */}
            <main className="min-h-screen px-4 pb-10 pt-[90px] lg:ml-[265px] lg:px-6">
                {/* Banner */}
                <Banner />
                {/* Benefícios e produtos */}
                <Cards />
            </main>

        </div>
    )
}

export default Home
