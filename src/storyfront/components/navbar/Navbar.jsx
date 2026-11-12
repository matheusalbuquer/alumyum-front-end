
import {
    Search,
    CircleHelp,
    ShoppingCart,
    MessageCircle,
    Menu,
} from "lucide-react";

import { NavLink } from "react-router-dom";

function Navbar() {
    const links = [
        { label: "Início", path: "/" },
        { label: "Produtos", path: "/products" },
        { label: "Categorias", path: "/categories" },
        { label: "Sobre", path: "/about" },
    ];

    return (
        <header className="font-['Poppins'] fixed left-0 top-0 z-50 h-[70px] w-full border-b border-gray-200 bg-white">
            <nav className="flex h-full items-center justify-between gap-5 px-5 lg:px-10">

                {/* Logo */}
                <NavLink to="/vitrine" className="flex shrink-0 items-center gap-2">
                    <svg
                        width="35"
                        height="35"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#A8320D"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M9 5a3 3 0 1 1 5.1 2.1l-1.5 1.5A2 2 0 0 0 12 10v1" />
                        <path d="M4 21a2 2 0 0 1-1.1-3.7L12 11l9.2 6.4A2 2 0 0 1 20 21Z" />
                    </svg>

                    <span className="font-['Fira_Code'] text-2xl font-bold text-[#A8320D]">
                        Cabide
                    </span>
                </NavLink>

                {/* Navegação */}
                <div className="hidden items-center gap-2 xl:flex">
                    {links.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            end={item.path === "/"}
                            className={({ isActive }) =>
                                `rounded-full px-4 py-2 text-sm transition ${isActive
                                    ? "bg-[#F9EEE9] font-boldx' text-temp-1"
                                    : "text-gray-800 hover:bg-[#F9EEE9] hover:text-temp-1"
                                }`
                            }
                        >
                            {item.label}
                        </NavLink>
                    ))}
                </div>

                {/* Pesquisa */}
                <div className="hidden max-w-[480px] flex-1 items-center gap-3 rounded-xl border border-gray-300 bg-[#FAF8F7] px-4 py-2.5 md:flex">
                    <Search size={20} className="shrink-0 text-gray-500" />

                    <input
                        type="text"
                        placeholder="Buscar produtos, categorias ou marcas..."
                        className="w-full bg-transparent text-sm outline-none"
                    />
                </div>

                {/* Ações */}
                <div className="flex shrink-0 items-center gap-3 lg:gap-5">

                    <NavLink
                        to="/help"
                        className="flex cursor-pointer items-center gap-2 text-gray-800 hover:text-[#A8320D]"
                    >
                        <CircleHelp size={22} />
                        <span className="hidden lg:block text-sm">Ajuda</span>
                    </NavLink>

                    <a
                        href="https://wa.me/"
                        target="_blank"
                        rel="noreferrer"
                        className="flex cursor-pointer items-center gap-2 text-gray-800 hover:text-green-600"
                    >
                        <MessageCircle size={23} className="text-green-600" />
                        <span className="hidden lg:block text-sm">WhatsApp</span>
                    </a>

                    <NavLink
                        to="/cart"
                        aria-label="Carrinho"
                        className="relative cursor-pointer p-2 text-[#A8320D] hover:opacity-70"
                    >
                        <ShoppingCart size={26} />

                        <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1 text-xs text-white">
                            2
                        </span>
                    </NavLink>

                    <button
                        type="button"
                        aria-label="Abrir menu"
                        className="cursor-pointer text-[#A8320D] lg:hidden"
                    >
                        <Menu size={25} />
                    </button>

                </div>
            </nav>
        </header>
    );
}

export default Navbar;
