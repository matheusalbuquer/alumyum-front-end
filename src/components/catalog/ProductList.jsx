
import ProductItem from "./ProductItem";

function ProductList({ products = [], onEditar, onExcluir }) {
  if (!Array.isArray(products) || products.length === 0) {
    return (
      <div className="rounded-xl border border-temp-1 bg-bege px-6 py-12 text-center">
        <div className="mb-3 text-4xl">📦</div>

        <h3 className="font-semibold text-temp-1">
          Nenhum produto encontrado
        </h3>

        <p className="mt-2 text-sm text-marrom-1">
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
