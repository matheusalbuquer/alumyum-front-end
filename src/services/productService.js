
const API_URL = "http://localhost:8081";

function obterToken() {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Token não encontrado. Faça login novamente.");
  }

  return token;
}

export async function cadastrarProduto(dadosProduto) {
  const formData = new FormData();

  formData.append("nome", dadosProduto.nome);
  formData.append("descricao", dadosProduto.descricao);
  formData.append("estoque", dadosProduto.estoque);
  formData.append("preco", String(dadosProduto.preco));

  if (dadosProduto.imagem) {
    formData.append("imagem", dadosProduto.imagem);
  }

  const response = await fetch(`${API_URL}/produtos`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${obterToken()}`,
    },
    body: formData,
  });

  if (!response.ok) {
    const mensagem = await response.text();

    throw new Error(
      mensagem || `Erro ao cadastrar produto (${response.status})`
    );
  }

  return response.json();
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
        Authorization: `Bearer ${obterToken()}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error(
      `Erro ao listar produtos (${response.status})`
    );
  }

  return response.json();
}
