import { Shirt } from 'lucide-react'
function CatalogHeader({ onNovoProduto }) {
  return (
    <header className="font-['Poppins'] flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="font-['Poppins'] text-2xl font-bold text-temp-1">
          Catálogo
        </h1>

        <p className="mt-1 text-sm font-semibold text-bege-2">
          Gerencie os produtos da sua empresa.
        </p>
      </div>

      <button
        type="button"
        onClick={onNovoProduto}
        className="flex gap-2 justify-center align-center cursor-pointer font-['Poppins'] rounded-lg bg-bege px-5 py-3 text-sm font-semibold text-temp-1 transition hover:bg-temp-1 hover:text-white"
      >
        <Shirt /> Novo produto
      </button>
    </header>
  );
}

export default CatalogHeader;