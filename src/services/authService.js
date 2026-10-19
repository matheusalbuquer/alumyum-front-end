import { api } from "./api";

export async function login(email, senha) {
    const response = await api("/auth/login", {
        method: "POST",
        body: JSON.stringify({
            email,
            senha
        })
    });

    if (!response.ok) {
        throw new Error("E-mail ou senha inválidos");
    }

    const data = await response.json();

    localStorage.setItem("token", data.token);

    return data;
}