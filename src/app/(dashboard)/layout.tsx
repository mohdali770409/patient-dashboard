import BreadCrumb from "@/components/breadcrumb/breadcrumb";
import Sidebar from "@/components/sidebar/sidebar";
import React from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div className="flex  h-[-webkit-fill-available]">
        <div className="w-[300px] border-r hidden md:block">
          <Sidebar />
        </div>
        <div className="p-5 w-full max-w-[2200px]">
          <BreadCrumb />
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
