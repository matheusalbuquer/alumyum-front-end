
import { useState, useEffect } from "react";

function ProductForm({
  onSalvar,
  onCancelar,
  salvando = false,
}) {
  const [formulario, setFormulario] = useState({
    nome: "",
    descricao: "",
    estoque: "",
    preco: "",
  });

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

    if (
      formulario.estoque.trim() === "" ||
      !/^\d+$/.test(formulario.estoque)
    ) {
      setErro("Informe uma quantidade de estoque válida.");
      return;
    }

    onSalvar({
      nome: formulario.nome.trim(),
      descricao: formulario.descricao.trim(),
      estoque: formulario.estoque,
      preco: Number(formulario.preco),
      imagem,
    });
  }

  const campoClass =
    "w-full rounded-lg border border-temp-1 bg-bege px-4 py-3 text-sm text-marrom-1 placeholder-marrom-1 outline-none transition  ";

  const labelClass =
    "mb-2 block text-sm font-semibold text-temp-1";

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 rounded-xl border border-temp-1 bg-white p-6"
    >
      <div className="font-['Poppins']">
        <h2 className="text-xl font-semibold text-temp-1">
          Cadastrar produto
        </h2>
        <p className="mt-1 text-sm text-marrom-1 font-semibold">
          Preencha os dados do produto para adicioná-lo ao catálogo.
        </p>
      </div>

      {erro && (
        <p
          role="alert"
          className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400"
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
          placeholder="Ex.: Fone Bluetooth"
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
            className="flex cursor-pointer flex-col items-center justify-center gap-3 rounded-lg p-4 transition hover:bg-temp-1-5"
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
              <span className="max-w-xs truncate text-sm text-marrom-2">
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
                className="cursor-pointer text-sm text-red-400 hover:text-red-300"
              >
                Remover imagem
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="preco" className={labelClass}>
            Preço (R$) *
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
        </div>

        <div>
          <label htmlFor="estoque" className={labelClass}>
            Quantidade em estoque *
          </label>
          <input
            id="estoque"
            name="estoque"
            type="number"
            min="0"
            step="1"
            value={formulario.estoque}
            onChange={handleChange}
            placeholder="Ex.: 25"
            className={campoClass}
            required
          />
        </div>
      </div>

      <p className="text-xs text-marrom-1 font-semibold font-['Poppins']">
        * Campos obrigatórios. A imagem será selecionada e enviada junto aos
        dados, mas o backend ainda precisa oferecer suporte ao upload.
      </p>

      <div className="font-['Poppins'] flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={onCancelar}
          disabled={salvando}
          className="rounded-lg bg-bege cursor-pointer px-5 py-3 text-sm font-medium text-temp-1 transition hover:bg-temp-1 hover:text-white disabled:opacity-50"
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
