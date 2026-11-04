
import { api } from "./api";

export async function obterUsuarioAutenticado() {
    const response = await api("/usuarios/me");

    if (!response.ok) {
        throw new Error("Não foi possível obter o usuário autenticado.");
    }

    return response.json();
}

export async function listarPedidos({
    lojaId,
    pagina = 0,
    tamanho = 5,
    status,
} = {}) {
    const params = new URLSearchParams({
        pagina: String(pagina),
        tamanho: String(tamanho),
    });

    if (status) {
        params.set("status", status);
    }

    const response = await api(
        `/api/lojas/${lojaId}/pedidos?${params.toString()}`
    );

    if (!response.ok) {
        throw new Error("Não foi possível listar os pedidos.");
    }

    return response.json();
}
