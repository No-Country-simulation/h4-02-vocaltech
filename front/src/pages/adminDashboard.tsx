import React, { useEffect, useState } from "react";
import Table from "../components/Dashboard/Table";
import Sidebar from "../components/Dashboard/Sidebar";
import AdminCard from "../components/Dashboard/AdminCard";
import Graphic from "../components/Dashboard/Graphic";
import RecentLeads from "../components/Dashboard/RecentLeads";
import DashboardHeader from "../components/Dashboard/DashboardHeader";
import "../components/Dashboard/styles.css";
import Calendar from "../components/Dashboard/Calendar";
import DiagnosticTable from "../components/Dashboard/DiagnosticTable";

const adminDashboard = () => {
  type Card = {
    title: string;
    content: string;
    className?: string;
  };

  type Lead = {
    Type: string;
  };

  const [leads, setLeads] = useState<Lead[]>([]);
  const [totalLeads, setTotalLeads] = useState<number>(0);
  const [entrepreneurs, setEntrepreneurs] = useState<number>(0);
  const [companies, setCompanies] = useState<number>(0);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://h4-02-vocaltech.onrender.com/api/airtable/leads"
      );
      const data = await response.json();
      console.log("Data fetched:", data);
      setLeads(data);
      const entrepreneurCount = data.filter(
        (lead:any) => lead.Type === "EMPRENDEDOR"
      ).length;
      const companyCount = data.filter(
        (lead:any) => lead.Type === "EMPRESA"
      ).length;

      setTotalLeads(data.length);
      setEntrepreneurs(entrepreneurCount);
      setCompanies(companyCount);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-rows-[auto, 1fr, auto] lg:grid-cols-6">
      <DashboardHeader />
      <Sidebar />
      <div className="p-4  font-bold grid grid-cols-3 gap-2 lg:h-[200px] lg:row-span-1 lg:grid-cols-3 lg:col-span-3 lg:gap-5 ">
        <AdminCard
          title="Total de leads"
          content={totalLeads.toString()}
          className=" bg-anaranjado_secundario_300 p-6 w-full rounded-xl shadow-lg flex flex-col justify-center items-left gap-6"
        />
        <AdminCard
          title="Emprendedores"
          content={entrepreneurs.toString()}
          className="bg-amarillo_secundario_300 p-6 w-full rounded-xl shadow-lg flex flex-col justify-center items-left gap-6"
        />
        <AdminCard
          title="Empresas"
          content={companies.toString()}
          className="bg-azul_secundario_300 p-6 w-full rounded-xl shadow-lg flex flex-col justify-center items-left gap-6"
        />
        <div className="flex flex-col gap-5 col-span-3 mt-7 lg:flex-row lg:row-span-3 lg:col-span-5">
          <Graphic />
        </div>
        {/* <div className="col-span-2 col-start-6">
          <Calendar />
        </div> */}
      </div>

      <div className="col-span-3 row-auto lg:col-start-2 lg:col-end-7 lg:max-h-[600px] lg:overflow-auto">
        <RecentLeads />
      </div>
    </div>
  );
};

export default adminDashboard;
