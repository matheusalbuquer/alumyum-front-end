
import { useState } from "react";

import {
    Home,
    LayoutGrid,
    Shirt,
    BriefcaseBusiness,

    ShoppingBag,
    MoreHorizontal,
    ClipboardList,
    MessageCircle,
    ChevronDown,
} from "lucide-react";

import { NavLink } from "react-router-dom";

function Sidebar() {
    const [categoriasAbertas, setCategoriasAbertas] = useState(true);

    const categorias = [
        { label: "Camisas", icon: Shirt, path: "/categories/camisas" },
        { label: "Jaquetas", icon: BriefcaseBusiness, path: "/categories/jaquetas" },
        { label: "Acessórios", icon: ShoppingBag, path: "/categories/acessorios" },
        { label: "Outros", icon: MoreHorizontal, path: "/categories/outros" },
    ];

    const links = [
        { label: "Início", icon: Home, path: "/" },
        { label: "Meus pedidos", icon: ClipboardList, path: "/orders" },
        { label: "Fale conosco", icon: MessageCircle, path: "/contact" },
    ];

    const linkStyle = ({ isActive }) =>
        `flex items-center gap-3 rounded-xl px-3 py-3 text-sm transition ${isActive
            ? "bg-[#A8320D] text-white"
            : "text-gray-800 hover:bg-[#F9EEE9] hover:text-[#A8320D]"
        }`;

    return (
        <aside className="font-['Poppins'] fixed left-0 top-[70px] z-30 hidden h-[calc(100vh-70px)] w-[265px] flex-col border-r border-gray-200 bg-white px-3 py-7 lg:flex">

            <nav className="flex-1 space-y-1">

                {/* Links principais */}
                <NavLink to="/vitrine" end className={linkStyle}>
                    <Home size={21} />
                    <span>Início</span>
                </NavLink>

                {/* Categorias */}
                <div>
                    <button
                        type="button"
                        onClick={() => setCategoriasAbertas(!categoriasAbertas)}
                        aria-expanded={categoriasAbertas}
                        className="flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-3 text-sm text-gray-800 transition hover:bg-[#F9EEE9] hover:text-[#A8320D]"
                    >
                        <LayoutGrid size={21} />

                        <span className="flex-1 text-left">
                            Categorias
                        </span>

                        <ChevronDown
                            size={17}
                            className={`transition-transform ${categoriasAbertas ? "rotate-0" : "-rotate-90"
                                }`}
                        />
                    </button>

                    {categoriasAbertas && (
                        <div className="ml-5 mt-1 space-y-1 border-l border-gray-200 pl-3">
                            {categorias.map((item) => {
                                const Icon = item.icon;

                                return (
                                    <NavLink
                                        key={item.path}
                                        to={item.path}
                                        className={linkStyle}
                                    >
                                        <Icon size={19} />
                                        <span>{item.label}</span>
                                    </NavLink>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Outros links */}
                <div className="space-y-1 pt-3">
                    {links.slice(1).map((item) => {
                        const Icon = item.icon;

                        return (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                className={linkStyle}
                            >
                                <Icon size={21} />
                                <span>{item.label}</span>
                            </NavLink>
                        );
                    })}
                </div>

            </nav>
        </aside>
    );
}

export default Sidebar;
