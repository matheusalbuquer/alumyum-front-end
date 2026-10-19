import Sidebar from "../../components/sidebar/Sidebar";

function Dashboard() {
  return (
    <div className="flex min-h-screen bg-slate-950">
      <Sidebar />

      <main className="flex-1">{/* conteúdo do Dashboard */}</main>
    </div>
  );
}

export default Dashboard;
