import { api } from "../../services/api";

export async function listarProdutosVitrine(slug) {
    try {
        const response = await api(
            `/api/publico/lojas/${encodeURIComponent(slug)}/produtos`,
            {
                method: "GET",
            }
        );

        if (!response.ok) {
            throw new Error(`Erro ao buscar produtos: ${response.status}`);
        }

        return await response.json();

    } catch (error) {
        console.error("Erro ao carregar produtos da vitrine:", error);
        throw error;
    }
}