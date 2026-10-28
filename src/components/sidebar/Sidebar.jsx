import {
  LayoutDashboard,
  MessageCircle,
  ShoppingBag,
  Package,
  BarChart3,
  Sparkles,
  Settings,
  QrCode,
  Clipboard,
  FileChartColumnIncreasing



} from "lucide-react";

import { NavLink } from "react-router-dom";

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
      icon: Clipboard,
      path: "/orders",
    },
    {
      label: "Relatórios",
      icon: FileChartColumnIncreasing,
      path: "/reports",
    },
    {
      label: "IA",
      icon: Sparkles,
      path: "/ia",
    },
    {
      label: "Whatsapp",
      icon: QrCode,
      path: "/whatsapp",
    },
    {
      label: "Configurações",
      icon: Settings,
      path: "/settings",
    },
  ];

  return (
    <aside className="flex sticky h-screen w-64 flex-col  shadow-md shadow-[#EBC4B8] bg-white">
      {/* Logo */}
      <div className="flex h-20 mb-4 items-center px-6 align-center gap-2 justify-start">
        <h1 className="font-['Fira Code'] text-xl font-bold text-temp-1">
          Cabide

        </h1>

        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#B51B00" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-coat-hanger preview-icon"><path d="M9 5a3 3 0 1 1 5.1 2.1l-1.5 1.5A2 2 0 0 0 12 10v1" /><path d="M4 21a2 2 0 0 1-1.1-3.7L12 11l9.2 6.4A2 2 0 0 1 20 21Z" /></svg>


      </div>

      {/* Menu */}
      <nav className="flex-1 px-3 border-b border-[#EBC4B8]">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (

            <NavLink

              key={item.label}
              to={item.path}

              className={({ isActive }) =>
                `mb-1 flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-marrom-2 transition hover:bg-bege hover:text-temp-1 ${isActive
                  ? 'bg-temp-1 hover:bg-temp-1 hover:text-white text-white'
                  : ''}`

              }
            >
              <Icon size={18} />

              <span>{item.label}</span>
            </ NavLink>
          );
        })}
      </nav>

      {/* Usuário */}
      <div className=" p-4">
        <div className=" flex items-center gap-3">
          <div className="cursor-pointer hover:border border-temp-1 flex h-9 w-9 items-center justify-center rounded-full bg-bege text-sm font-semibold text-temp-1">
            M
          </div>

          <div>
            <p className="font-['Poppins'] text-sm font-semibold text-temp-1">Matheus</p>

            <p className="text-xs text-slate-500">Administrador</p>
          </div>
        </div>

        <NavLink to="/"
          className="mt-4 flex items-center justify-center p-1 cursor-pointer rounded-lg py-2 text-sm font-['Poppins'] font-medium text-temp-1 transition bg-bege hover:bg-temp-1 hover:text-white">
          Sair
        </NavLink>
      </div>
    </aside >
  );
}

export default Sidebar;