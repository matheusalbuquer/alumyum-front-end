
function MessageBubble({ message }) {
  const isAgent = message.sender === "agent";

  const backendUrl = "http://localhost:8081";

  function resolverImagem(url) {
    if (!url) return null;

    if (url.startsWith("http")) {
      return url;
    }

    return `${backendUrl}${url.startsWith("/") ? "" : "/"}${url}`;
  }

  const imageUrl = resolverImagem(
    message.imageUrl || message.imagemUrl || message.mediaUrl
  );

  const produtos = Array.isArray(message.produtos)
    ? message.produtos
    : [];

  return (
    <div className={`flex ${isAgent ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-md overflow-hidden rounded-2xl px-4 py-3 ${
          isAgent
            ? "bg-blue-600 text-white"
            : "bg-slate-800 text-slate-200"
        }`}
      >
        {message.text && (
          <p className="whitespace-pre-wrap break-words text-sm">
            {message.text}
          </p>
        )}

        {imageUrl && (
          <a
            href={imageUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-2 block"
          >
            <img
              src={imageUrl}
              alt={message.imageName || "Imagem da mensagem"}
              className="max-h-80 w-full rounded-lg object-contain"
              loading="lazy"
              onError={(event) => {
                console.error("Erro ao carregar imagem:", imageUrl);
                event.currentTarget.style.display = "none";
              }}
            />
          </a>
        )}

        {produtos.map((produto) => {
          const foto = resolverImagem(produto.imagemUrl);

          return (
            <div
              key={produto.id}
              className="mt-3 overflow-hidden rounded-xl bg-white text-slate-900"
            >
              {foto && (
                <img
                  src={foto}
                  alt={produto.nome || "Produto"}
                  className="max-h-64 w-full object-contain"
                  loading="lazy"
                  onError={(event) => {
                    console.error("Erro ao carregar foto:", foto);
                    event.currentTarget.style.display = "none";
                  }}
                />
              )}

              <div className="p-3">
                <h3 className="font-semibold">
                  {produto.nome}
                </h3>

                {produto.preco != null && (
                  <p className="mt-1 font-bold">
                    {Number(produto.preco).toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </p>
                )}

                {produto.variacoes?.length > 0 && (
                  <div className="mt-2 text-xs text-slate-600">
                    {produto.variacoes.map((variacao, index) => (
                      <p key={variacao.id ?? variacao.sku ?? index}>
                        {variacao.cor || "Cor não informada"}
                        {" — "}
                        {variacao.tamanho || "Tamanho não informado"}
                        {" — "}
                        Estoque: {variacao.estoque ?? 0}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}

        <span
          className={`mt-1 block text-right text-[10px] ${
            isAgent ? "text-blue-200" : "text-slate-500"
          }`}
        >
          {message.time}
        </span>
      </div>
    </div>
  );
}

export default MessageBubble;
