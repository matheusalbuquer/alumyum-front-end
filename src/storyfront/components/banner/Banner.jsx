
import { useState } from "react";

import {
    ChevronLeft,
    ChevronRight,
    ArrowRight,
} from "lucide-react";

function Banner() {
    const banners = [
        {
            titulo: "Linha Esportiva",
            destaque: "Corinthians 2025",
            descricao: "Camisas oficiais, modelos exclusivos e a qualidade que o torcedor merece.",
            imagem: "/images/banner-corinthians.png",
            botao: "Ver coleção",
        },
        {
            titulo: "Nova coleção",
            destaque: "Estilo e conforto",
            descricao: "Encontre peças para todos os momentos do seu dia.",
            imagem: "/images/banner-corinthians.png",
            botao: "Ver produtos",
        },
        {
            titulo: "Ofertas especiais",
            destaque: "Seu estilo, sua escolha",
            descricao: "Confira nossas novidades e aproveite as ofertas da loja.",
            imagem: "/images/banner-corinthians.png",
            botao: "Conferir ofertas",
        },
    ];

    const [bannerAtual, setBannerAtual] = useState(0);

    const anterior = () => {
        setBannerAtual((atual) =>
            atual === 0 ? banners.length - 1 : atual - 1
        );
    };

    const proximo = () => {
        setBannerAtual((atual) =>
            (atual + 1) % banners.length
        );
    };

    const banner = banners[bannerAtual];

    return (
        <section className="font-['Poppins'] relative h-[250px] w-full overflow-hidden rounded-2xl bg-gray-900 sm:h-[280px]">

            {/* Imagem */}
            <img
                src={banner.imagem}
                alt="Coleção esportiva"
                className="absolute inset-0 h-full w-full object-cover"
            />

            {/* Camada escura */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />

            {/* Conteúdo */}
            <div className="relative z-10 flex h-full items-center px-8 sm:px-12 lg:px-20">
                <div className="max-w-[470px] text-white">

                    <h2 className="text-2xl font-semibold sm:text-3xl lg:text-4xl">
                        {banner.titulo}
                    </h2>

                    <h3 className="text-3xl font-bold sm:text-4xl lg:text-[42px]">
                        {banner.destaque}
                    </h3>

                    <p className="mt-2 max-w-[390px] text-sm sm:text-base">
                        {banner.descricao}
                    </p>

                    <button className="mt-4 flex cursor-pointer items-center gap-3 rounded-xl bg-temp-1 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-temp"  >
                        {banner.botao}
                        <ArrowRight size={19} />
                    </button>

                </div>
            </div>

            {/* Setas */}
            <button
                onClick={anterior}
                aria-label="Banner anterior"
                className="absolute left-4 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/80 text-gray-800 transition hover:bg-white"
            >
                <ChevronLeft size={22} />
            </button>

            <button
                onClick={proximo}
                aria-label="Próximo banner"
                className="absolute right-4 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/80 text-gray-800 transition hover:bg-white"
            >
                <ChevronRight size={22} />
            </button>

            {/* Indicadores */}
            <div className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 gap-2">
                {banners.map((item, index) => (
                    <button
                        key={index}
                        onClick={() => setBannerAtual(index)}
                        aria-label={`Ir para banner ${index + 1}`}
                        className={`h-2.5 w-2.5 cursor-pointer rounded-full transition ${bannerAtual === index
                            ? "bg-temp-1"
                            : "bg-white/60"
                            }`}
                    />
                ))}
            </div>

        </section>
    );
}

export default Banner;
