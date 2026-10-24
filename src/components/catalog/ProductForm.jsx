import { useState, useEffect } from "react";

function ProductForm({
  onSalvar,
  onCancelar,
  salvando = false,
}) {
  const [formulario, setFormulario] = useState({
    nome: "",
    descricao: "",
    preco: "",
  });

  const [variacoes, setVariacoes] = useState([
    { sku: "", cor: "", tamanho: "", estoque: "0", preco: "" },
  ]);

  const [erro, setErro] = useState("");
  const [imagem, setImagem] = useState(null);
  const [previewImagem, setPreviewImagem] = useState("");

  useEffect(() => {
    return () => {
      if (previewImagem) {
        URL.revokeObjectURL(previewImagem);
      }
    };
  }, [previewImagem]);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormulario((anterior) => ({
      ...anterior,
      [name]: value,
    }));
  }

  function handleVariacaoChange(index, event) {
    const { name, value } = event.target;

    setVariacoes((anterior) =>
      anterior.map((variacao, i) =>
        i === index ? { ...variacao, [name]: value } : variacao
      )
    );
  }

  function adicionarVariacao() {
    setVariacoes((anterior) => [
      ...anterior,
      { sku: "", cor: "", tamanho: "", estoque: "0", preco: "" },
    ]);
  }

  function removerVariacao(index) {
    setVariacoes((anterior) =>
      anterior.filter((_, i) => i !== index)
    );
  }

  function handleImagemChange(event) {
    const arquivo = event.target.files?.[0];

    if (!arquivo) return;

    if (!["image/jpeg", "image/png", "image/webp"].includes(arquivo.type)) {
      setErro("Selecione uma imagem PNG, JPG ou WEBP.");
      event.target.value = "";
      return;
    }

    if (arquivo.size > 5 * 1024 * 1024) {
      setErro("A imagem deve ter no máximo 5 MB.");
      event.target.value = "";
      return;
    }

    setErro("");
    setImagem(arquivo);
    setPreviewImagem(URL.createObjectURL(arquivo));
  }

  function handleSubmit(event) {
    event.preventDefault();
    setErro("");

    if (!formulario.nome.trim()) {
      setErro("Informe o nome do produto.");
      return;
    }

    if (
      formulario.preco === "" ||
      !Number.isFinite(Number(formulario.preco)) ||
      Number(formulario.preco) < 0
    ) {
      setErro("Informe um preço válido.");
      return;
    }

    if (variacoes.length === 0) {
      setErro("Adicione pelo menos uma variação.");
      return;
    }

    const skus = variacoes.map((variacao) => variacao.sku.trim());

    if (skus.some((sku) => !sku)) {
      setErro("Informe o SKU de todas as variações.");
      return;
    }

    if (new Set(skus).size !== skus.length) {
      setErro("Cada variação deve ter um SKU diferente.");
      return;
    }

    for (let i = 0; i < variacoes.length; i++) {
      const variacao = variacoes[i];

      if (
        variacao.estoque.trim() === "" ||
        !/^\d+$/.test(variacao.estoque)
      ) {
        setErro(`Informe um estoque válido para a variação ${i + 1}.`);
        return;
      }

      if (
        variacao.preco !== "" &&
        (!Number.isFinite(Number(variacao.preco)) ||
          Number(variacao.preco) < 0)
      ) {
        setErro(`Informe um preço válido para a variação ${i + 1}.`);
        return;
      }
    }

    onSalvar({
      nome: formulario.nome.trim(),
      descricao: formulario.descricao.trim(),
      preco: Number(formulario.preco),
      variacoes: variacoes.map((variacao) => ({
        sku: variacao.sku.trim(),
        cor: variacao.cor.trim(),
        tamanho: variacao.tamanho.trim(),
        estoque: Number(variacao.estoque),
        preco:
          variacao.preco === "" ? null : Number(variacao.preco),
      })),
      imagem,
    });
  }

  const campoClass =
    "w-full rounded-lg border border-temp-1 bg-bege px-4 py-3 text-sm text-marrom-1 placeholder-marrom-1 outline-none transition focus:ring-2 focus:ring-temp-1/20";

  const labelClass =
    "mb-2 block text-sm font-semibold text-temp-1";

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 rounded-xl border border-temp-1 bg-white p-6 font-['Poppins']"
    >
      <div>
        <h2 className="text-xl font-semibold text-temp-1">
          Cadastrar produto
        </h2>
        <p className="mt-1 text-sm font-semibold text-marrom-1">
          Preencha os dados do produto e suas variações.
        </p>
      </div>

      {erro && (
        <p
          role="alert"
          className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-500"
        >
          {erro}
        </p>
      )}

      <div>
        <label htmlFor="nome" className={labelClass}>
          Nome do produto *
        </label>
        <input
          id="nome"
          name="nome"
          value={formulario.nome}
          onChange={handleChange}
          placeholder="Ex.: Camiseta básica"
          className={campoClass}
          required
        />
      </div>

      <div>
        <label htmlFor="descricao" className={labelClass}>
          Descrição
        </label>
        <textarea
          id="descricao"
          name="descricao"
          value={formulario.descricao}
          onChange={handleChange}
          placeholder="Descreva as características do produto..."
          rows={4}
          className={campoClass}
        />
      </div>

      <div>
        <label htmlFor="imagem" className={labelClass}>
          Imagem do produto
        </label>

        <div className="rounded-xl border border-dashed border-temp-1 bg-bege p-5">
          <label
            htmlFor="imagem"
            className="flex cursor-pointer flex-col items-center justify-center gap-3 rounded-lg p-4 transition hover:bg-temp-1/5"
          >
            {previewImagem ? (
              <img
                src={previewImagem}
                alt="Prévia do produto"
                className="h-40 w-40 rounded-xl border border-temp-1 object-cover"
              />
            ) : (
              <>
                <span className="text-4xl">📷</span>
                <span className="text-sm font-medium text-temp-1">
                  Clique para selecionar uma imagem
                </span>
                <span className="text-xs text-marrom-1">
                  PNG, JPG ou WEBP — máximo de 5 MB
                </span>
              </>
            )}
          </label>

          <input
            id="imagem"
            type="file"
            accept="image/png,image/jpeg,image/webp"
            onChange={handleImagemChange}
            className="hidden"
          />

          {previewImagem && (
            <div className="mt-3 flex flex-wrap items-center justify-center gap-4">
              <span className="max-w-xs truncate text-sm text-marrom-1">
                {imagem?.name}
              </span>

              <button
                type="button"
                onClick={() => {
                  setImagem(null);
                  setPreviewImagem("");
                  const input = document.getElementById("imagem");
                  if (input) input.value = "";
                }}
                className="cursor-pointer text-sm text-red-500 hover:text-red-700"
              >
                Remover imagem
              </button>
            </div>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="preco" className={labelClass}>
          Preço padrão (R$) *
        </label>
        <input
          id="preco"
          name="preco"
          type="number"
          min="0"
          step="0.01"
          value={formulario.preco}
          onChange={handleChange}
          placeholder="0,00"
          className={campoClass}
          required
        />
        <p className="mt-1 text-xs text-marrom-1">
          Será utilizado nas variações sem preço próprio.
        </p>
      </div>

      <div className="space-y-4 border-t border-temp-1/20 pt-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold text-temp-1">
              Variações do produto
            </h3>
            <p className="mt-1 text-sm text-marrom-1">
              Cada variação possui seu próprio SKU e estoque.
            </p>
          </div>

          <button
            type="button"
            onClick={adicionarVariacao}
            className="cursor-pointer rounded-lg border border-temp-1 px-4 py-2 text-sm font-semibold text-temp-1 transition hover:bg-bege"
          >
            + Adicionar variação
          </button>
        </div>

        {variacoes.map((variacao, index) => (
          <div
            key={index}
            className="space-y-4 rounded-xl border border-temp-1/30 bg-bege/50 p-4"
          >
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-temp-1">
                Variação {index + 1}
              </h4>

              {variacoes.length > 1 && (
                <button
                  type="button"
                  onClick={() => removerVariacao(index)}
                  className="cursor-pointer text-sm font-medium text-red-500 hover:text-red-700"
                >
                  Remover
                </button>
              )}
            </div>

            <div>
              <label htmlFor={`sku-${index}`} className={labelClass}>
                SKU *
              </label>
              <input
                id={`sku-${index}`}
                name="sku"
                value={variacao.sku}
                onChange={(event) => handleVariacaoChange(index, event)}
                placeholder="Ex.: CAM-PRE-P"
                className={campoClass}
                required
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor={`cor-${index}`} className={labelClass}>
                  Cor
                </label>
                <input
                  id={`cor-${index}`}
                  name="cor"
                  value={variacao.cor}
                  onChange={(event) => handleVariacaoChange(index, event)}
                  placeholder="Ex.: Preto"
                  className={campoClass}
                />
              </div>

              <div>
                <label htmlFor={`tamanho-${index}`} className={labelClass}>
                  Tamanho
                </label>
                <input
                  id={`tamanho-${index}`}
                  name="tamanho"
                  value={variacao.tamanho}
                  onChange={(event) => handleVariacaoChange(index, event)}
                  placeholder="Ex.: P, M, G ou 40"
                  className={campoClass}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor={`estoque-${index}`} className={labelClass}>
                  Quantidade em estoque *
                </label>
                <input
                  id={`estoque-${index}`}
                  name="estoque"
                  type="number"
                  min="0"
                  step="1"
                  value={variacao.estoque}
                  onChange={(event) => handleVariacaoChange(index, event)}
                  className={campoClass}
                  required
                />
              </div>

              <div>
                <label
                  htmlFor={`preco-variacao-${index}`}
                  className={labelClass}
                >
                  Preço próprio (R$)
                </label>
                <input
                  id={`preco-variacao-${index}`}
                  name="preco"
                  type="number"
                  min="0"
                  step="0.01"
                  value={variacao.preco}
                  onChange={(event) => handleVariacaoChange(index, event)}
                  placeholder="Usar preço padrão"
                  className={campoClass}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <p className="text-xs font-semibold text-marrom-1">
        * Campos obrigatórios. O estoque é controlado separadamente para cada
        variação.
      </p>

      <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={onCancelar}
          disabled={salvando}
          className="cursor-pointer rounded-lg bg-bege px-5 py-3 text-sm font-medium text-temp-1 transition hover:bg-temp-1 hover:text-white disabled:opacity-50"
        >
          Cancelar
        </button>

        <button
          type="submit"
          disabled={salvando}
          className="cursor-pointer rounded-lg bg-temp px-5 py-3 text-sm font-semibold text-white transition hover:bg-temp-1 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {salvando ? "Cadastrando..." : "Cadastrar produto"}
        </button>
      </div>
    </form>
  );
}

export default ProductForm;