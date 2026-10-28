
const API_URL = "http://localhost:8080";

function obterToken() {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Token não encontrado. Faça login novamente.");
  }

  return token;
}

async function interpretarResposta(response, operacao) {
  const texto = await response.text();

  if (!response.ok) {
    throw new Error(
      `Erro ao ${operacao} (${response.status}): ${texto.slice(0, 300)}`
    );
  }

  if (!texto.trim()) {
    return null;
  }

  try {
    return JSON.parse(texto);
  } catch (error) {
    console.error(`Resposta inválida ao ${operacao}:`, texto);
    throw new Error("O backend retornou uma resposta que não é JSON válido.");
  }
}


export async function cadastrarProduto(dadosProduto) {
  const formData = new FormData();

  const produto = {
    nome: dadosProduto.nome,
    descricao: dadosProduto.descricao,
    preco: Number(dadosProduto.preco),
    nomeCategoria: dadosProduto.nomeCategoria,

    variacoes: (dadosProduto.variacoes || []).map((variacao) => ({
      sku: variacao.sku,
      cor: variacao.cor,
      tamanho: variacao.tamanho,
      estoque: Number(variacao.estoque),
      preco:
        variacao.preco === null ||
        variacao.preco === undefined ||
        variacao.preco === ""
          ? null
          : Number(variacao.preco),
    })),
  };

  formData.append("produto", JSON.stringify(produto));

  if (dadosProduto.imagem) {
    formData.append("imagem", dadosProduto.imagem);
  }

  let response;

  try {
    response = await fetch(`${API_URL}/produtos`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${obterToken()}`,
      },
      body: formData,
    });
  } catch (error) {
    console.error("Erro de conexão com a API:", error);
    throw new Error(
      "Não foi possível conectar ao backend. Verifique se ele está rodando e se o CORS está configurado."
    );
  }

  return interpretarResposta(response, "cadastrar produto");
}







export async function listarProdutos(pagina = 0, tamanho = 20) {
  const params = new URLSearchParams({
    page: String(pagina),
    size: String(tamanho),
  });

  const response = await fetch(
    `${API_URL}/produtos?${params.toString()}`,
    {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${obterToken()}`,
      },
    }
  );

  const texto = await response.text();

  if (!response.ok) {
    throw new Error(
      `Erro HTTP ${response.status}: ${texto.slice(0, 500)}`
    );
  }

  let dados;

  console.log("Quantidade de objetos content:", (texto.match(/"content"\s*:/g) || []).length);
console.log("Início da resposta:", texto.slice(0, 100));
console.log("Final da resposta:", texto.slice(-150));

  try {
    dados = JSON.parse(texto);
  } catch (error) {
    console.error("Resposta bruta recebida do backend:", texto);
    console.error("Tamanho da resposta:", texto.length);
    console.error(
      "Trecho próximo ao erro:",
      texto.slice(2200, 2550)
    );

    throw new Error(
      "A resposta de /produtos não é um JSON válido. Confira o trecho exibido no console."
    );
  }

  if (Array.isArray(dados)) {
    return dados;
  }

  if (Array.isArray(dados?.content)) {
    return dados.content;
  }

  throw new Error(
    "A resposta da API não contém uma lista de produtos."
  );
}
