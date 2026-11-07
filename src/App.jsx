import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

//Dashboard
import Login from "./pages/login/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import Conversations from "./pages/conversations/Conversations";
import Catalog from "./pages/catalog/Catalog";
import Orders from "./pages/orders/Orders";
import Reports from "./pages/reports/Reports"
import Ia from "./pages/ia/Ia"
import Whatsapp from "./pages/whatsapp/Whatsapp";
import Settings from "./pages/settings/Settings";

//Vitrine
import Home from "./storyfront/pages/vitrine/Home";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/**Dashboard**/}
        <Route path="/" element={<Login />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/conversations" element={<Conversations />} />

        <Route path="/catalog" element={<Catalog />} />

        <Route path='/orders' element={<Orders />} />

        <Route path='/reports' element={<Reports />} />

        <Route path="/ia" element={<Ia />} />

        <Route path="/whatsapp" element={<Whatsapp />} />

        <Route path="/settings" element={<Settings />} />

        {/*Vitrine*/}
        <Route path="/vitrine" element={<Home />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
