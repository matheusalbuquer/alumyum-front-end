function ConversationHeader() {
  return (
    <header className="flex items-center gap-3 border-b border-slate-800 bg-slate-900 px-5 py-4">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-semibold text-white">
        J
      </div>

      <div>
        <h2 className="text-sm font-semibold text-white">João Silva</h2>

        <p className="text-xs text-emerald-400">Online</p>
      </div>
    </header>
  );
}

export default ConversationHeader;
