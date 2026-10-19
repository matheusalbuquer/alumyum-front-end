
import ProductItem from "./ProductItem";

function ProductList({ products, onEditar, onExcluir }) {
  if (products.length === 0) {
    return (
      <div className="rounded-xl border border-slate-800 bg-slate-900 px-6 py-12 text-center">
        <div className="mb-3 text-4xl">📦</div>

        <h3 className="font-semibold text-white">
          Nenhum produto encontrado
        </h3>

        <p className="mt-2 text-sm text-slate-400">
          Cadastre um produto para começar seu catálogo.
        </p>
      </div>
    );
  }

  return (
    <section className="space-y-3">
      {products.map((product) => (
        <ProductItem
          key={product.id}
          product={product}
          onEditar={onEditar}
          onExcluir={onExcluir}
        />
      ))}
    </section>
  );
}

export default ProductList;