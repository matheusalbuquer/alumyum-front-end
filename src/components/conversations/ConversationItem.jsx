function ConversationItem({
  name,
  message,
  time,
  unread,
  onClick,
  selected,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center gap-3 border-b border-slate-800 px-4 py-4 text-left transition ${
        selected
          ? "bg-slate-800"
          : "hover:bg-slate-800/60"
      }`}
    >
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-600 font-semibold text-white">
        {String(name ?? "?").charAt(0).toUpperCase()}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <span className="truncate text-sm font-medium text-white">
            {name}
          </span>

          <span className="shrink-0 text-xs text-slate-500">
            {time}
          </span>
        </div>

        <div className="mt-1 flex items-center justify-between gap-2">
          <p className="truncate text-sm text-slate-400">
            {message}
          </p>

          {unread > 0 && (
            <span className="flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full bg-blue-600 px-1.5 text-xs font-semibold text-white">
              {unread}
            </span>
          )}
        </div>
      </div>
    </button>
  );
}

export default ConversationItem;