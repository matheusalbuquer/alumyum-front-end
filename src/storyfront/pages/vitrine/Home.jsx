import React, { useEffect, useState } from 'react';

import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import Banner from '../../components/banner/Banner';
import Cards from '../../components/cards/Cards';

import { useParams } from "react-router-dom";


import { listarProdutosVitrine } from "../../services/productVitrineService";

const Home = () => {
    const [produtos, setProdutos] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState(null);

   
    const { slug } = useParams();

    useEffect(() => {
        async function carregarProdutos() {
            try {
                setCarregando(true);
                setErro(null);

                const dados = await listarProdutosVitrine(slug);

                    setProdutos(
                        Array.isArray(dados)
                            ? dados
                            : Array.isArray(dados.content)
                                ? dados.content
                                : []
                    );
            } catch (error) {
                console.error(error);
                setErro('Não foi possível carregar os produtos.');
            } finally {
                setCarregando(false);
            }
        }

        carregarProdutos();
    }, [slug]);

    return (
        <div className="min-h-screen bg-white">

            <Navbar />

            <Sidebar />

            <main className="min-h-screen px-4 pb-10 pt-[90px] lg:ml-[265px] lg:px-6">

                <Banner />

                {erro && (
                    <p className="py-6 text-center text-red-600">
                        {erro}
                    </p>
                )}

                <Cards
                produtos={produtos}
                carregando={carregando}
                slug={slug}
            />

            </main>
        </div>
    );
};

export default Home;
