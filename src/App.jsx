
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Dashboard
import Login from "./pages/login/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import Conversations from "./pages/conversations/Conversations";
import Catalog from "./pages/catalog/Catalog";
import Orders from "./pages/orders/Orders";
import Reports from "./pages/reports/Reports";
import Ia from "./pages/ia/Ia";
import Whatsapp from "./pages/whatsapp/Whatsapp";
import Settings from "./pages/settings/Settings";

// Super Admin
import DashboardSuperAdmin from "./superadmfront/pages/SuperAdm";

// Vitrine
import Home from "./storyfront/pages/vitrine/Home";
import Cart from "./storyfront/pages/cart/Cart";
import { CartProvider } from "./storyfront/context/CardContext";

function App() {
    return (
        <BrowserRouter>
            <CartProvider>
                <Routes>
                    {/* Dashboard */}
                    <Route path="/" element={<Login />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/conversations" element={<Conversations />} />
                    <Route path="/catalog" element={<Catalog />} />
                    <Route path="/orders" element={<Orders />} />
                    <Route path="/reports" element={<Reports />} />
                    <Route path="/ia" element={<Ia />} />
                    <Route path="/whatsapp" element={<Whatsapp />} />
                    <Route path="/settings" element={<Settings />} />

                    {/* Super Admin */}
                    <Route
                        path="/superadmin"
                        element={<DashboardSuperAdmin />}
                    />

                    {/* Vitrine e carrinho */}
                    <Route path="/:slug/cart" element={<Cart />} />
                    <Route path="/:slug" element={<Home />} />
                </Routes>
            </CartProvider>
        </BrowserRouter>
    );
}

export default App;
