"use client";

import Image from "next/image";
import React from "react";
import { sidebarItem } from "@/types/types";
import { usePathname } from "next/navigation";
import Link from "next/link";
const Sidebar = () => {
  let pathname = usePathname();
  pathname = `/${pathname.split("/")[1]}`;

  const sideBarItems: sidebarItem[] = [
    {
      title: "Dashboard",
      svgUrl: "/sidebar-icons/dashboard.svg",
      route: "/dashboard",
      isSelected: false,
    },
    {
      title: "Patients Management",
      svgUrl: "/sidebar-icons/patient.svg",
      route: "/patients-management",
      isSelected: false,
    },
  ];
  return (
    <div>
      <div
        className=" space-y-2 px-2  hover:overflow-auto custom-scrollbar mt-2"
        style={{ height: "calc(100vh - 4.6rem) " }}
      >
        {sideBarItems.map((item, index) => (
          <div
            key={index}
            className={`${
              pathname === item.route ? "bg-black text-white" : ""
            } rounded-sm py-2 px-5 w-[270px]`}
          >
            <Link href={`${item.route}`} className="flex  gap-2 items-center">
              <div className="h-[18px] w-[18px]">
                <Image
                  src={`${item.svgUrl}`}
                  width={25}
                  height={25}
                  alt={`${item.title}-icon`}
                  className={`h-full w-full object-cover ${
                    pathname === item.route ? "filter invert" : ""
                  }`}
                />
              </div>
              <div>
                <p className="font-medium">{item.title}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
