
import { api } from "./api";

export async function listarConversas(page = 0, size = 20) {
  const response = await api(
    `/conversas?page=${page}&size=${size}&sort=id,desc`
  );

  if (!response.ok) {
    throw new Error("Erro ao carregar as conversas.");
  }

  const data = await response.json();

  return Array.isArray(data) ? data : data.content ?? [];
}

export async function listarMensagens(conversaId, page = 0, size = 100) {
  const response = await api(
    `/mensagens/conversa/${conversaId}?page=${page}&size=${size}&sort=id,asc`
  );

  if (!response.ok) {
    throw new Error("Erro ao carregar as mensagens.");
  }

  const data = await response.json();

  return Array.isArray(data) ? data : data.content ?? [];
}
