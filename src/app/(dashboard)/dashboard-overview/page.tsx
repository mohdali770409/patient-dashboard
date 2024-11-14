"use client";
import { getPatientsData } from "@/services/patient.service";
import React, { useEffect, useState } from "react";
import DashboardOverviewComponent from "./components/dashboard-overview";

const DashboardOverview = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const fetchAllPatientsData = async () => {
    try {
      setLoading(true);
      const res = await getPatientsData();
      console.log(res);
      setData(res);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchAllPatientsData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div>
      <DashboardOverviewComponent data={data} />
    </div>
  );
};

export default DashboardOverview;
