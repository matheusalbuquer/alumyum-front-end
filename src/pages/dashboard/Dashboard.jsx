import DashboardHeader from "../../components/dashboard/DashboardHeader";
import Sidebar from "../../components/sidebar/Sidebar";

function Dashboard() {
  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />

      <main className="min-w-0 flex-1 overflow-y-auto p-6 md:p-8">
        <div>
          <  DashboardHeader />
        </div>
      </main>


    </div>

  );
}

export default Dashboard;
