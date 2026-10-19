import { useState } from "react";
import Logo from "../../assets/images/logo.png";
import { api } from "../../services/api";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await api("/auth/login", {
        method: "POST",
        body: JSON.stringify({
          email: email,
          senha: password,
        }),
      });

      if (!response.ok) {
        throw new Error("E-mail ou senha inválidos.");
      }

      const data = await response.json();

      console.log("Login realizado:", data);

      // Salva o JWT
      localStorage.setItem("token", data.token);

      // Depois podemos trocar isso pelo React Router
      window.location.href = "/dashboard";
    } catch (error) {
      console.error(error);
      setError(error.message || "Erro ao realizar login.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-2xl"
      >
        {/* Logo */}
        <div className="mb-8 flex flex-col items-center">
          <img
            src={Logo}
            alt="Alumyum Logo"
            className="h-14 w-auto"
          />

          <h1 className="mt-3 text-2xl font-bold text-white">
            Alumyum
          </h1>

          <p className="mt-2 text-center text-sm text-slate-400">
            Entre na sua conta para continuar
          </p>
        </div>

        {/* E-mail */}
        <div className="mb-5">
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-slate-300"
          >
            E-mail
          </label>

          <input
            id="email"
            type="email"
            placeholder="seu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          />
        </div>

        {/* Senha */}
        <div className="mb-2">
          <label
            htmlFor="password"
            className="mb-2 block text-sm font-medium text-slate-300"
          >
            Senha
          </label>

          <input
            id="password"
            type="password"
            placeholder="Sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          />
        </div>

        {/* Erro */}
        {error && (
          <div className="mt-3 rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2 text-sm text-red-400">
            {error}
          </div>
        )}

        {/* Esqueceu a senha */}
        <div className="mb-6 mt-3 flex justify-end">
          <button
            type="button"
            className="text-sm text-blue-400 transition hover:text-blue-300"
          >
            Esqueceu a senha?
          </button>
        </div>

        {/* Entrar */}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-blue-600 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900"
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>

        {/* Cadastro */}
        <p className="mt-6 text-center text-sm text-slate-400">
          Não tem uma conta?{" "}
          <button
            type="button"
            className="font-medium text-blue-400 transition hover:text-blue-300"
          >
            Cadastre-se
          </button>
        </p>
      </form>
    </div>
  );
}

export default LoginForm;