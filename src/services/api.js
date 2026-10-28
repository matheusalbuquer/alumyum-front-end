
const API_URL = "http://localhost:8080";

export async function api(endpoint, options = {}) {
  const token = localStorage.getItem("token");

  const headers = {
    ...options.headers,
  };

  if (!(options.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  // Nunca envia um JWT antigo para o endpoint de login.
  const endpointPublico = endpoint === "/auth/login";

  if (token && !endpointPublico) {
    headers.Authorization = `Bearer ${token}`;
  }

  return fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });
}
