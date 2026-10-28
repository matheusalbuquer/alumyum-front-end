
import { useEffect, useState } from "react";
import MessageBubble from "./MessageBubble";
import { listarMensagens } from "../../services/conversaService";

function MessageList({ conversaId }) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!conversaId) {
      setMessages([]);
      setError("");
      return;
    }

    let ativo = true;
    let carregando = false;

    async function carregarMensagens() {
      if (carregando || !ativo) return;

      carregando = true;

      try {
        const dados = await listarMensagens(conversaId);

        if (!ativo) return;

        
        const mensagensFormatadas = dados.map((mensagem) => ({
          ...mensagem,
          id: mensagem.id,
          text: mensagem.conteudo ?? "",
          
          imageUrl: mensagem.imagemUrl
            ? mensagem.imagemUrl.startsWith("http")
              ? mensagem.imagemUrl
              : `http://localhost:8080${
                  mensagem.imagemUrl.startsWith("/") ? "" : "/"
                }${mensagem.imagemUrl}`
            : null,

          produtos: Array.isArray(mensagem.produtos)
            ? mensagem.produtos
            : [],
          sender:
            mensagem.remetente === "CLIENTE" ? "customer" : "agent",
          time: mensagem.createdAt
            ? new Date(mensagem.createdAt).toLocaleTimeString("pt-BR", {
                hour: "2-digit",
                minute: "2-digit",
              })
            : "",
        }));

        setMessages(mensagensFormatadas);
        setError("");
      } catch (err) {
        console.error("Erro ao atualizar mensagens:", err);

        if (ativo) {
          setError("Não foi possível atualizar as mensagens.");
        }
      } finally {
        carregando = false;

        if (ativo) {
          setLoading(false);
        }
      }
    }

    setLoading(true);
    carregarMensagens();

    const intervalo = setInterval(carregarMensagens, 3000);

    return () => {
      ativo = false;
      clearInterval(intervalo);
    };
  }, [conversaId]);

  if (!conversaId) {
    return (
      <div className="flex flex-1 items-center justify-center text-slate-500">
        Selecione uma conversa para visualizar as mensagens.
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-6">
      <div className="flex flex-col gap-3">
        {loading && messages.length === 0 && (
          <p className="text-sm text-slate-400">
            Carregando mensagens...
          </p>
        )}

        {error && (
          <p className="text-sm text-red-400">{error}</p>
        )}

        {!loading && !error && messages.length === 0 && (
          <p className="text-sm text-slate-400">
            Nenhuma mensagem encontrada.
          </p>
        )}

        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
      </div>
    </div>
  );
}

export default MessageList;
