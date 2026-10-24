

import { useEffect, useState } from "react";

import Sidebar from "../../components/sidebar/Sidebar";
import CatalogHeader from "../../components/catalog/CatalogHeader";
import CatalogStats from "../../components/catalog/CatalogStats";
import ProductForm from "../../components/catalog/ProductForm";
import ProductList from "../../components/catalog/ProductList";

import {
  cadastrarProduto,
  listarProdutos,
} from "../../services/productService";

function Catalog() {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [produtos, setProdutos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

 



async function carregarProdutos() {
  setCarregando(true);
  setErro("");

  try {
    const resultado = await listarProdutos();

    console.log("Resultado completo:", resultado);
    console.log("Tipo:", typeof resultado);
    console.log("É array?", Array.isArray(resultado));

    const lista = Array.isArray(resultado)
      ? resultado
      : Array.isArray(resultado?.content)
        ? resultado.content
        : null;

    if (lista === null) {
      console.error("Formato inesperado recebido:", resultado);
      throw new Error(
        "A API não retornou uma lista de produtos válida."
      );
    }

    console.log("Quantidade:", lista.length);
    console.table(lista);

    setProdutos(lista);
  } catch (error) {
    console.error("Erro ao carregar produtos:", error);
    setErro(error.message || "Não foi possível carregar os produtos.");
    setProdutos([]);
  } finally {
    setCarregando(false);
  }
}


  useEffect(() => {
    carregarProdutos();
  }, []);

  async function handleSalvarProduto(dadosProduto) {
    setSalvando(true);
    setErro("");
    setSucesso("");

    try {
      await cadastrarProduto(dadosProduto);

      setSucesso("Produto cadastrado com sucesso!");
      setMostrarFormulario(false);

      await carregarProdutos();
    } catch (error) {
      setErro(error.message || "Não foi possível cadastrar o produto.");
    } finally {
      setSalvando(false);
    }
  }

  return (
    <div className="flex h-screen ">
      <Sidebar />

      <main className="min-w-0 flex-1 overflow-y-auto p-6 md:p-8">
        <div className="mx-auto max-w-7xl space-y-8">
          <CatalogHeader
            onNovoProduto={() => {
              setErro("");
              setSucesso("");
              setMostrarFormulario(true);
            }}
          />

          <CatalogStats />

          {erro && (
            <div
              role="alert"
              className="rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-400"
            >
              {erro}
            </div>
          )}

          {sucesso && (
            <div
              role="status"
              className="rounded-lg border border-green-500/30 bg-green-500/10 p-4 text-sm text-green-400"
            >
              {sucesso}
            </div>
          )}


          {mostrarFormulario && (
            <ProductForm
              onSalvar={handleSalvarProduto}
              onCancelar={() => setMostrarFormulario(false)}
              salvando={salvando}
            />
          )}

          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold font-['Poppins'] text-white">
                Produtos cadastrados
              </h2>

              <button
                type="button"
                onClick={carregarProdutos}
                className="text-sm text-blue-400 hover:text-blue-300"
              >
                Atualizar lista
              </button>
            </div>

            {carregando ? (
              <p className="text-sm text-slate-400">
                Carregando produtos...
              </p>
            ) : (
              <ProductList
                products={produtos}
                onEditar={(produto) =>
                  console.log("Editar produto:", produto)
                }
                onExcluir={(produto) =>
                  console.log("Excluir produto:", produto)
                }
              />
            )}
          </section>
        </div>
      </main>
    </div>
  );
}

export default Catalog;
