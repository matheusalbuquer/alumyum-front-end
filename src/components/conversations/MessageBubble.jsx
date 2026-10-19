
function MessageBubble({ message }) {
  const isAgent = message.sender === "agent";

  const imageUrl = message.imageUrl || message.imagemUrl || message.mediaUrl;

  const backendUrl = "http://localhost:8081";

  const resolvedImageUrl = imageUrl
    ? imageUrl.startsWith("http")
      ? imageUrl
      : `${backendUrl}${imageUrl.startsWith("/") ? "" : "/"}${imageUrl}`
    : null;

  return (
    <div
      className={`flex ${
        isAgent ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`max-w-md overflow-hidden rounded-2xl px-4 py-3 ${
          isAgent
            ? "bg-blue-600 text-white"
            : "bg-slate-800 text-slate-200"
        }`}
      >
        {message.text && (
          <p className="whitespace-pre-wrap break-words text-sm">
            {message.text}
          </p>
        )}

        {resolvedImageUrl && (
          <a
            href={resolvedImageUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-2 block"
          >
            <img
              src={resolvedImageUrl}
              alt={message.imageName || "Imagem enviada na conversa"}
              className="max-h-80 w-full rounded-lg object-contain"
              loading="lazy"
              onError={(event) => {
                console.error(
                  "Não foi possível carregar a imagem:",
                  resolvedImageUrl
                );
                event.currentTarget.style.display = "none";
              }}
            />
          </a>
        )}

        <span
          className={`mt-1 block text-right text-[10px] ${
            isAgent ? "text-blue-200" : "text-slate-500"
          }`}
        >
          {message.time}
        </span>
      </div>
    </div>
  );
}

export default MessageBubble;
