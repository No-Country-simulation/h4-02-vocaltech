import Table from "../components/Dashboard/Table";
import Sidebar from "../components/Dashboard/Sidebar";
import AdminCard from "../components/Dashboard/AdminCard";
import Graphic from "../components/Dashboard/Graphic";
import RecentLeads from "../components/Dashboard/RecentLeads";
import DashboardHeader from "../components/Dashboard/DashboardHeader";
import '../components/Dashboard/styles.css';
import Calendar from "../components/Dashboard/Calendar";

const adminDashboard = () => {
  type Card = {
    title: string;
    content: string;
    className?: string;
  };

  return (
    <div className="bg-gray-300 grid grid-cols-1 gap-4 place-content-center lg:grid-cols-6">
      <DashboardHeader />
      <Sidebar />
      <div className="lg:gap-5 p-4 font-bold grid grid-cols-3 h-3 w-full gap-2 lg:grid-cols-3 lg:col-span-3 ">
        <AdminCard
          title="Total de leads"
          content="1.245"
          className=" bg-anaranjado_secundario_300 p-6 w-full rounded-xl shadow-lg flex flex-col justify-center items-left gap-6"
        />
        <AdminCard
          title="Emprendedores"
          content="800"
          className="bg-amarillo_secundario_300 p-6 w-full rounded-xl shadow-lg flex flex-col justify-center items-left gap-6"
        />
        <AdminCard
          title="Empresas"
          content="455"
          className="bg-azul_secundario_300 p-6 w-full rounded-xl shadow-lg flex flex-col justify-center items-left gap-6"
        />
        <div className="flex flex-col gap-5 col-span-3 mt-7 lg:flex-row">
          <Graphic />
          <Graphic />
        </div>
        {/* <div className="col-span-2 col-start-6">
          <Calendar />
        </div> */}
        <div>
          <RecentLeads />
        </div>
      </div>
      {/* <div className="grid col-span-2 p-4 col-start-2 col-end-7">
        <Table />
      </div> */}
    </div>
  );
};

export default adminDashboard;
