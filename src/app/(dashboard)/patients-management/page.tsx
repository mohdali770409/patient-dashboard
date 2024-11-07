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
  ChevronUp,
  ClipboardList,
  Eye,
  FilePenLine,
  MoreHorizontal,
  Trash,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import DataTable from "@/components/DataTable/DataTable";
import { useToast } from "@/hooks/use-toast";
import { ColumnDef } from "@tanstack/react-table";
import { getPatientsData } from "@/services/patient.service";
import DeleteButtonHandler from "./components/delete-button-handler";
import { Badge } from "@/components/ui/badge";
import { Tooltip } from "@/components/ui/tooltip";
import { format } from "date-fns";
import {
  Activity,
  AlertCircle,
  Calendar,
  ChevronDown,
  History,

  Phone,
  User2,
  Mail,
  MapPin,
  Clock,
  User,
  CheckCircle2,
  TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

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
      id: "name", 
      accessorFn: (row) => `${row.firstName} ${row.lastName}`, // This will be used for sorting
      header: ({ column }) => (
        <div 
          className="flex items-center gap-2 cursor-pointer hover:text-gray-900"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Patient Name
          {column.getIsSorted() === "asc" ? (
            <ChevronUp className="h-4 w-4" />
          ) : column.getIsSorted() === "desc" ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronsUpDown className="h-4 w-4 text-gray-400" />
          )}
        </div>
      ),
      cell: ({ row }) => {
        const name = `${row.original.firstName} ${row.original.lastName}`;
        return (
          <div className="flex items-center py-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-r from-violet-500 to-purple-500 flex items-center justify-center text-white font-medium">
              {name.charAt(0)}
            </div>
            <span className="ml-3 font-medium text-gray-700">{name}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "phone",
      header: ({ column }) => (
        <div 
          className="flex items-center gap-2 cursor-pointer hover:text-gray-900"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Phone
          {column.getIsSorted() && (
            column.getIsSorted() === "asc" ? 
              <ChevronUp className="h-4 w-4" /> : 
              <ChevronDown className="h-4 w-4" />
          )}
        </div>
      ),
      cell: ({ row }) => (
        <div className="text-gray-600">{row.original.phone}</div>
      ),
    },
    {
      accessorKey: "age",
      header: ({ column }) => (
        <div 
          className="flex items-center gap-2 cursor-pointer hover:text-gray-900"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Age
          {column.getIsSorted() && (
            column.getIsSorted() === "asc" ? 
              <ChevronUp className="h-4 w-4" /> : 
              <ChevronDown className="h-4 w-4" />
          )}
        </div>
      ),
      cell: ({ row }) => (
        <div className="text-gray-600">{row.original.age} years</div>
      ),
    },
    {
      accessorKey: "gender",
      header: ({ column }) => (
        <div 
          className="flex items-center gap-2 cursor-pointer hover:text-gray-900"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Gender
          {column.getIsSorted() && (
            column.getIsSorted() === "asc" ? 
              <ChevronUp className="h-4 w-4" /> : 
              <ChevronDown className="h-4 w-4" />
          )}
        </div>
      ),
      cell: ({ row }) => (
        <div className={cn(
          "px-2.5 py-0.5 rounded-full text-xs font-medium w-fit",
          row.original.gender === "male" && "bg-blue-50 text-blue-700",
          row.original.gender === "female" && "bg-pink-50 text-pink-700",
          row.original.gender === "other" && "bg-purple-50 text-purple-700"
        )}>
          {row.original.gender}
        </div>
      ),
    },
    {
      
      accessorKey: "street",
      header: ({ column }) => (
        <div 
          className="flex items-center gap-2 cursor-pointer hover:text-gray-900"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Location
          {column.getIsSorted() && (
            column.getIsSorted() === "asc" ? 
              <ChevronUp className="h-4 w-4" /> : 
              <ChevronDown className="h-4 w-4" />
          )}
        </div>
      ),
      cell: ({ row }) => {
        const address = `${row.original.street}, ${row.original.city}, ${row.original.state}`;
        return (
          <div className="text-gray-600 truncate max-w-[200px]">{address}</div>
        );
      },
    },
    {
      accessorKey: "status",
      header: ({ column }) => (
        <div 
          className="flex items-center gap-2 cursor-pointer hover:text-gray-900"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          {column.getIsSorted() === "asc" ? (
            <ChevronUp className="h-4 w-4" />
          ) : column.getIsSorted() === "desc" ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronsUpDown className="h-4 w-4 text-gray-400" />
          )}
        </div>
      ),
      cell: ({ row }) => {
        const status = row.original.status?.toLowerCase() || "improving";
        
        const statusConfig = {
          cured: {
            color: "bg-green-50 text-green-700 border-green-200",
            icon: <CheckCircle2 className="h-3 w-3" />,
            label: "Cured"
          },
          defaulter: {
            color: "bg-red-50 text-red-700 border-red-200",
            icon: <AlertCircle className="h-3 w-3" />,
            label: "Defaulter"
          },
          improving: {
            color: "bg-blue-50 text-blue-700 border-blue-200",
            icon: <TrendingUp className="h-3 w-3" />,
            label: "Improving"
          },
          relapser: {
            color: "bg-amber-50 text-amber-700 border-amber-200",
            icon: <History className="h-3 w-3" />,
            label: "Relapser"
          }
        };

        const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.improving;

        return (
          <div className={cn(
            "px-2.5 py-1 rounded-full text-xs font-medium w-fit",
            "flex items-center gap-1.5 border",
            config.color
          )}>
            {config.icon}
            {config.label}
          </div>
        );
      },
    },
    {
      accessorKey: "lastVisit",
      header: ({ column }) => (
        <div 
          className="flex items-center gap-2 cursor-pointer hover:text-gray-900"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Last Visit
          {column.getIsSorted() && (
            column.getIsSorted() === "asc" ? 
              <ChevronUp className="h-4 w-4" /> : 
              <ChevronDown className="h-4 w-4" />
          )}
        </div>
      ),
      cell: ({ row }) => {
        const lastVisit = row.original.updatedAt;
        return (
          <div className="text-gray-600">
            {format(new Date(lastVisit), "MMM dd, yyyy")}
          </div>
        );
      },
    },
    
    {
      accessorKey: "symptomsAndDiseases",
      header: "Symptoms & Diseases",
      cell: ({ row }) => {
        const symptoms = row.original.symptomsAndDiseases || [];
        const MAX_DISPLAY = 3;

        return (
          <div className="flex flex-col gap-1">
            <div className="flex flex-wrap gap-1.5">
              {symptoms.slice(0, MAX_DISPLAY).map((symptom: string, index: number) => (
                <span
                  key={index}
                  className="px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-700 capitalize"
                >
                  {symptom.replace(/_/g, ' ')}
                </span>
              ))}
              {symptoms.length > MAX_DISPLAY && (
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <Button 
                      variant="ghost" 
                      className="h-5 px-2 text-xs rounded-full bg-gray-100 text-gray-700"
                    >
                      +{symptoms.length - MAX_DISPLAY} more
                    </Button>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-64 p-2">
                    <div className="flex flex-wrap gap-1.5">
                      {symptoms.slice(MAX_DISPLAY).map((symptom: string, index: number) => (
                        <span
                          key={index}
                          className="px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-700 capitalize"
                        >
                          {symptom.replace(/_/g, ' ')}
                        </span>
                      ))}
                    </div>
                  </HoverCardContent>
                </HoverCard>
              )}
            </div>
          </div>
        );
      },
    },
    {
      id: "actions",
      header: "Actions",
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
                  href={`/patients-management/view-patient/${row.original._id}`}
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
    <div className="w-full space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800">Patients Management</h2>
        <Button asChild className="bg-primary hover:bg-primary/90">
          <Link href="/patients-management/add-and-edit-patient">
            Add New Patient
          </Link>
        </Button>
      </div>
      <DataTable 
        columns={columns} 
        data={patientsData}
        patientsHeader={true}
      />
    </div>
  );
};

export default Patients;
