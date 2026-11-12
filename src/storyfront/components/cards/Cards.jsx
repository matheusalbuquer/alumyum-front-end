
import {
    Truck,
    ShieldCheck,
    CreditCard,
    BadgeCheck,
    Heart,
    ShoppingCart,
} from "lucide-react";

import { useState } from "react";
import { useCarrinho } from "../../context/CardContext";


const API_BASE_URL = "http://localhost:8080";

const obterUrlImagem = (imagemUrl) => {
    if (!imagemUrl) {
        return "/images/sem-imagem.png";
    }

    if (imagemUrl.startsWith("http")) {
        return imagemUrl;
    }

    return `${API_BASE_URL}${imagemUrl}`;
};
function Cards({ produtos = [], carregando = false, slug }) {
    const [favoritos, setFavoritos] = useState([]);
    const { adicionarAoCarrinho } = useCarrinho();

    const beneficios = [
        {
            icon: Truck,
            titulo: "Entrega rápida",
            descricao: "Para todo o Brasil",
        },
        {
            icon: ShieldCheck,
            titulo: "Compra segura",
            descricao: "Seus dados protegidos",
        },
        {
            icon: CreditCard,
            titulo: "Pagamento facilitado",
            descricao: "Pix, cartão e boleto",
        },
        {
            icon: BadgeCheck,
            titulo: "Qualidade garantida",
            descricao: "Produtos oficiais e de alta qualidade",
        },
    ];

    const alternarFavorito = (id) => {
        setFavoritos((atuais) =>
            atuais.includes(id)
                ? atuais.filter((item) => item !== id)
                : [...atuais, id]
        );
    };

    const formatarPreco = (valor) => {
        return Number(valor || 0).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
        });
    };

    return (
        <section className="mt-7 font-['Poppins']">

            {/* Benefícios */}
            <div className="grid grid-cols-2 gap-4 rounded-2xl bg-[#FAF5F2] px-5 py-4 lg:grid-cols-4">
                {beneficios.map((item) => {
                    const Icon = item.icon;

                    return (
                        <div
                            key={item.titulo}
                            className="flex items-center justify-center gap-3"
                        >
                            <Icon
                                size={37}
                                strokeWidth={1.8}
                                className="shrink-0 text-temp-1"
                            />

                            <div>
                                <h3 className="text-sm font-bold text-gray-900">
                                    {item.titulo}
                                </h3>

                                <p className="text-xs text-gray-600">
                                    {item.descricao}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Cabeçalho dos produtos */}
            <div className="mb-5 mt-6 flex items-center justify-between">
                <div className="border-l-4 border-temp-1 pl-3">
                    <h2 className="text-2xl font-bold text-gray-900">
                        Destaques
                    </h2>

                    <p className="text-sm text-gray-600">
                        Confira os produtos mais procurados da loja.
                    </p>
                </div>

                <a
                    href="/products"
                    className="flex cursor-pointer items-center gap-2 text-sm font-semibold text-temp-1 transition hover:text-[#D96B30]"
                >
                    Ver todos
                    <span className="text-xl">→</span>
                </a>
            </div>

            {/* Lista de produtos */}
            {carregando ? (
                <p className="py-8 text-center text-gray-500">
                    Carregando produtos...
                </p>
            ) : produtos.length === 0 ? (
                <p className="py-8 text-center text-gray-500">
                    Nenhum produto encontrado.
                </p>
            ) : (
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5">
                    {produtos.map((produto) => {
                        const preco = Number(produto.preco || 0);
                        const parcela = preco / 3;
                        const temEstoque = Number(produto.estoque) > 0;

                        return (
                            <article
                                key={produto.id}
                                className="group relative flex min-w-0 flex-col overflow-hidden rounded-xl border border-gray-200 bg-white p-3 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                            >
                                {/* Favorito */}
                                <button
                                    type="button"
                                    onClick={() => alternarFavorito(produto.id)}
                                    aria-label={
                                        favoritos.includes(produto.id)
                                            ? "Remover dos favoritos"
                                            : "Adicionar aos favoritos"
                                    }
                                    className="absolute right-3 top-3 z-10 cursor-pointer text-gray-500 transition hover:scale-110 hover:text-red-500"
                                >
                                    <Heart
                                        size={21}
                                        fill={
                                            favoritos.includes(produto.id)
                                                ? "#DC2626"
                                                : "none"
                                        }
                                        className={
                                            favoritos.includes(produto.id)
                                                ? "text-red-600"
                                                : ""
                                        }
                                    />
                                </button>

                                {/* Imagem */}
                                <div className="flex h-[165px] items-center justify-center overflow-hidden">
                                    <img
                                        src={obterUrlImagem(produto.imagemUrl)}
                                        alt={produto.nome}
                                        onError={(e) => {
                                            e.currentTarget.onerror = null;
                                            e.currentTarget.src = "/images/sem-imagem.png";
                                        }}
                                        className="h-full w-full object-contain transition duration-300 group-hover:scale-105"
                                    />
                                </div>

                                {/* Estoque */}
                                <span
                                    className={`mt-2 w-fit rounded-md px-2 py-1 text-[10px] font-semibold ${
                                        temEstoque
                                            ? "bg-[#DCFCE7] text-green-700"
                                            : "bg-red-100 text-red-700"
                                    }`}
                                >
                                    {temEstoque
                                        ? "Em estoque"
                                        : "Indisponível"}
                                </span>

                                {/* Informações */}
                                <div className="mt-2 flex-1">
                                    <h3 className="line-clamp-2 min-h-[38px] text-sm font-medium leading-tight text-gray-900">
                                        {produto.nome}
                                    </h3>

                                    <p className="mt-2 text-xl font-bold text-temp-1">
                                        {formatarPreco(preco)}
                                    </p>

                                    <p className="mt-1 text-[11px] text-gray-600">
                                        ou 3x de {formatarPreco(parcela)} sem juros
                                    </p>
                                </div>

                                {/* Botão */}
                               <button
                                type="button"
                                disabled={!temEstoque}
                                onClick={() => adicionarAoCarrinho(produto, slug)}
                                className="mt-3 flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-temp-1 px-2 py-2.5 text-xs font-semibold text-white transition hover:bg-temp disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <ShoppingCart size={18} />
                                Adicionar ao carrinho
                            </button>
                            </article>
                        );
                    })}
                </div>
            )}
        </section>
    );
}

export default Cards;
