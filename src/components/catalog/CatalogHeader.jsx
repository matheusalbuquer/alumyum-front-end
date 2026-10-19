
function CatalogHeader({ onNovoProduto }) {
  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold text-white">
          Catálogo
        </h1>

        <p className="mt-1 text-sm text-slate-400">
          Gerencie os produtos da sua empresa.
        </p>
      </div>

      <button
        type="button"
        onClick={onNovoProduto}
        className="rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
      >
        + Novo produto
      </button>
    </header>
  );
}

export default CatalogHeader;