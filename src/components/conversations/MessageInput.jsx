import { useState } from "react";
import { api } from "../../services/api";

function MessageInput({ conversaId }) {
  const [texto, setTexto] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState("");

  async function enviarMensagem(e) {
    e.preventDefault();

    const conteudo = texto.trim();

    if (!conteudo || !conversaId || enviando) return;

    try {
      setEnviando(true);
      setError("");

      const response = await api(
        `/mensagens/conversa/${conversaId}`,
        {
          method: "POST",
          body: JSON.stringify({ conteudo }),
        }
      );

      if (!response.ok) {
        throw new Error("Não foi possível enviar a mensagem.");
      }

      setTexto("");
      window.dispatchEvent(
        new CustomEvent("mensagens-atualizadas")
      );
    } catch (err) {
      console.error("Erro ao enviar mensagem:", err);
      setError("Não foi possível enviar. Verifique o backend.");
    } finally {
      setEnviando(false);
    }
  }

  return (
    <div className="border-t border-slate-800 bg-slate-900 p-4">
      <form onSubmit={enviarMensagem}>
        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder={
              conversaId
                ? "Digite uma mensagem..."
                : "Selecione uma conversa..."
            }
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            disabled={!conversaId || enviando}
            className="flex-1 rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none focus:border-blue-500 disabled:opacity-50"
          />

          <button
            type="submit"
            disabled={!conversaId || !texto.trim() || enviando}
            className="rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {enviando ? "Enviando..." : "Enviar"}
          </button>
        </div>

        {error && (
          <p className="mt-2 text-sm text-red-400">{error}</p>
        )}
      </form>
    </div>
  );
}

export default MessageInput;