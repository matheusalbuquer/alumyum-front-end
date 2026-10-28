
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

import {
  listarCategorias,
  cadastrarCategoria,
} from "../../services/categoriaService";

function Catalog() {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [produtos, setProdutos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  async function carregarProdutos() {
    setCarregando(true);
    setErro("");

    try {
      const resultado = await listarProdutos();

      const lista = Array.isArray(resultado)
        ? resultado
        : Array.isArray(resultado?.content)
          ? resultado.content
          : null;

      if (lista === null) {
        throw new Error(
          "A API não retornou uma lista de produtos válida."
        );
      }

      setProdutos(lista);
    } catch (error) {
      console.error("Erro ao carregar produtos:", error);
      setErro(error.message || "Não foi possível carregar os produtos.");
      setProdutos([]);
    } finally {
      setCarregando(false);
    }
  }

  async function carregarCategorias() {
    try {
      const resultado = await listarCategorias();

      if (!Array.isArray(resultado)) {
        throw new Error(
          "A API não retornou uma lista de categorias válida."
        );
      }

      setCategorias(resultado);
    } catch (error) {
      console.error("Erro ao carregar categorias:", error);
      setErro(error.message || "Não foi possível carregar as categorias.");
    }
  }

  useEffect(() => {
    carregarProdutos();
    carregarCategorias();
  }, []);

  function handleCancelar() {
    setMostrarFormulario(false);
    setErro("");
  }

  async function handleSalvarProduto(dadosProduto) {
    setSalvando(true);
    setErro("");
    setSucesso("");

    try {
      const nomeCategoria = dadosProduto.nomeCategoria?.trim();

      if (!nomeCategoria) {
        throw new Error("Selecione ou informe uma categoria.");
      }

      // Procura uma categoria com o mesmo nome, ignorando maiúsculas
      // e espaços extras.
      let categoria = categorias.find(
        (item) =>
          item.nome?.trim().toLocaleLowerCase("pt-BR") ===
          nomeCategoria.toLocaleLowerCase("pt-BR")
      );

      // Se não existir, cadastra a categoria primeiro.
      if (!categoria) {
        categoria = await cadastrarCategoria(nomeCategoria);

        if (!categoria?.id) {
          throw new Error(
            "A categoria foi enviada, mas a resposta não contém seu ID. Confira o formato de CategoriaResponse."
          );
        }

        setCategorias((anteriores) => [...anteriores, categoria]);
      }

      // O backend atual recebe o nome da categoria no produto.
      await cadastrarProduto({
        ...dadosProduto,
        nomeCategoria: categoria.nome,
      });

      setSucesso("Produto cadastrado com sucesso!");
      setMostrarFormulario(false);

      await Promise.all([
        carregarProdutos(),
        carregarCategorias(),
      ]);
    } catch (error) {
      console.error("Erro ao cadastrar produto:", error);
      setErro(error.message || "Não foi possível cadastrar o produto.");
    } finally {
      setSalvando(false);
    }
  }

  return (
    <div className="flex h-screen">
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
              categorias={categorias}
              onSalvar={handleSalvarProduto}
              onCancelar={handleCancelar}
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
