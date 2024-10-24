"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ChevronsUpDown,
  Eye,
  FilePenLine,
  MoreHorizontal,
  Trash,
} from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import DataTable from "@/components/DataTable/DataTable";
import { useToast } from "@/hooks/use-toast";
import { ColumnDef } from "@tanstack/react-table";
import { getPatientsData } from "@/services/patient.service";
import DeleteButtonHandler from "./components/delete-button-handler";

const Patients = () => {
  const [patientsData, setPatientsData] = useState([]);
  const fetchPatientsData = async () => {
    try {
      const res = await getPatientsData();
      setPatientsData(res);
      console.log("res", res);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchPatientsData();
  }, []);

  const handleDelete = ((id: string) => {
    setPatientsData((prevData) => prevData.filter((item: any) => item._id !== id));
  });

  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "firstName",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="w-full p-0"
          >
            <div className="flex items-center w-full ">
              <span> Name & Phone</span>
              <ChevronsUpDown className=" h-[13px] mt-[2px]" />
            </div>

            {/* <ArrowUpDown className="ml-2 h-4 w-4" /> */}
          </Button>
        );
      },
      enableGlobalFilter: true,
      cell: ({ row }) => {
        const name =
          `${row.original?.firstName} ${row.original?.lastName}` || "";
        const phone = row.original?.phone || "";
        return (
          <div>
            <div className="font-semibold">{name}</div>
            <div className="text-sm text-gray-500">{phone}</div>
          </div>
        );
      },
    },
    {
      accessorKey: "age",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="w-full p-0"
          >
            <div className="flex items-center w-full ">
              <span> Age</span>
              <ChevronsUpDown className=" h-[13px] mt-[2px]" />
            </div>

            {/* <ArrowUpDown className="ml-2 h-4 w-4" /> */}
          </Button>
        );
      },
      cell: ({ row }) => {
        return <div className="font-semibold">{row.original?.age}</div>;
      },
    },
    {
      accessorKey: "gender",
      header: "Gender",
      cell: ({ row }) => <div>{row.original.gender}</div>,
    },
    {
      accessorKey: "address",
      header: "Address",
      cell: ({ row }) => {
        return `${row.original?.address}`;
      },
    },
    {
      accessorKey: "isCured",
      header: "Cured",
      cell: ({ row }) => (
        // <VenueSuspendToggle
        //   checked={row.original.isActive}
        //   turfId={row.original._id}
        // />
        <p>Yes</p>
      ),
    },

    {
      id: "actions",
      header: "Action",
      cell: ({ row }) => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel className="text-slate-500">
                Actions
              </DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => console.log("edit for", row.original._id)}
                className="cursor-pointer"
                asChild
              >
                <Link
                  href={`/patients-management/add-and-edit-patient/${row.original._id}`}
                  className="pointer-cursor flex items-center"
                >
                  <FilePenLine className="mr-1 h-4" />
                  <span className="font-semibold">Edit</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                // onClick={() => console.log("view", row.original)}
                className="cursor-pointer"
                onSelect={(e) => {
                  console.log(row.original);
                  e.preventDefault();
                }}
                asChild
              >
                {/* view button handler */}
                <Link
                  href={`/patients-management/patient-details/${row.original._id}`}
                >
                  <div className="flex items-center">
                    <Eye className="mr-1 h-4 inline-block" />
                    <span className="font-semibold"> View</span>
                  </div>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => console.log("delete", row.original._id)}
                className="cursor-pointer"
                onSelect={(e) => {
                  e.preventDefault();
                }}
                asChild
              >
                <DeleteButtonHandler
                  id={row.original._id}
                  onDelete={handleDelete}
                />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
  return (
    <div className="w-full">
      <DataTable columns={columns} patientsHeader={true} data={patientsData} />
    </div>
  );
};

export default Patients;
