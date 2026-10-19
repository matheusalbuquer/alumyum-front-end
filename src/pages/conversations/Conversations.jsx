import { useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import ConversationList from "../../components/conversations/ConversationList";
import ConversationHeader from "../../components/conversations/ConversationHeader";
import MessageList from "../../components/conversations/MessageList";
import MessageInput from "../../components/conversations/MessageInput";

function Conversations() {
  const [conversaSelecionada, setConversaSelecionada] = useState(null);

  return (
    <div className="flex h-screen bg-slate-950">
      <Sidebar />

      <main className="flex min-w-0 flex-1">
        <section className="w-80 shrink-0 border-r border-slate-800 bg-slate-900">
          <ConversationList
            onSelecionarConversa={setConversaSelecionada}
            conversaSelecionada={conversaSelecionada}
          />
        </section>

        <section className="flex min-w-0 flex-1 flex-col bg-slate-950">
          <ConversationHeader conversa={conversaSelecionada} />

          <MessageList conversaId={conversaSelecionada?.id} />

          <MessageInput conversaId={conversaSelecionada?.id} />
        </section>
      </main>
    </div>
  );
}

export default Conversations;