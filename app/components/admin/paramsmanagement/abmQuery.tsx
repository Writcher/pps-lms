"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ABMTable from "./table";
import { useForm } from "react-hook-form";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

export default function ABMQuery() {
  const queryClient = new QueryClient();
  const { watch, setValue } = useForm({
    defaultValues: {
      tabValue: "",
    }
  });
  const selectedTab = watch("tabValue");
  const handleTabChange = (event: any, newValue: string) => {
    setValue("tabValue", newValue);
  };
  const renderContent = () => {
    switch (selectedTab) {
      case "":
        return (
          <div className="flex flex-col items-center justify-center text-3xl text-gray-700 text-center font-bold gap-10">
            <p>
              Gestión de Parámetros
            </p>
            <div className="flex flex-col items-center justify-center text-xl text-gray-700 text-center">
              Seleccione una pestaña
            </div>
          </div>
        );
      case "projecttype":
      case "projectstatus":
      case "grade":
      case "supplytype":
      case "supplystatus":
      case "scholarshiptype":
      case "usercareer":
        return (
          <ABMTable key={selectedTab} table={selectedTab} />
        );
    };
  };
  return (
    <main className="flex flex-col w-full h-full">
      <div className="flex h-[10%] bg-gray-700 border-b-4 border-orange-500 md:border-transparent text-white items-center justify-center">
        <Tabs
          textColor="inherit"
          variant="scrollable"
          scrollButtons="auto"
          className="items-center"
          value={selectedTab}
          onChange={handleTabChange}
        >
          <Tab
            label="Tipo de Proyecto"
            value="projecttype"
          />
          <Tab
            label="Estado de Proyecto"
            value="projectstatus"
          />
          <Tab
            label="Calificación"
            value="grade"
          />
          <Tab
            label="Tipo de Insumo"
            value="supplytype"
          />
          <Tab
            label="Estado de Insumo"
            value="supplystatus"
          />
          <Tab
            label="Tipo de Beca"
            value="scholarshiptype"
          />
          <Tab
            label="Carrera"
            value="usercareer"
          />
        </Tabs>
      </div>
      <div className="flex flex-col w-full px-4 py-4 md:px-6 md:py-6 h-[90%]">
        <QueryClientProvider client={queryClient}>
          {renderContent()}
        </QueryClientProvider>
      </div>
    </main>
  );
};