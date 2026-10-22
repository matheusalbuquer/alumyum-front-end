
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
    <section className="font-['Poppins'] grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {stats.map((stat) => (
        <article
          key={stat.label}
          className="cursor-pointer rounded-xl border border-bege  p-5"
        >
          <p className="text-sm text-marrom-1 font-semibold">
            {stat.label}
          </p>

          <p className="mt-3 text-3xl font-bold text-temp-1">
            {stat.value}
          </p>

          <p className="font-semibold mt-2 text-xs text-marrom-1">
            {stat.description}
          </p>
        </article>
      ))}
    </section>
  );
}

export default CatalogStats;
