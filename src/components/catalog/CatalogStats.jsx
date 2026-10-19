
const stats = [
  {
    label: "Total de produtos",
    value: "24",
    description: "Produtos cadastrados",
  },
  {
    label: "Produtos ativos",
    value: "20",
    description: "Disponíveis no catálogo",
  },
  {
    label: "Categorias",
    value: "5",
    description: "Categorias cadastradas",
  },
];

function CatalogStats() {
  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {stats.map((stat) => (
        <article
          key={stat.label}
          className="rounded-xl border border-slate-800 bg-slate-900 p-5"
        >
          <p className="text-sm text-slate-400">
            {stat.label}
          </p>

          <p className="mt-3 text-3xl font-bold text-white">
            {stat.value}
          </p>

          <p className="mt-2 text-xs text-slate-500">
            {stat.description}
          </p>
        </article>
      ))}
    </section>
  );
}

export default CatalogStats;
