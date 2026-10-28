
import { useState } from "react";

function ProductItem({ product, onEditar, onExcluir }) {
  const [erroImagem, setErroImagem] = useState(false);

  const variacoes = Array.isArray(product.variacoes)
    ? product.variacoes
    : [];

  
  const estoque = Array.isArray(product.variacoes)
  ? product.variacoes.reduce(
      (total, variacao) => total + (Number(variacao.estoque) || 0),
      0
    )
  : Number(product.estoque) || 0;

  const preco = Number(product.preco);
  const estoqueBaixo = estoque > 0 && estoque <= 5;
  const semEstoque = estoque === 0;

 
const imagemUrl = product.imagemUrl
  ? product.imagemUrl.startsWith("http")
    ? product.imagemUrl
    : `http://localhost:8080${
        product.imagemUrl.startsWith("/")
          ? ""
          : "/"
      }${product.imagemUrl}`
  : "";


  const statusClass = !product.ativo
    ? "bg-slate-700 text-slate-300"
    : semEstoque
      ? "bg-red-500/10 text-red-400"
      : estoqueBaixo
        ? "bg-amber-500/10 text-amber-400"
        : "bg-emerald-500/10 text-emerald-400";

  const statusTexto = !product.ativo
    ? "Inativo"
    : semEstoque
      ? "Sem estoque"
      : estoqueBaixo
        ? "Estoque baixo"
        : "Em estoque";

  return (
    
    <article className="rounded-xl border border-gray-200 bg-white transition hover:border-red-600 hover:shadow-md">

      <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center">
        <div className="flex h-24 w-full shrink-0 items-center justify-center overflow-hidden rounded-lg bg-bege sm:w-24">
          {imagemUrl && !erroImagem ? (
            <img
              src={imagemUrl}
              alt={product.nome || "Imagem do produto"}
              className="h-full w-full object-cover"
              loading="lazy"
              onError={() => setErroImagem(true)}
            />
          ) : (
            <span
              className="text-3xl"
              role="img"
              aria-label="Produto sem imagem"
            >
              📦
            </span>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="truncate font-semibold text-black">
            {product.nome || "Produto sem nome"}
          </h3>

          <p className="mt-1 line-clamp-2 text-sm text-marrom-1">
            {product.descricao?.trim() || "Sem descrição cadastrada"}
          </p>

          <span
            className={`mt-2 inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${statusClass}`}
          >
            {statusTexto}
          </span>

          <p className="mt-2 text-xs text-slate-400">
            {variacoes.length}{" "}
            {variacoes.length === 1 ? "variação" : "variações"}
            {variacoes.length > 0 &&
              ` · ${[
                ...new Set(
                  variacoes.map((v) => v.tamanho).filter(Boolean)
                ),
              ].join(", ")}`}
          </p>
        </div>

        <div className="shrink-0 sm:min-w-36">
          <p className="text-lg font-bold text-white">
            {Number.isFinite(preco)
              ? preco.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })
              : "Preço indisponível"}
          </p>

          <p className="mt-1 text-sm text-slate-400">
            Estoque total: {estoque}
          </p>
        </div>

        <div className="flex shrink-0 gap-2 sm:flex-col">
          <button
            type="button"
            onClick={() => onEditar?.(product)}
            className="rounded-lg border border-slate-700 px-3 py-2 text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white"
            aria-label={`Editar ${product.nome}`}
          >
            Editar
          </button>

          <button
            type="button"
            onClick={() => onExcluir?.(product)}
            className="rounded-lg border border-red-900/50 px-3 py-2 text-sm text-red-400 transition hover:bg-red-500/10"
            aria-label={`Excluir ${product.nome}`}
          >
            Excluir
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductItem;
