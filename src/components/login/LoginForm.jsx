import { useState } from "react";
import Logo from "../../assets/images/logo.png";
import { api } from "../../services/api";
import { NavLink } from "react-router-dom";
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
    <div className="flex min-h-screen items-center justify-center  px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-2xl border border-[#EBC4B8] bg-white p-8 shadow-2xl"
      >
        {/* Logo */}
        <div className="  mb-8 flex flex-col items-center">
          <div className="flex h-20  items-center px-6 align-center gap-2 justify-start">
            <h1 className="font-['Fira Code'] text-xl font-bold text-temp-1">
              Cabide

            </h1>

            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#B51B00" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-coat-hanger preview-icon"><path d="M9 5a3 3 0 1 1 5.1 2.1l-1.5 1.5A2 2 0 0 0 12 10v1" /><path d="M4 21a2 2 0 0 1-1.1-3.7L12 11l9.2 6.4A2 2 0 0 1 20 21Z" /></svg>


          </div>


          <p className="font-['Poppins'] text-center text-sm text-marrom-1 font-semibold ">
            Entre na sua conta para continuar
          </p>
        </div>

        {/* E-mail */}
        <div className=" mb-5 font-['Poppins']">
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-semibold text-marrom-1"
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
            className=" w-full rounded-lg placeholder:bg-bege bg-bege px-4 py-3 text-sm text-marrom-1 placeholder-marrom-1 outline-none transition focus:border-temp-1 "
          />
        </div>

        {/* Senha */}
        <div className="font-['Poppins'] mb-2 ">
          <label
            htmlFor="password"
            className="mb-2 block text-sm font-medium text-marrom-1"
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
            className=" w-full rounded-lg bg-bege px-4 py-3 text-sm text-marrom-1 placeholder-marrom-1 outline-none transition focus:border-temp-1 "
          />
        </div>

        {/* Erro */}
        {error && (
          <div className="mt-3 rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2 text-sm text-red-400">
            {error}
          </div>
        )}

        {/* Esqueceu a senha */}
        <div className="font-['Poppins'] mb-6 mt-3 flex justify-end">
          <button
            type="button"
            className="font-semibold text-sm cursor-pointer text-marrom-1 transition  hover:text-temp-1"
          >
            Esqueceu a senha?
          </button>
        </div>

        {/* Entrar */}

        <button
          type="submit"
          disabled={loading}
          className="font-['Poppins'] cursor-pointer w-full rounded-lg bg-bege px-6 py-3 text-sm font-semibold text-temp-1 transition hover:bg-temp-1 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>


        {/* Cadastro */}
        <p className="font-['Poppins'] font-semibold mt-8 text-center text-sm text-marrom-1">
          Não tem uma conta?{" "}
          <button
            type="button"
            className="cursor-pointer  text-marrom-1 transition hover:text-temp-1"
          >
            Cadastre-se
          </button>
        </p>
      </form>
    </div>
  );
}

export default LoginForm;