
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

  return texto.trim() ? JSON.parse(texto) : null;
}

export async function listarCategorias() {
  const response = await fetch(`${API_URL}/categorias`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${obterToken()}`,
    },
  });

  return interpretarResposta(response, "listar categorias");
}

export async function cadastrarCategoria(nome) {
  const response = await fetch(`${API_URL}/categorias`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${obterToken()}`,
    },
    body: JSON.stringify({ nome }),
  });

  return interpretarResposta(response, "cadastrar categoria");
}
