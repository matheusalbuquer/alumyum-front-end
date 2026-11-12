
import { Link, useParams } from "react-router-dom";

import {
    ShoppingBag,
    Trash2,
    Plus,
    Minus,
    ArrowLeft,
} from "lucide-react";

import { useCarrinho } from "../../context/CardContext";


const API_BASE_URL = "http://localhost:8080";

const obterUrlImagem = (imagemUrl) => {
    if (!imagemUrl) return "/images/sem-imagem.png";

    if (imagemUrl.startsWith("http")) return imagemUrl;

    return `${API_BASE_URL}${imagemUrl}`;
};

function Cart() {
    
    const {
        itens,
        alterarQuantidade,
        removerDoCarrinho,
        limparCarrinho,
        total,
    } = useCarrinho();

    const { slug } = useParams();

    const quantidadeTotal = itens.reduce(
        (soma, item) => soma + item.quantidade,
        0
    );

    const formatarPreco = (valor) =>
        Number(valor || 0).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
        });

    return (
        <main className="min-h-screen bg-gray-50 px-4 pb-12 pt-28 font-['Poppins'] lg:px-8">
            <div className="mx-auto max-w-6xl">

                <Link
                    to={`/${slug}`}
                    className="mb-6 inline-flex items-center gap-2 text-sm text-gray-600 hover:text-temp-1"
                >
                    <ArrowLeft size={18} />
                    Continuar comprando
                </Link>

                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Meu carrinho
                    </h1>

                    <p className="mt-1 text-sm text-gray-500">
                        {quantidadeTotal} {quantidadeTotal === 1 ? "produto" : "produtos"} adicionados
                    </p>
                </div>

                {itens.length === 0 ? (
                    <div className="rounded-2xl border border-gray-200 bg-white px-6 py-16 text-center">

                        <ShoppingBag
                            size={55}
                            className="mx-auto mb-4 text-gray-300"
                        />

                        <h2 className="text-xl font-semibold text-gray-800">
                            Seu carrinho está vazio
                        </h2>

                        <p className="mt-2 text-sm text-gray-500">
                            Explore os produtos da loja e adicione seus favoritos.
                        </p>

                        <Link
                            to={`/${slug}`}
                            className="mt-6 inline-flex rounded-lg bg-temp-1 px-6 py-3 text-sm font-semibold text-white hover:opacity-90"
                        >
                            Ver produtos
                        </Link>

                    </div>
                ) : (

                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">

                        {/* Produtos */}
                        <section className="space-y-4 lg:col-span-2">

                            {itens.map((produto) => (

                                <article
                                    key={produto.id}
                                    className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-4 sm:flex-row"
                                >

                                    <img
                                        src={obterUrlImagem(produto.imagemUrl)}
                                        alt={produto.nome}
                                        onError={(e) => {
                                            e.currentTarget.onerror = null;
                                            e.currentTarget.src = "/images/sem-imagem.png";
                                        }}
                                        className="h-28 w-full rounded-lg object-contain sm:w-28"
                                    />

                                    <div className="flex flex-1 flex-col justify-between">

                                        <div>
                                            <h3 className="font-semibold text-gray-900">
                                                {produto.nome}
                                            </h3>

                                            <p className="mt-1 text-sm text-gray-500">
                                                {formatarPreco(produto.preco)}
                                            </p>
                                        </div>

                                        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">

                                            {/* Quantidade */}
                                            <div className="flex items-center gap-3 rounded-lg border border-gray-200 px-2 py-1">

                                                <button
                                                    type="button"
                                                    disabled={produto.quantidade <= 1}
                                                    onClick={() =>
                                                        alterarQuantidade(
                                                            produto.id,
                                                            produto.quantidade - 1
                                                        )
                                                    }
                                                    className="p-1 text-gray-600 disabled:opacity-30"
                                                >
                                                    <Minus size={16} />
                                                </button>

                                                <span className="min-w-5 text-center text-sm font-semibold">
                                                    {produto.quantidade}
                                                </span>

                                                <button
                                                    type="button"
                                                    disabled={produto.quantidade >= produto.estoque}
                                                    onClick={() =>
                                                        alterarQuantidade(
                                                            produto.id,
                                                            produto.quantidade + 1
                                                        )
                                                    }
                                                    className="p-1 text-gray-600 disabled:opacity-30"
                                                >
                                                    <Plus size={16} />
                                                </button>

                                            </div>

                                            {/* Remover */}
                                            <button
                                                type="button"
                                                onClick={() => removerDoCarrinho(produto.id)}
                                                className="flex items-center gap-1 text-sm text-red-600 hover:text-red-800"
                                            >
                                                <Trash2 size={16} />
                                                Remover
                                            </button>

                                        </div>

                                    </div>

                                    <div className="font-bold text-gray-900 sm:text-right">
                                        {formatarPreco(
                                            Number(produto.preco) * produto.quantidade
                                        )}
                                    </div>

                                </article>

                            ))}

                            <button
                                type="button"
                                onClick={limparCarrinho}
                                className="text-sm text-red-600 hover:underline"
                            >
                                Limpar carrinho
                            </button>

                        </section>

                        {/* Resumo */}
                        <aside className="h-fit rounded-xl border border-gray-200 bg-white p-6">

                            <h2 className="text-lg font-bold text-gray-900">
                                Resumo do pedido
                            </h2>

                            <div className="mt-6 flex justify-between text-sm text-gray-600">
                                <span>Produtos ({quantidadeTotal})</span>
                                <span>{formatarPreco(total)}</span>
                            </div>

                            <div className="mt-4 flex justify-between border-t border-gray-200 pt-4">

                                <span className="font-semibold text-gray-900">
                                    Total
                                </span>

                                <span className="text-xl font-bold text-temp-1">
                                    {formatarPreco(total)}
                                </span>

                            </div>

                            <button
                                type="button"
                                onClick={() => alert("Finalização do pedido será implementada na próxima etapa.")}
                                className="mt-6 w-full rounded-lg bg-temp-1 px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90"
                            >
                                Finalizar pedido
                            </button>

                            <p className="mt-3 text-center text-xs text-gray-500">
                                Frete e pagamento serão definidos na próxima etapa.
                            </p>

                        </aside>

                    </div>
                )}

            </div>
        </main>
    );
}

export default Cart;
