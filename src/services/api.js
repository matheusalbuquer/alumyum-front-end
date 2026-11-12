
const API_URL = "http://localhost:8080";

export async function api(endpoint, options = {}) {
    const token = localStorage.getItem("token");

    const headers = {
        ...options.headers,
    };

    const temBody = options.body !== undefined && options.body !== null;
    const ehFormData = temBody && options.body instanceof FormData;

    // Só define Content-Type quando existe corpo na requisição.
    if (temBody && !ehFormData) {
        headers["Content-Type"] = "application/json";
    }

    // Rotas públicas não precisam receber JWT.
    const endpointPublico = endpoint.startsWith("/api/publico/");

    if (token && !endpointPublico) {
        headers.Authorization = `Bearer ${token}`;
    }

    return fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers,
    });
}
