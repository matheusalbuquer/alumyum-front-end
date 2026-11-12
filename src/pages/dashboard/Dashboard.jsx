import DashboardHeader from "../../components/dashboard/DashboardHeader";
import Sidebar from "../../components/sidebar/Sidebar";
import Cards from "../../components/dashboard/Cards";
import Graficos from "../../components/dashboard/Graficos";
import Listas from "../../components/dashboard/Listas";
function Dashboard() {
  return (
    <div className="flex h-screen bg-white">
      <Sidebar />

      <main className="min-w-0 flex-1 overflow-y-auto p-6 md:p-8">
        <div className="mx-auto max-w-7xl space-y-8">
          <DashboardHeader />
          <Cards />
          <Graficos />
          <Listas />
        </div>
      </main>


    </div>

  );
}

export default Dashboard;
