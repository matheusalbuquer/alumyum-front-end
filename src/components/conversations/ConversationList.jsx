import { useEffect, useState } from "react";
import ConversationItem from "./ConversationItem";
import { listarConversas } from "../../services/conversaService";

function ConversationList({
  onSelecionarConversa,
  conversaSelecionada,
}) {
  const [conversations, setConversations] = useState([]);
  const [pesquisa, setPesquisa] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let ativo = true;

    async function carregarConversas() {
      try {
        const data = await listarConversas();

        if (ativo) {
          
          setConversations(Array.isArray(data) ? data : data.content ?? []);
          setError("");
        }
      } catch (err) {
        console.error("Erro ao carregar conversas:", err);

        if (ativo) {
          setError("Não foi possível carregar as conversas.");
        }
      } finally {
        if (ativo) {
          setLoading(false);
        }
      }
    }

    carregarConversas();

    const intervalo = setInterval(carregarConversas, 3000);

    return () => {
      ativo = false;
      clearInterval(intervalo);
    };
  }, []);

  const conversasFiltradas = conversations.filter((conversation) =>
    String(conversation.identificadorCliente ?? "")
      .toLowerCase()
      .includes(pesquisa.toLowerCase())
  );

  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-slate-800 p-5 mt-3 ml-2">
        <h1 className=" font-['Poppins'] text-2xl font-bold text-white  ">
          Conversas
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Suas conversas recentes
        </p>
      </div>

      <div className="p-4">
        <input
          type="text"
          placeholder="Pesquisar conversa..."
          value={pesquisa}
          onChange={(e) => setPesquisa(e.target.value)}
          className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none transition focus:border-blue-500"
        />
      </div>

      <div className="flex-1 overflow-y-auto">
        {loading && (
          <p className="p-4 text-sm text-slate-400">
            Carregando conversas...
          </p>
        )}

        {!loading && error && (
          <p className="p-4 text-sm text-red-400">{error}</p>
        )}

        {!loading &&
          !error &&
          conversasFiltradas.length === 0 && (
            <p className="p-4 text-sm text-slate-400">
              Nenhuma conversa encontrada.
            </p>
          )}

        {!loading &&
          !error &&
          conversasFiltradas.map((conversation) => (
            <ConversationItem
              key={conversation.id}
              name={conversation.identificadorCliente}
              message={conversation.status}
              time=""
              unread={0}
              onClick={() => onSelecionarConversa?.(conversation)}
              selected={conversaSelecionada?.id === conversation.id}
            />
          ))}
      </div>
    </div>
  );
}

export default ConversationList;