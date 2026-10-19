import {
  LayoutDashboard,
  MessageCircle,
  ShoppingBag,
  Package,
  BarChart3,
  Bot,
  Settings,
} from "lucide-react";

function Sidebar() {
  const menuItems = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      path: "/dashboard",
    },
    {
      label: "Conversas",
      icon: MessageCircle,
      path: "/conversations",
    },
    {
      label: "Catálogo",
      icon: ShoppingBag,
      path: "/catalog",
    },
    {
      label: "Pedidos",
      icon: Package,
      path: "/pedidos",
    },
    {
      label: "Relatórios",
      icon: BarChart3,
      path: "/relatorios",
    },
    {
      label: "IA",
      icon: Bot,
      path: "/ia",
    },
    {
      label: "Configurações",
      icon: Settings,
      path: "/configuracoes",
    },
  ];

  return (
    <aside className="flex h-screen w-64 flex-col border-r border-slate-800 bg-slate-950">
      {/* Logo */}
      <div className="flex h-20 items-center px-6">
        <h1 className="text-xl font-bold text-white">
          Alum<span className="text-green-500">Yum</span>
        </h1>
      </div>

      {/* Menu */}
      <nav className="flex-1 px-3">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <a
              key={item.label}
              href={item.path}
              className="mb-1 flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-400 transition hover:bg-slate-900 hover:text-white"
            >
              <Icon size={18} />

              <span>{item.label}</span>
            </a>
          );
        })}
      </nav>

      {/* Usuário */}
      <div className="border-t border-slate-800 p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-sm font-semibold text-white">
            M
          </div>

          <div>
            <p className="text-sm font-semibold text-white">Matheus</p>

            <p className="text-xs text-slate-500">Administrador</p>
          </div>
        </div>

        <button className="mt-4 w-full rounded-lg border border-slate-800 py-2 text-sm text-slate-400 transition hover:bg-slate-900 hover:text-white">
          Sair
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
